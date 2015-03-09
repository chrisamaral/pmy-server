module.exports = {
  save (ads) {
    require('./../db')().then(
      db => ads instanceof Array
        ? ads.forEach(
            ad => db.save(ad.id, ad)
          )
        : db.save(ads.id, ads)
    );
  }
};