var files = require('./files');

var initialState = {
    _version: 0,
    parsedSource: files.html.parsedSource,
    activeVariant: 'light',
    selectedGroup: 'Normal',
    activeColor: 'foreground',
    activeFile: 'html',
    postProcess: {
        brightness: 0,
        saturation: 0
    },
    componentsVisibility: {
        tabLine: 'show',
        lineNumbers: 'show'
    },
    dark: {
        Normal: {
            color: '#cccccc',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        TabLine: {
            color: '#666666',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        TabLineSel: {
            color: '#999999',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        LineNr: {
            color: '#666666',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        String: {
            color: '#999999',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        Number: {
            color: '#999999',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        Comment: {
            color: '#666666',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        Cursor: {
            highlight: 'reverse'
        },
        Visual: {
            highlight: 'reverse'
        }
    },
    light: {
        Normal: {
            color: '#000000',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        TabLine: {
            color: '#cccccc',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        TabLineSel: {
            color: '#999999',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        LineNr: {
            color: '#cccccc',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        String: {
            color: '#999999',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        Number: {
            color: '#999999',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        Cursor: {
            highlight: 'reverse'
        },
        Visual: {
            highlight: 'reverse'
        }
    }
};

module.exports = initialState;
