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


test('#merge', t => {
  const S1 = new Store();
  const S2 = new Store();

  S1.found('.selector_1')
  S1.found('.selector_2')
  S1.notFound('.selector_3');
  S1.notFound('.selector_4');


  S2.found('.selector_1')
  S2.found('.selector_3');
  S2.notFound('.selector_4');


  const result = Store.merge(S1, S2);
    
  t.plan(4);

  t.equal(result.found.length, 3)
  t.deepEqual(result.found, ['.selector_1', '.selector_2', '.selector_3'])


  t.equal(result.notFound.length, 1)
  t.deepEqual(result.notFound, ['.selector_4'])
});
  