var initialState = {
    _version: 0,
    unparsedSource: undefined,
    parsedSource: undefined,
    activeVariant: 'light',
    selectedGroup: 'Normal',
    activeColor: 'foreground',
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
            color: '#000000',
            backgroundColor: '#aaaaaa',
            highlight: 'NONE'
        },
        TabLineSel: {
            color: '#000000',
            backgroundColor: '#cccccc',
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
            color: '#000000',
            backgroundColor: '#cccccc',
            highlight: 'NONE'
        },
        TabLineSel: {
            color: '#000000',
            backgroundColor: '#aaaaaa',
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
