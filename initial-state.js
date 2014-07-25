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
    exportName: 'my-default',
    exportedSource: undefined,
    postProcess: {
        dark: {
            brightness: 0,
            saturation: 0
        },
        light: {
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
            color: '#999999',
            backgroundColor: '#222222'
        },
        TabLine: {
            color: '#666666',
            backgroundColor: '#282828'
        },
        TabLineSel: {
            color: '#888888',
            backgroundColor: '#282828'
        },
        TabLineFill: {
            backgroundColor: '#282828'
        },
        StatusLine: {
            color: '#888888',
            backgroundColor: '#282828'
        },
        StatusLineNC: {
            color: '#666666',
            backgroundColor: '#282828'
        },
        LineNr: {
            color: '#666666'
        },
        String: {
            color: '#888888'
        },
        Number: {
            color: '#888888'
        },
        Constant: {
            color: '#888888'
        },
        Comment: {
            color: '#666666'
        },
        NonText: {
            color: '#666666'
        },
        StorageClass: {
            color: '#666666'
        },
        Conditional: {
            color: '#666666'
        },
        Special: {
            color: '#666666'
        },
        Type: {
            color: '#666666'
        },
        Cursor: {
            highlight: 'reverse'
        },
        Visual: {
            backgroundColor: '#555555'
        },
        IncSearch: {
            backgroundColor: '#666666'
        },
        Search: {
            backgroundColor: '#666666'
        },
        MatchParen: {
            backgroundColor: '#666666'
        },
        VertSplit: {
            color: '#282828',
            backgroundColor: '#282828'
        }
    },
    light: {
        Normal: {
            color: '#111111',
            backgroundColor: '#ffffff',
        },
        TabLine: {
            color: '#bbbbbb',
            backgroundColor: '#f4f4f4'
        },
        TabLineSel: {
            color: '#777777',
            backgroundColor: '#f4f4f4'
        },
        TabLineFill: {
            backgroundColor: '#f4f4f4'
        },
        StatusLine: {
            color: '#777777',
            backgroundColor: '#f4f4f4'
        },
        StatusLineNC: {
            color: '#bbbbbb',
            backgroundColor: '#f4f4f4'
        },
        LineNr: {
            color: '#cccccc'
        },
        String: {
            color: '#999999'
        },
        Number: {
            color: '#999999'
        },
        Constant: {
            color: '#999999'
        },
        Comment: {
            color: '#bbbbbb'
        },
        NonText: {
            color: '#dddddd'
        },
        StorageClass: {
            color: '#777777'
        },
        Conditional: {
            color: '#777777'
        },
        Special: {
            color: '#777777'
        },
        Type: {
            color: '#777777'
        },
        Cursor: {
            highlight: 'reverse'
        },
        Visual: {
            backgroundColor: '#cccccc'
        },
        IncSearch: {
            backgroundColor: '#cccccc'
        },
        Search: {
            backgroundColor: '#eeeeee'
        },
        MatchParen: {
            backgroundColor: '#cccccc'
        },
        VertSplit: {
            color: '#f4f4f4',
            backgroundColor: '#f4f4f4'
        }
    }
};

module.exports = initialState;
