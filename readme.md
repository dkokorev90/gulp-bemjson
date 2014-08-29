# [gulp](http://gulpjs.com)-bemjson [![Build Status][travImg]][travUrl] [![Dependency Status][davidImg]][davidUrl]

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
	return gulp.src('src/index.bemjson.js', { read: false })
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

[travUrl]: https://travis-ci.org/molforp/gulp-bemjson
[travImg]: http://img.shields.io/travis/molforp/gulp-bemjson.svg?branch=master&style=flat-square

[davidUrl]: https://david-dm.org/molforp/gulp-bemjson
[davidImg]: http://img.shields.io/david/molforp/gulp-bemjson.svg?branch=master&style=flat-square
