var _ = require('lodash');
var files = require('./files');
var colorSchemes = require('./color-schemes');

console.log(colorSchemes['default_']);

var initialState = {
    _version: 1,
    activeColorSchemeBase: 'default_',
    activeColor: 'foreground',
    activeFile: 'intro',
    activePane: 'dark',
    activeVariant: 'dark',
    exportName: 'my-default',
    exportedSource: undefined,
    hoverGroup: undefined,
    parsedSource: files.intro.parsedSource,
    selectedGroup: 'Normal',
    postProcess: {
        light: {
            brightness: 0,
            saturation: 0
        },
        dark: {
            brightness: 0,
            saturation: 0
        }
    },
    componentsVisibility: {
        tabLine: 'show',
        lineNumbers: 'show',
        statusLine: 'show'
    },
    sectionsVisibility: {
        selectedGroup: 'show',
        color: 'show',
        highlight: 'show',
        postProcess: 'hide',
        modifiedGroups: 'hide',
        export_: 'show',
        components: 'hide',
        dangerZone: 'hide'
    },
    light: _.cloneDeep(colorSchemes['default_'].light),
    dark: _.cloneDeep(colorSchemes['default_'].dark)
};

module.exports = initialState;
