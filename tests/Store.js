const test = require('tape')
const Store = require('../lib/Store').default;


test('#found selector', function (t) {
    const S = new Store();

    t.plan(2);

    S.found('.my_selector');
  
    const result = S.compute().found;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});

test('#found selector repeatedly', function (t) {
    const S = new Store();

    t.plan(2);

    S.found('.my_selector');
    S.found('.my_selector');
  
    const result = S.compute().found;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});



test('#notFound selector', function (t) {
    const S = new Store();

    t.plan(2);

    S.notFound('.my_selector');
  
    const result = S.compute().notFound;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});

test('#notFound selector repeatedly', function (t) {
    const S = new Store();

    t.plan(2);

    S.notFound('.my_selector');
    S.notFound('.my_selector');
  
    const result = S.compute().notFound;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});
  