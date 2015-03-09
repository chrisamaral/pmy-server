var endpoints = require('./conf').endpoints;
var request = require('request');
var async = require('async');
var grep = require('./grep');
var delay = require('lodash').delay;
var archive = require('./archive');

async.eachSeries(endpoints,
  (endpoint, callback) =>
    request(endpoint.id,
      (err, resp, body) =>
        delay(callback, 1000 * 2,
          err ? [err] : [null, archive.save(grep(body))]
        )
    )
);
