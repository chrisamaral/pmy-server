var endpoints = require('./conf').endpoints;
var request = require('request');
var async = require('async');
var grep = require('./grep');
var _ = require('lodash');
var archive = require('./archive');

async.eachSeries(endpoints,
  (endpoint, callback) =>
    request(`http://rj.olx.com.br/${endpoint.id}`,
      (err, resp, body) =>
        _.delay.apply(_,
          err ? [callback, 1000 * 2, err]
            : [callback, 1000 * 2, null, archive.save(grep(body, endpoint))]
        )
    ), (err) => !!err && console.log(err)
);
