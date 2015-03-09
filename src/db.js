var Promise = require('bluebird');
/*
 var cradle = require('cradle');
 var db = new (cradle.Connection)('http://localhost', 5984, {
 cache: true,
 raw: false,
 forceSave: true
 }).database('pmy');


module.exports = () =>
  (new Promise((resolve, reject) =>
      db.exists(
        (err, exists) =>
          err
            ? reject(err)
            : exists
            ? resolve(db)
            : db.create(createErr =>
              createErr
                ? reject(err)
                : resolve(db)
          )
      )
  ));

 */

var r = require('rethinkdb');
module.exports = () => new Promise((resolve, reject) =>
    r.connect({host: 'localhost', port: 28015, db: 'pmy'})
      .then(conn => resolve({r: r, conn: conn}), err => reject(err))
);

