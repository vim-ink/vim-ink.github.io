var Color = require('color');

function getGroupStyle(normal, group, postProcess) {
    var color = ('color' in group ?  group.color : undefined);
    var backgroundColor = ('backgroundColor' in group ?  group.backgroundColor : undefined);

    var style = {};

    switch (group.highlight) {
        case 'bold':
            style['fontFamily'] = 'Input Mono Narr Md';
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
            style['fontFamily'] = 'Input Mono Narr Md';
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
    getGroupStyle
};
