const test = require('tape')
const CSS = require('../lib/CSS').default;

test('css query test', t => {
    const Stylesheet = new CSS(`
      .link {color: red}
      @media screen and(min-width: 320px) {display: block}
      .link:hover {color: blue}
    `);

    t.timeoutAfter(2000);
    t.plan(2);

    Stylesheet.process()
        .then(_ => {
          
        t.equal(Stylesheet.selectors.length, 1);
        t.deepEqual(Stylesheet.selectors, ['.link']);
        t.end();
    });
});