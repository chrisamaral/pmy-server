var endpoints = require('./conf.js');
var client = require('scoped-http-client');

endpoints.map(endpoint =>
  client.create(endpoint.id)
    .header('accept', 'text/html')
    .get()((err, resp, body) => {
      err ? null : console.log(body);
    }
    )
);