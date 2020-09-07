import db from './db';

class Events {
  sessionCreated(ownerId, session, token, callback) {
    let newEvent = {
      type: 'session-created',
      session,
      token,
      ownerId
    }
    db.insertEvent(newEvent, callback);
  }
}

export default new Events();
