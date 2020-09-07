import React, { useEffect, ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './login';
import { hot } from 'react-hot-loader/root';
import { observer } from 'mobx-react';
import store from './store';
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
  const aoStore = store.store;

  console.log("App state: ", aoStore.state);

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

export default hot(App);