'use strict';
var assert = require('assert'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    bemjson = require('../index.js');

it('should process BEMJSON to HTML', function(cb) {
    var stream = bemjson();

    stream.on('data', function(file) {
        assert.equal(file.relative, 'page.html');
        assert.equal(file.contents.toString(),
            '<html class="page"><body class="page__body">Hello!</body></html>');
    });

    stream.write(new gutil.File({
        base: 'test',
        path: __dirname + '/page.bemjson.js',
        contents: new Buffer('')
    }));

    stream.on('end', cb);

    stream.end();
});

it('should process BEMJSON to HTML and BH templates', function(cb) {
    var stream = bemjson();

    stream.on('data', function(file) {
        assert.equal(file.relative, 'page-bh.html');
        assert.equal(file.contents.toString(),
            '<!doctype html><html class="page"><body class="page__body">Hello!</body></html>');
    });

    stream.write(new gutil.File({
        base: 'test',
        path: __dirname + '/page-bh.bemjson.js',
        contents: new Buffer('')
    }));

    stream.on('end', cb);

    stream.end();
});
