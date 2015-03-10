var Promise = require('bluebird');
var r = require('rethinkdb');
var noop = require('lodash').noop;

module.exports = () => new Promise((resolve, reject) =>
    r.connect({host: 'localhost', port: 28015})
      .then(conn =>
        (db =>
          db.r.dbCreate('pmy')
            .run(db.conn)
            .catch(noop)
            .finally(() => (
              db.conn.use('pmy'),
                db.r.tableCreate('ad').run(db.conn)
                  .finally(() => resolve(db))
                  .catch(noop)
            )))({r: r, conn: conn}),
        err => reject(err)
    )
);

