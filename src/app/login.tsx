import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../client/api'
import store from './store';

const Login: FunctionComponent<{}> = () => {
  const aoStore = store.store;
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const onClick = e => {
    api
      .createSession(user, pass)
      .then(api.fetchState)
      .then(res => {
        if (!res) {
          setUser('');
        }
      });
  }
  const onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick(e)
    }
  }
  
  return (
    <div>
      {!aoStore.state.loggedIn && (
        <form onSubmit={onKeyDown}>
          <div>
            Username:
            <input
              value={user}
              type="text"
              onChange={e => setUser(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <div>
            Password:
            <input
              value={pass}
              type="password"
              onChange={e => setPass(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <button type="button" onClick={onClick}>
            Login
          </button>
        </form>
      )}
      {aoStore.state.loggedIn && <Redirect to="/" />}
    </div>
  )
}

export default Login
