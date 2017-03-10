const _ = require('lodash')
const cheerio = require('cheerio')
const Iconv = require('iconv').Iconv
const iconv = new Iconv('ISO-8859-1', 'utf-8')

function trim(str) {
  return _.trim(str, ' \n\t').replace(/[\n\t]/gi, ' ').replace(/  +/g, ' ')
}

module.exports = function (html, ref) {
  const $ = cheerio.load(iconv.convert(html))
  const ads = []

  $('.section_OLXad-list .OLXad-list-link').each(function (i, adElem) {
    const $adElem = $(this)
    const $title = $adElem.find('.OLXad-list-title')

    if (!$title.length) {
      return
    }

    const title = trim($title.text())


    if (title.toLowerCase().includes('procuro')) {
      return
    }

    const price = trim($adElem.find('.OLXad-list-price').text())

    if (!price) {
      return
    }

    const ad = _.merge({
      id: trim($adElem.attr('name')),
      title: title,
      price: parseFloat(
        price.substr(price.indexOf('R$') + 2)
          .replace(/\./g, '')
          .replace(/\,/g, '.')
          .replace(/[^\w\.]/gi, '')
      ),
      details: $adElem.find('.detail-specific').text().split('|').map(trim).filter(Boolean),
      location: $adElem.find('.detail-region').text().split(',').map(trim).filter(Boolean),
      lastUpdate: trim($adElem.find('.col-4').text())
    }, ref.type)

    console.log(JSON.stringify(ad, null, 2))

    ads.push(ad)
  })

  return ads
}