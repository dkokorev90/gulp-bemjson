'use strict';
var gutil = require('gulp-util'),
    through = require('through2'),
    BH = new (require('bh').BH),
    path = require('path');

module.exports = function() {
    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-bemjson', 'Streaming not supported'));
            cb();
            return;
        }

        try {
            var obj = require(file.path),
                bemjson = obj.bemjson,
                bh = obj.bh;

            if (!bemjson) {
                this.push(file);
                cb();
                return;
            }

            bh && bh(BH);

            file.contents = new Buffer(BH.apply(obj.bemjson));
            file.path = path.join(path.dirname(file.path), path.basename(file.path, '.bemjson.js') + '.html');
            this.push(file);
        } catch(err) {
            this.emit('error', new gutil.PluginError('gulp-bemjson', err, { filePath: file.path }));
        }

        cb();
    });
};
