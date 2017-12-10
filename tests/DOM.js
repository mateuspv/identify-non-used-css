const test = require('tape')
const DOM = require('../lib/DOM').default;

test('timing test', function (t) {
    const html = new DOM(`
      <!DOCTYPE html>
        <html lang="en">
          <head>
          </head>
        </html>
    `);

    t.plan(2);

    t.equal(html.query('head').length, 1);
    t.equal(html.query('.some_selector').length, 0);
});