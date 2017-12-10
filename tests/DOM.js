const test = require('tape')
const DOM = require('../lib/DOM').default;

const template = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
      </head>
    </html>
`;


test('found exists css test', function (t) {
    const html = new DOM(template);

    t.plan(1);

    t.equal(html.exists('head'), true);
});

test('not found exists css test', function (t) {
    const html = new DOM(template);

    t.plan(1);

    t.equal(html.exists('.some_selector'), false);
});


test('exists selector', function (t) {
    const html = new DOM(template);

    t.plan(2);

    t.equal(html.exists('head'), true);
    t.equal(html.exists('.some_selector'), false);
});
