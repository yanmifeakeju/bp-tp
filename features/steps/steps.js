import { When, Then } from '@cucumber/cucumber';
import superagent from 'superagent';
import assert from 'assert';

When(/the client creates a POST request to \/users/, async function () {
  // Write code here that turns the phrase above into concrete actions
  this.client = superagent('POST', `localhost:${process.env.PORT}/users`);
});

When('attaches a generic empty payload', async function () {
  // Write code here that turns the phrase above into concrete actions
  return undefined;
});

When('sends the request', async function () {
  // Write code here that turns the phrase above into concrete actions
  try {
    this.response = await this.client;
  } catch (error) {
    this.response = error.response;
  }
});

Then('the API should respond with a {int} HTTP', function (statusCode) {
  assert.equal(this.response.statusCode, statusCode);
});

Then('the payload of the response should be a JSON object', function () {
  // Write code here that turns the phrase above into concrete actions
  assert(this.response.headers['content-type'].includes('application/json'));

  try {
    this.body = JSON.parse(this.response.text);
  } catch (error) {
    throw new Error('Response not valid json');
  }
});

Then('contains a message property which says {string}', function (message) {
  // Write code here that turns the phrase above into concrete actions
  assert.equal(this.body.message, message);
});
