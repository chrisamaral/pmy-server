var _ = require('lodash');

function sv(db, ad) {
  db.save(ad.id, _.omit(ad, 'id'));
}

module.exports = {
  save(ads) {



    require('./../db')().then(
      db => ads instanceof Array
        ? ads.forEach(ad => sv(db, ad))
        : sv(db, ads)
    );
  }
};