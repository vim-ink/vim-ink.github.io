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
        Normal: { color: '#aaaaaa', backgroundColor: '#000000' },

        Cursor: { highlight: 'reverse' },
        IncSearch: { backgroundColor: '#666666' },
        MatchParen: { backgroundColor: '#666666' },
        Search: { backgroundColor: '#444444' },
        Visual: { backgroundColor: '#666666' },

        Conditional: { color: '#999999' },
        Special: { color: '#999999' },
        Statement: { color: '#999999' },
        StorageClass: { color: '#999999' },
        Type: { color: '#999999' },

        Constant: { color: '#777777' },
        Number: { color: '#777777' },
        String: { color: '#777777' },

        Comment: { color: '#555555' },
        LineNr: { color: '#555555' },
        NonText: { color: '#555555' },

        StatusLine: { color: '#999999', backgroundColor: '#222222' },
        StatusLineNC: { color: '#777777', backgroundColor: '#222222' },
        TabLine: { color: '#777777', backgroundColor: '#222222' },
        TabLineFill: { backgroundColor: '#222222' },
        TabLineSel: { color: '#999999', backgroundColor: '#222222' },
        VertSplit: { color: '#222222', backgroundColor: '#222222' }
    },
    light: {
        Normal: { color: '#000000', backgroundColor: '#ffffff' },

        Cursor: { highlight: 'reverse' },
        IncSearch: { backgroundColor: '#bbbbbb' },
        MatchParen: { backgroundColor: '#bbbbbb' },
        Search: { backgroundColor: '#dddddd' },
        Visual: { backgroundColor: '#bbbbbb' },

        Conditional: { color: '#777777' },
        Special: { color: '#777777' },
        Statement: { color: '#777777' },
        StorageClass: { color: '#777777' },
        Type: { color: '#777777' },

        Constant: { color: '#999999' },
        Number: { color: '#999999' },
        String: { color: '#999999' },

        Comment: { color: '#cccccc' },
        LineNr: { color: '#cccccc' },
        NonText: { color: '#cccccc' },

        StatusLine: { color: '#777777', backgroundColor: '#eeeeee' },
        StatusLineNC: { color: '#bbbbbb', backgroundColor: '#eeeeee' },
        TabLine: { color: '#bbbbbb', backgroundColor: '#eeeeee' },
        TabLineFill: { backgroundColor: '#eeeeee' },
        TabLineSel: { color: '#777777', backgroundColor: '#eeeeee' },
        VertSplit: { color: '#eeeeee', backgroundColor: '#eeeeee' },

    }
};

module.exports = initialState;
