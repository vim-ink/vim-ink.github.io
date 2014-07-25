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
            color: '#aaaaaa',
            backgroundColor: '#000000',
            highlight: 'NONE'
        },
        TabLine: {
            color: '#666666'
        },
        TabLineSel: {
            color: '#888888'
        },
        TabLineFill: {
        },
        StatusLine: {
            color: '#888888'
        },
        StatusLineNC: {
            color: '#666666'
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
            color: '#222222',
            backgroundColor: '#222222'
        }
    },
    light: {
        Normal: {
            color: '#000000',
            backgroundColor: '#ffffff',
            highlight: 'NONE'
        },
        TabLine: {
            color: '#aaaaaa'
        },
        TabLineSel: {
            color: '#666666'
        },
        StatusLine: {
            color: '#666666'
        },
        StatusLineNC: {
            color: '#aaaaaa'
        },
        LineNr: {
            color: '#bbbbbb'
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
            color: '#bbbbbb'
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
            color: '#eeeeee',
            backgroundColor: '#eeeeee'
        }
    }
};

module.exports = initialState;
