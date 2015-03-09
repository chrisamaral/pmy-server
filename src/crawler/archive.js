module.exports = {
  save(ads) {
    require('./../db')().then(
      db =>
        db.r.table('ads').insert(ads, {conflict: 'update'})
          .run(db.conn).finally(() => db.conn.close()),
      err => console.log(err)
    );
    return ads;
  }
};