import {flatten} from 'lodash';

function title(item) {
  return item.split('-').map(a => a[0].toUpperCase() + a.substr(1)).join(' ');
}

function info(item) {
  return typeof item === 'object' ? item
    : {id: item, title: title(item)};
}

var olx = [
  [
    [
      {
        id: 'http://rj.olx.com.br/rio-de-janeiro-e-regiao',
        title: 'Rio de Janeiro'
      }
    ],
    [
      'zona-sul',
      'zona-norte',
      'zona-oeste',
      'centro'
    ],
    [
      {
        id: 'imoveis',
        title: 'Imóveis'
      }
    ],
    [
      'aluguel',
      'venda'
    ],
    [
      'aluguel-de-quartos',
      'apartamentos',
      'casas'
    ]
  ]
];

/*
 title: 'ABC : DEFG : GHI',
 id: 'http://abc/def/ghi'
 */

export var endpoints = olx[0].reduce(
  (previous, current) =>
    flatten(
      current.map(a => previous.length > 0
          ? previous.map(
            b => ({
            id: info(b).id + '/' + info(a).id,
            title: info(b).title + ' : ' + info(a).title
          })
        )
          : a
      )
    ), []
);
