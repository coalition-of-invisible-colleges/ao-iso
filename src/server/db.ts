import db from 'better-sqlite3';
import { v1 as uuidV1 } from 'uuid';
import { stream } from 'kefir';
import { createHash, hmacHex } from '../app/crypto';

export let eventEmitter, shadowEmitter;

export const changeFeed = stream(e => {
  eventEmitter = e;
});

export const shadowFeed = stream(e => {
  shadowEmitter = e;
});

class DB {
  conn = null;
  preparedStmts = {};

  public startDb(path: string) {
    this.conn = db(path, {});
    let checkTable = this.conn.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='events'"
    );
  
    if (checkTable.all().length == 0) {
      this.initializeSqlite();
    } else {
      this.createStatements();
    }
  }

  public initializeSqlite() {
    let err;
    const initDb = this.conn.prepare(
      'CREATE TABLE `events` ( `document` BLOB NOT NULL, `timestamp` INTEGER UNIQUE, PRIMARY KEY(`timestamp`) )'
    )
    const initBackups = this.conn.prepare(
      'CREATE TABLE `backups` ( `document` BLOB NOT NULL, `timestamp` INTEGER UNIQUE, PRIMARY KEY(`timestamp`) )'
    )
    initDb.run()
    initBackups.run()
    this.createStatements();
  
    this.insertEvent({
      type: 'member-created',
      name: 'dctrl',
      fob: '0000000000',
      secret: createHash('dctrl'), // init user-password is dctrl
      memberId: uuidV1(),
      address: '2Mz6BQSTkmK4WHCntwNfvdSfWHddTqQX4vu',
      active: 1,
      balance: 0,
      badges: [],
      info: {}
    });
    this.startFeed();
  }

  createStatements() {
    this.conn.function('eventFeed', doc => {
      eventEmitter.emit(JSON.parse(doc))
    });
    this.preparedStmts.getAll = this.conn.prepare(
      'SELECT document FROM events WHERE (timestamp > ?) ORDER BY timestamp'
    ); // WHERE (timestamp > ?)
    this.preparedStmts.insertEvent = this.conn.prepare('INSERT INTO events VALUES (?, ?)');
    this.preparedStmts.insertBackup = this.conn.prepare('INSERT INTO backups VALUES (?, ?)');
    this.preparedStmts.recover = this.conn.prepare(
      'SELECT document from backups ORDER BY timestamp DESC LIMIT 1'
    );
  }

  public recover() {
    const events = [];
    for (const event of this.preparedStmts.recover.iterate()) {
      events.push(JSON.parse(event.document));
    }
    return events;
  }
  
  public getAll(timestamp) {
    let events = []

    for (const event of this.preparedStmts.getAll.iterate(timestamp)) {
      events.push(JSON.parse(event.document))
    }
    return events;
  }
  startFeed() {
    this.conn.function('eventFeed', doc => {
      eventEmitter.emit(JSON.parse(doc))
    });
    this.conn
      .prepare(
        'CREATE TRIGGER updateHook AFTER INSERT ON events BEGIN SELECT eventFeed(NEW.document); END'
      )
      .run();
  }

  public insertEvent(ev, callback = null) {
    console.log('insertEvent ev is ', ev)
    if (!this.conn) return callback('No db connection')
    if (!ev.timestamp) {
      ev.timestamp = Date.now()
    }
    var err = null
    var result = null
    result = this.preparedStmts.insertEvent.run(JSON.stringify(ev), ev.timestamp)
    if (callback) {
      callback(err, { event: ev, result })
    }
  }  

  public triggerShadow(x) {
    shadowEmitter.emit(x)
  }
}

const aodb = new DB();

export default aodb;

// gotta figure out why the functions weren't included with the object in the above export.
export function startDB(path: string) {
  aodb.startDb(path);
}

export function recover() {
  return aodb.recover();
}

export function getAll(timestamp) {
  return aodb.getAll(timestamp);
}
