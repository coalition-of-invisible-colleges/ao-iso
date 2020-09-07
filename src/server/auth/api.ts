import { Router } from 'express';
import { serverState } from '../../app/store';
import { createHash, hmacHex } from '../../app/crypto';
import events from '../events';

function getIdSecret(identifier: string) {
  let ownerId, secret;

  identifier = identifier && identifier.toLowerCase();

  serverState.members.forEach(member => {
    if (member.name.toLowerCase() === identifier || member.memberId === identifier) {
      ownerId = member.memberId;
      secret = member.secret;
    }
  });

  serverState.resources.forEach(resource => {
    if (resource.name === identifier || resource.resourceId === identifier) {
      ownerId = resource.resourceId;
      secret = resource.secret;
    }
  });

  return { ownerId, secret };
}

function authorized(req) {
  if (serverState.sessions.map(session => session.token).includes(req.headers.authorization)) {
    return true;
  }
  return false;
}

function endpoint() {
  return (req, res) => {
    if (authorized(req)) {
      return res.status(404).end('not found');
    }

    const { ownerId, secret } = getIdSecret(req.headers.name);

    if (secret && req.headers.authorization && req.headers.session) {
      let sessionKey = createHash(req.headers.session + secret);
      let token = hmacHex(req.headers.session, sessionKey);
      
      if (token === req.headers.authorization) {
        // client able to create the token, must have secret
        events.sessionCreated(
          ownerId,
          req.headers.session,
          token,
          (err, dbResponse) => {
            if (err) {
              res.status(500).send(err);
            } else {
              req.session.token = token;
              req.session.name = req.headers.name;
              req.session.session = req.headers.session;
              res.status(201).send(dbResponse);
            }
          }
        );
      } else {
        res.status(401).end('unauthorized');
      }
    } else {
      res.status(401).end('unauthorized')
    }
  };
}

function middleware() {
  return (req, res, next) => {
    if (req.url.startsWith('/js')) {
      return next();
    }
    if (req.url === "/__webpack_hmr") {
      return next();
    }
    if (/[0-9a-f]+\.hot-update.js/.test(req.url)) {
      return next();
    }
    if (req.url.startsWith('/css')) {
      return next();
    }

    if (authorized(req)) {
      return next();
    } 
    
    res.status(401).end('unauthorized');
  };
}

const router = Router();

router.post('/session', endpoint());
router.use(middleware());

export default router;
