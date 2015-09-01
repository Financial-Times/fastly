A [Fastly](http://www.fastly.com) API client for Node.js

[![Build Status](https://travis-ci.org/commuterjoy/fastly.png?branch=master)](https://travis-ci.org/commuterjoy/fastly)

### Installation

This repo is a fork of the one currently installed in NPM, so you'll need to to install it from the tagged tarball,

```bash
npm install https://github.com/Financial-Times/fastly/archive/v2.5.0.tar.gz
```

### Basic Use

A simple use of the API looks like this,

```javascript
var fastly = require('fastly')('your-api-key', 'your-service-id', { verbose: false });

fastly
    .getVersions()
    .then(function (res) {
        var lastVersion = JSON.parse(res).pop().number;
        console.log('Latest version number is ' + lastVersion);
    })
    .catch(function (err) {
        throw new Error(err);
    })
```

The API is promise-based, so methods can be chained together like so,

```javascript
var fastly = require('fastly')('your-api-key', 'your-service-id', { verbose: false });
var Q = require('q');
var version;

fastly
    .getVersions()
    .then(function (res) {
        // extract a version number
        version = JSON.parse(res).pop().number;
        return fastly.request('GET', '/service/'+service+'/version/'+version+'/vcl');
    })
    .then(function (res) {
        return Q.all(
            JSON.parse(res).map(function (vcl) {
                return fastly.request('GET', '/service/'+service+'/version/'+version+'/vcl/'+vcl.name);
            })
        )
    })
    .then(function (res) {
        // the VCLs
    })
    .catch(function (err) {
        throw new Error(err);
    })
```

Note in the above example you can control the verbosity of the fastly library
by passing `{ verbose: false }` as the last argument to the constructor.

### Testing

```bash
npm test
```
