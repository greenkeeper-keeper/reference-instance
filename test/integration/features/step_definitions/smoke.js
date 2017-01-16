import {defineSupportCode} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';
import {BAD_REQUEST} from 'http-status-codes';

defineSupportCode(({Given, When, Then}) => {
  let server, serverResponse;

  Given('the server is started', () => {
    process.env.GITHUB_TOKEN = any.string();
    process.env.PORT = 8888;

    return require('../../../../src/index').default.then(instance => {
      server = instance
    });
  });

  When('a webhook is received', () => {
    return server.inject({
      method: 'POST',
      url: '/payload',
      payload: {}
    }).then(response => {
      serverResponse = response;
    });;
  });

  Then('a response is sent', function (callback) {
    assert.equal(serverResponse.statusCode, BAD_REQUEST);

    callback();
  });
});
