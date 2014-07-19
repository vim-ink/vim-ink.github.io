var files = require('./files');

var initialState = {
    _version: 0,
    parsedSource: files.html.parsedSource,
    activeVariant: 'light',
    selectedGroup: 'Normal',
    hoverGroup: undefined,
    activeColor: 'foreground',
    activeFile: 'html',
    activePane: 'light',
    postProcess: {
        brightness: 0,
        saturation: 0
    },
    componentsVisibility: {
        tabLine: 'show',
        lineNumbers: 'show'
    },
    sectionsVisibility: {
        variant: 'show',
        selectedGroup: 'show',
        color: 'show',
        highlight: 'show',
        modifiedGroups: 'hide',
        components: 'hide',
        postProcess: 'hide',
        export_: 'show',
        dangerZone: 'hide'
    },
    dark: {
        Normal: {
            color: '#cccccc',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        TabLine: {
            color: '#666666',
        },
        TabLineSel: {
            color: '#999999',
        },
        LineNr: {
            color: '#666666',
        },
        String: {
            color: '#999999',
        },
        Number: {
            color: '#999999',
        },
        Constant: {
            color: '#999999',
        },
        Comment: {
            color: '#666666',
        },
        StorageClass: {
            color: '#666666',
        },
        Conditional: {
            color: '#666666',
        },
        Special: {
            color: '#666666',
        },
        Type: {
            color: '#666666',
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
        },
        TabLineSel: {
            color: '#999999',
        },
        LineNr: {
            color: '#cccccc',
        },
        String: {
            color: '#999999',
        },
        Number: {
            color: '#999999',
        },
        Constant: {
            color: '#999999',
        },
        Comment: {
            color: '#cccccc',
        },
        StorageClass: {
            color: '#666666',
        },
        Conditional: {
            color: '#666666',
        },
        Special: {
            color: '#666666',
        },
        Type: {
            color: '#666666',
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
