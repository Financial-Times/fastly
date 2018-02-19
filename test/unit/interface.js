var test    = require('tap').test,
    fastly  = require(__dirname + '/../../lib/index.js');
    methods = require(__dirname + '/../../lib/api').filter(a => a.fn).map(a => a.fn);

test('unit', function (t) {
    t.type(fastly, 'function', 'module is a function');

    var ready = fastly('apikey');

    t.type(ready, 'object', 'module exposes an object');
    t.type(ready.request, 'function', 'request method exists');
    t.type(ready.softPurgeKey, 'function', 'softPurgeKey method exists');

    methods.forEach(m => {
        t.type(ready[m], 'function', `${m} method exists`);
    });

    t.end();
});
