# [gulp](http://gulpjs.com)-bemjson [![Build Status](https://travis-ci.org/molforp/gulp-bemjson.svg?branch=master)](https://travis-ci.org/molforp/gulp-bemjson)

Process BEMJSON to HTML with [BH](https://github.com/enb-make/bh)

## Install

```sh
$ npm install --save-dev gulp-bemjson
```

## Usage

```js
// gulpfile.js
var gulp = require('gulp');
var bemjson = require('gulp-bemjson');

gulp.task('default', function () {
	return gulp.src('src/index.bemjson.js')
		.pipe(bemjson())
		.pipe(gulp.dest('dist'));
});
```

```js
//page.bemjson.js
module.exports.bemjson = {
    block: 'page',
    tag: 'html',
    content:  {
        elem: 'body',
        tag: 'body',
        content: 'Hello!'
    }
};
```

With some [BH](https://github.com/enb-make/bh) templates, which applies for this file only:

```js
//page.bemjson.js
module.exports.bemjson = {
    block: 'page',
    content:  {
        elem: 'body',
        content: 'Hello!'
    }
};

module.exports.bh = function(bh) {
    bh.match('page', function(ctx, json) {
        ctx.tag('html');

        return [
            '<!doctype html>',
            json
        ];
    });
};
```

What is it [BEM](http://bem.info/)?

## License

MIT © [Dmitry Kokorev](https://github.com/molforp)
