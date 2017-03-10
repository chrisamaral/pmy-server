var _ = require('lodash');
var cheerio = require('cheerio');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('ISO-8859-1', 'utf-8');

function trim(str) {
  return _.trim(str, ' \n\t').replace(/[\n\t]/gi, ' ').replace(/  +/g, ' ');
}

module.exports = function (html, ref) {
  var $ = cheerio.load(iconv.convert(html));
  var ads = [];

  $('.section_OLXad-list .OLXad-list-link').each(function (i, adElem) {
    var $adElem = $(this);
    var $title = $adElem.find('.OLXad-list-title');

    if (!$title.length) {
      return;
    }

    var title = trim($title.text());


    if (title.toLowerCase().indexOf('procuro') > -1) {
      return;
    }

    var price = trim($adElem.find('.OLXad-list-price').text());

    if (!price) {
      return;
    }

    var ad = _.merge({
      id: trim($adElem.attr('name')),
      title: title,
      price: parseFloat(
        price.substr(price.indexOf('R$') + 2)
          .replace(/\./g, '')
          .replace(/\,/g, '.')
          .replace(/[^\w\.]/gi, '')
      ),
      details: $adElem.find('.detail-specific').text().split('|').map(trim),
      location: $adElem.find('.detail-region').text().split(',').map(trim),
      lastUpdate: trim($adElem.find('.col-4').text())
    }, ref.type);

    console.log(JSON.stringify(ad, null, 2));

    ads.push(ad);
  });

  return ads;
};