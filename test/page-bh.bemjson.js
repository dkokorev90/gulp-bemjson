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

    bh.match('page__body', function(ctx, json) {
        ctx.tag('body');
    });
};
