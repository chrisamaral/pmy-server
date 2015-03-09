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

var olx = {
  'http://rj.olx.com.br': [
    {
      city: [
        {
          id: 'rio-de-janeiro-e-regiao',
          title: 'Rio de Janeiro'
        }
      ]
    },
    {
      zone: [
        'zona-sul',
        'zona-norte',
        'zona-oeste',
        'centro'
      ]
    }
    ,
    {
      product: [
        {
          id: 'imoveis',
          title: 'Imóveis'
        }
      ]
    }
    ,
    {
      contract: [
        'aluguel',
        'venda'
      ]
    }
    ,
    {
      type: [
        'aluguel-de-quartos',
        'apartamentos',
        'casas'
      ]
    }
  ]
};

var conf = {
  endpoints: _.flatten(
    _.map(olx,
      (root, baseURL) => _.reduce(root,
        (previous, current) => _.flatten(
          _.map(_.values(current).shift(),
              x => (newer => previous.length > 0
              ? _.map(previous, older =>
              ({
                url: `${older.url}/${newer.id}`,
                title: older.title + ' : ' + newer.title,
                type: _.merge({}, older.type, newer.type)
              }))
              : [(a => (a.url = `${baseURL}/${a.id}`, a))(newer)])(info(x, _.keys(current).shift()))
          )
        ),
        []
      )
    )
  )
};

module.exports = conf;