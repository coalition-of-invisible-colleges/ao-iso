import React, { useEffect, ReactElement } from 'react';
import { useLocalStore } from 'mobx-react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import { hot } from 'react-hot-loader/root';
import { observer } from 'mobx-react';
import { useStore, StoreContext, pubState, createAoStore } from './store';
import AoMember from './member';
import AoCard from './card';

export const KEY_AUTH_DATA = 'KEY_AUTH_DATA';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? <Comp {...props} /> : <Redirect to="/login" />
      }}
    />
  );
}

const App = observer((): ReactElement => {
  const aoStore = useStore();

  useEffect(() => document.body.classList.add('theme-1'));
  
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute
        path="/task/:taskId"
        component={AoCard}
        loggedIn={aoStore.state.loggedIn}
      />
      <ProtectedRoute
        path="/"
        component={AoMember}
        loggedIn={aoStore.state.loggedIn}
        exact={true}
      />
    </Switch>
  );
});

const withStore = () => <StoreContext.Provider value={useLocalStore(createAoStore(typeof window == 'undefined' ? pubState : window.__PRELOADED_STATE__))}><App/></StoreContext.Provider>

export default hot(withStore);