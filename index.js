'use strict';
var gutil = require('gulp-util'),
    through = require('through2'),
    BH = require('bh').BH,
    path = require('path');

module.exports = function(options) {
    return through.obj(function(file, enc, cb) {
        var newBH = new BH(),
            filePath = file.path;

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-bemjson', 'Streaming not supported'));
            cb();
            return;
        }

        // with livereload bemjson object was cached
        require.cache[filePath] && delete require.cache[filePath];

        try {
            var obj = require(filePath),
                bemjson = obj.bemjson,
                bh = obj.bh;

            if (!bemjson) {
                this.push(file);
                cb();
                return;
            }

            bh && bh(newBH);

            file.contents = new Buffer(newBH.apply(obj.bemjson));
            file.path = path.join(path.dirname(filePath), path.basename(filePath, '.bemjson.js') + '.html');
            this.push(file);
        } catch(err) {
            this.emit('error', new gutil.PluginError('gulp-bemjson', err));
        }

        cb();
    });
};
