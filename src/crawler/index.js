var endpoints = require('./conf').endpoints;
var request = require('request');
var async = require('async');
var grep = require('./grep');
var _ = require('lodash');
var archive = require('./archive');
var CALL_INTERVAL = 1000 * 2;

async.eachSeries(endpoints,
  (endpoint, callback) =>
    request(endpoint.url,
      (err, resp, body) =>
        (
          err ? console.log(err) : archive.save(grep(body, endpoint)),
            setTimeout(() => callback(null), CALL_INTERVAL)
        )
    )
);
