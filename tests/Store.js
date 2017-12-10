const test = require('tape')
const Store = require('../lib/Store').default;

test('#found selector', function (t) {
    const S = new Store();

    t.plan(2);

    S.used('.my_selector');
  
    const result = S.compute().used;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});

test('#found selector repeatedly', function (t) {
    const S = new Store();

    t.plan(2);

    S.used('.my_selector');
    S.used('.my_selector');
  
    const result = S.compute().used;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});

test('#notUsed selector', function (t) {
    const S = new Store();

    t.plan(2);

    S.notUsed('.my_selector');
  
    const result = S.compute().notUsed;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});

test('#notUsed selector repeatedly', function (t) {
    const S = new Store();

    t.plan(2);

    S.notUsed('.my_selector');
    S.notUsed('.my_selector');
  
    const result = S.compute().notUsed;

    t.deepEqual(['.my_selector'], result);
    t.equal(result.length, 1);
});


test('#merge', t => {
  const S1 = new Store();
  const S2 = new Store();

  S1.used('.selector_1')
  S1.used('.selector_2')
  S1.notUsed('.selector_3');
  S1.notUsed('.selector_4');


  S2.used('.selector_1')
  S2.used('.selector_3');
  S2.notUsed('.selector_4');


  const result = Store.merge(S1, S2).compute();
    
  t.plan(4);

  t.equal(result.used.length, 3)
  t.deepEqual(result.used, ['.selector_1', '.selector_2', '.selector_3'])


  t.equal(result.notUsed.length, 1)
  t.deepEqual(result.notUsed, ['.selector_4'])
});
  