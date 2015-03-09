var Promise = require('bluebird');
var r = require('rethinkdb');

module.exports = () => new Promise((resolve, reject) =>
    r.connect({host: 'localhost', port: 28015, db: 'pmy'})
      .then(conn => resolve({r: r, conn: conn}), err => reject(err))
);

