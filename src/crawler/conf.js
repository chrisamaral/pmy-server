var _ = require('lodash');

function title(item) {
  return item.split('-').map(a => a[0].toUpperCase() + a.substr(1)).join(' ');
}

function info(item, key) {
  var x = typeof item === 'object' ? item : {id: item, title: title(item)};

  x.type = x.type || {};

  if (key) {
    x.type[key] = x.id;
  }

  return x;
}

var olx = [
  [
    {
      city: [
        {
          id: 'rio-de-janeiro-e-regiao',
          title: 'Rio de Janeiro'
        }
      ]
    },
    {
      region: [
        'zona-sul',
        'zona-norte',
        'zona-oeste',
        'centro'
      ]
    },
    {
      type: [
        {
          id: 'imoveis',
          title: 'Imóveis'
        }
      ]
    },
    {
      contract: [
        'aluguel',
        'venda'
      ]
    },
    {
      place: [
        'aluguel-de-quartos',
        'apartamentos',
        'casas'
      ]
    }
  ]
];

/*
 title: 'ABC : DEFG : GHI',
 id: 'http://abc/def/ghi'
 */

var conf = {};

conf.endpoints = _.reduce(olx[0],
  (previous, current) => _.flatten(
    _.values(current).shift().map(newer => {
        newer = info(newer, _.keys(current).shift());
        return previous.length > 0
          ? _.map(previous, (older) =>
          ({
            id: older.id + '/' + newer.id,
            title: older.title + ' : ' + newer.title,
            type: _.merge(older.type, newer.type)
          }))
          : newer;
      }
    )
  )
  , []);

module.exports = conf;