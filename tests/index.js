const test = require('tape');
const IdentifyCSS = require('../lib/index').default;

test('#run', t => {
  // t.timeoutAfter(2000);
  // t.plan(4);

  const Program =  new IdentifyCSS({
    htmls: './dummy/**.html',
    styles: './dummy/**.css'
  });

  Program.run().then(([_]) => {
    const store = _.compute();
    t.deepEqual(store.used, ['.link']);
    t.equal(store.used.length, 1);
    
    t.deepEqual(store.notUsed, ['.my_selector_not_used']);
    t.equal(store.notUsed.length, 1);
    
    t.end();
  })
});
