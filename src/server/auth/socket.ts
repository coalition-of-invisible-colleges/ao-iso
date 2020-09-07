import { serverState } from '../../app/store';

export default function authenticate(_socket, data, callback) {
  let authorized;

  serverState.sessions.forEach(session => {
    if (session.token === data.token) {
      authorized = true;
    }
  })
  console.log('socket auth triggered:', authorized);
  callback(null, authorized);
}
