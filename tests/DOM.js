const test = require('tape')
const DOM = require('../lib/DOM').default;

const template = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
      </head>
    </html>
`;


test('found query css test', function (t) {
    const html = new DOM(template);

    t.plan(1);

    t.equal(html.query('head').length, 1);
});

test('not found query css test', function (t) {
    const html = new DOM(template);

    t.plan(1);

    t.equal(html.query('.some_selector').length, 0);
});
