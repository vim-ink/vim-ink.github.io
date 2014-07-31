var Color = require('color');

var cols = 84 + 4; // Firefox and Safari needs four additional characters in order to fill the 84rem width

// spaces(4) returns '    '
var spaces = n => ' '.repeat(n);

// fill('foo', 8, '-')  returns 'foo-----'
// fill(' foo', 8, '-') returns ' foo----'
var fill = (str, totalWidth = cols, chr = ' ') => {
    return str + chr.repeat(totalWidth - str.length);
}

// merge({a: 'foo'}, {b: 'bar', c: 'baz'}) returns {a: 'foo', b: 'bar', c: 'baz'}
var merge = (...args) => Object.assign({}, ...args);

function getGroupStyle(normal, group, postProcess) {
    var color = ('color' in group ?  group.color : undefined);
    var backgroundColor = ('backgroundColor' in group ?  group.backgroundColor : undefined);

    var style = {};

    switch (group.highlight) {
        case 'bold':
            style['fontWeight'] = '400';
            break;
        case 'italic':
            style['fontStyle'] = 'italic';
            break;
        case 'underline':
            style['textDecoration'] = 'underline';
            break;
        case 'undercurl':
            style['border-bottom'] = '1px dotted #888888';
            break;
        case 'reverse':
            var color_ = color;

            color = backgroundColor !== undefined ? backgroundColor : normal.backgroundColor;
            backgroundColor = color_ !== undefined ? color_ : normal.color;
            break;
        case 'standout':
            style['fontWeight'] = 600;
            var color_ = color;

            color = backgroundColor !== undefined ? backgroundColor : normal.backgroundColor;
            backgroundColor = color_ !== undefined ? color_ : normal.color;
            break;
    }

    if (color !== undefined) {
        style['color'] = Color(color)
            .lighten(postProcess.brightness)
            .saturate(postProcess.saturation)
            .hexString();
    } else {
        style['color'] = undefined;
    }

    if (backgroundColor !== undefined) {
        style['backgroundColor'] = Color(backgroundColor)
            .lighten(postProcess.brightness)
            .saturate(postProcess.saturation)
            .hexString();
    } else {
        style['backgroundColor'] = undefined;
    }

    return style;
}

module.exports = {
    cols,
    spaces,
    fill,
    merge,
    getGroupStyle
};
