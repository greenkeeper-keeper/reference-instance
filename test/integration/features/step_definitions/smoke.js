import {defineSupportCode} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';
import {BAD_REQUEST, UNAUTHORIZED} from 'http-status-codes';
import crypto from 'crypto';

defineSupportCode(({Given, When, Then, After}) => {
  let server, serverResponse, signature;
  const githubSecret = any.string();
  const payload = any.simpleObject()

  After(callback => {
    signature = null;
    server.stop();
  });

  Given('the server is started', () => {
    process.env.GITHUB_TOKEN = any.string();
    process.env.GITHUB_WEBHOOK_SECRET = githubSecret;
    process.env.ACCEPT_ACTION = 'rebase';
    process.env.PORT = 8888;

    return require('../../../../src/index').default.then(instance => {
      server = instance
    });
  });

  Given('the webhook is signed', function (callback) {
    const hmac = crypto.createHmac('sha1', githubSecret);
    hmac.setEncoding('hex');
    hmac.write(new Buffer(JSON.stringify(payload), 'utf-8'));
    hmac.end();
    signature = `sha1=${hmac.read()}`;

    callback();
  });

  When('a webhook is received', () => {
    return server.inject({
      method: 'POST',
      url: '/payload',
      payload,
      ...signature && {headers: {'X-Hub-Signature': signature}}
    }).then(response => {
      serverResponse = response;
    });;
  });

  Then('a response is sent', function (callback) {
    assert.equal(serverResponse.statusCode, BAD_REQUEST);

    callback();
  });

  Then('an unauthorized response is sent', function (callback) {
    assert.equal(serverResponse.statusCode, UNAUTHORIZED);

    callback();
  });
});
