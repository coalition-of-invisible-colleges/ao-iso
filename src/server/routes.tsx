import { getNextId } from "mobx/lib/internal";

const express = require('express');
const Server = require('socket.io');

const React = require('react');

const { renderToString } = require('react-dom/server');
const { StaticRouter, } = require('react-router-dom');
const { Route, Switch } = require('react-router');
const Kefir = require('kefir');

const StyleContext = require('isomorphic-style-loader/StyleContext');

const authenticateSocket = require('socketio-auth');
const { default: authSocket } = require('./auth/socket');

const { changeFeed, shadowFeed } = require('./db');

const { default: buildHtml } = require('./template');

const { default: authApi } = require('./auth/api');
const { default: api } = require('./api');
const { default: App, KEY_AUTH_DATA } = require('../app');
const { startDB, recover, getAll } = require('./db');
const { useStaticRendering } = require('mobx-react')
const { createAoStore, serverState, pubState, applyBackup, removeSensitive } = require('../app/store');
const { applyEvent } = require('../app/mutations');


useStaticRendering(true);
startDB('database.sqlite3');

const backup = recover();

if (backup.length > 0) {
  applyBackup(backup[0]);
}

const events = getAll(backup[0]?.timestamp || 0);
events.forEach((event, i) => {
  applyEvent(serverState, Object.assign({}, event));
  applyEvent(pubState, removeSensitive(Object.assign({}, event)));
  if (i > 0 && i % 10000 === 0) {
    console.log('applied ', i, '/', events.length, ' events...')
  }
});
console.log('applied ', events.length, ' events from the database');
const aoStore = createAoStore(pubState)();

function reactions(event) {
  process.nextTick(err => {
    switch (event.type) {
      case 'task-boosted':
      case 'task-boosted-lightning':
        let optionList = [];
        let defaultPrice;
        let resourceId;
        let resourceList = serverState.resources.map(r => r.resourceId);
        let amount = parseFloat(event.amount);

        serverState.tasks.some(t => {
          if (
            resourceList.indexOf(t.taskId) > -1 &&
            t.priorities.indexOf(event.taskId) > -1
          ) {
            resourceId = t.taskId;
            return true;
          }
        })
        console.log('got resourceId', resourceId);
        serverState.resources.some(r => {
          if (r.resourceId === resourceId) {
            defaultPrice = r.charge;
            return true;
          }
        })
        serverState.tasks.some(t => {
          if (event.taskId === t.taskId) {
            let str = t.name;
            let cashTagLocation = str.search(/\$/);
            let customPrice = parseFloat(
              str.slice(cashTagLocation + 1, cashTagLocation + 5)
            );
            if (customPrice > 0) {
              console.log('using custom price, ', customPrice);
              defaultPrice = customPrice;
            }
            if (defaultPrice > 0 && amount > 0) {
              amount = amount / defaultPrice;
            }
            let hopper = t.name.slice(0, 1);
            events.resourceUsed(resourceId, '', amount, 0, hopper, console.log);
            return true;
          }
        })
        break
      case 'member-field-updated':
        break;
      case 'member-paid':
        break;
      case 'resource-stocked':
        events.memberActivated(event.memberId);
        break;
      case 'resource-stocked':
        break;
      case 'member-address-updated':
        break;
      case 'member-created':
        break;
      case 'resource-created':
        break;
    }
  })
}

changeFeed
  .onValue(ev => {
    applyEvent(serverState, ev);
  })
  .onValue(reactions);

const filteredStream = changeFeed.map(removeSensitive);
const fullEvStream = Kefir.merge([filteredStream, shadowFeed]);

let loaded = false;

module.exports = function routes(_options) {
  const router = express.Router();
  
  router.use((req, _res, next) => {
    if (!loaded) {  
      loaded = true;

      const server = req.socket.server;
      const io = new Server(server);
      authenticateSocket(io, { authenticate: authSocket, timeout: 2000 });

      fullEvStream.onValue(ev => {
        applyEvent(pubState, ev);
        io.emit('eventstream', ev);
        console.log('emitting:', ev);
      });
    }
    if (aoStore) {
      aoStore.state.session = null;
      aoStore.state.token = null;
      aoStore.state.user = null;
      aoStore.state.loggedIn = false;
    }
  
    next();
  });

  router.use((req, res, next) => {
    if (aoStore && req.session.token && serverState.sessions.map(session => session.token).includes(req.session.token)) {
      aoStore.state.session = req.session.session;
      aoStore.state.token = req.session.token;
      aoStore.state.user = req.session.name;
      aoStore.state.loggedIn = true;
    }
    const css = new Set();
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

    const context = { url: null };
    const components = renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter location={req.url} context={context}>
          <Switch>
            <App />
          </Switch>
        </StaticRouter>
      </StyleContext.Provider>
    );
    if (context.url) {
      res.redirect(301, context.url);
    } else if (components === '') {
      next();
    } else {
      res.status(200).send(buildHtml(req, components, /*[...css].join('')*/'', aoStore.state.loggedIn ? aoStore.state : {}));
    }
  });

  // Backend
  router.use(authApi);
  router.use(api);

  return router;
}
