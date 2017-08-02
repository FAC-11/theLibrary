const test = require('tape');
const shot = require('shot');
const router = require('../src/router');

test('initial setup on src', (t) => {
  t.equal(1, 1, 'tape is running on src.test.js');
  t.end();
});

test('checking route and handlers', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ should respond with status code 200');
  });
  shot.inject(router, { method: 'get', url: 'public/style.css' }, (res) => {
    t.equal(res.statusCode, 200, 'public/style.css should respond with status code 200');
  });
  shot.inject(router, { method: 'get', url: 'public/request.js' }, (res) => {
    t.equal(res.statusCode, 200, 'public/request.js should respond with status code 200');
  });
  shot.inject(router, { method: 'get', url: 'public/favicon.ico' }, (res) => {
    t.equal(res.statusCode, 200, 'public/favicon.ico should respond with status code 200');
    t.end();
  });
});
