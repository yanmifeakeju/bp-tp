import { When, Then } from '@cucumber/cucumber';
import superagent from 'superagent';
import assert from 'assert';

// eslint-disable-next-line no-useless-escape
When('the client creates a {string} request to users', async function (method) {
  this.client = superagent(method, `localhost:${process.env.PORT}/users`);
});

When('attaches a {string} payload', async function (payloadType) {
  switch (payloadType) {
    case 'empty':
      return undefined;
    case 'malformed':
      this.client.set('Content-Type', 'application/json');
      this.client.send('"{"email": "shola"}"');
      break;
    case 'non-JSON':
      this.client.set('Content-Type', 'text/xml');
      this.client.send('<?xml version="1.0" encoding="UTF-8"?><email>dim@mail.com</email>');
      break;
    case 'generic':
      this.client.send(JSON.stringify({ email: 'fola@mail.com' }));
      break;
    default:
      break;
  }
  return undefined;
});

When('without a {string} header set', function (contentType) {
  this.client.unset(contentType);
});

When('sends the request', async function () {
  try {
    this.response = await this.client;
  } catch (error) {
    this.response = error.response;
  }
});

Then('the API should respond with a {int} HTTP status code', function (statusCode) {
  assert.equal(this.response.statusCode, statusCode);
});

Then('the payload of the response should be a JSON object', function () {
  assert(this.response.headers['content-type'].includes('application/json'));

  try {
    this.body = JSON.parse(this.response.text);
  } catch (error) {
    throw new Error('Response not valid json');
  }
});

Then('contains a message property which says {string}', function (message) {
  assert.equal(this.body.message, message);
});
