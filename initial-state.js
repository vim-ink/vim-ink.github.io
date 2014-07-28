var files = require('./files');

var l0 = '#ffffff';
var l1 = '#f8f8f8';
var l2 = '#f0f0f0';
var l3 = '#e8e8e8';
var l4 = '#e0e0e0';
var l5 = '#d8d8d8';
var l6 = '#d0d0d0';
var l7 = '#c8c8c8';
var l8 = '#c0c0c0';
var l9 = '#b8b8b8';
var l10 = '#b0b0b0';
var l11 = '#a8a8a8';
var l12 = '#a0a0a0';
var l13 = '#989898';
var l14 = '#909090';
var l15 = '#888888';
var l16 = '#808080';
var l17 = '#787878';
var l18 = '#707070';
var l19 = '#686868';
var l20 = '#606060';
var l21 = '#585858';
var l22 = '#505050';
var l23 = '#484848';
var l24 = '#404040';
var l25 = '#383838';
var l26 = '#303030';
var l27 = '#282828';
var l28 = '#202020';
var l29 = '#181818';
var l30 = '#101010';
var l31 = '#080808';
var l32 = '#000000';

var d0 = '#000000';
var d1 = '#080808';
var d2 = '#101010';
var d3 = '#181818';
var d4 = '#202020';
var d5 = '#282828';
var d6 = '#303030';
var d7 = '#383838';
var d8 = '#404040';
var d9 = '#484848';
var d10 = '#505050';
var d11 = '#585858';
var d12 = '#606060';
var d13 = '#686868';
var d14 = '#707070';
var d15 = '#787878';
var d16 = '#808080';
var d17 = '#888888';
var d18 = '#909090';
var d19 = '#989898';
var d20 = '#a0a0a0';
var d21 = '#a8a8a8';
var d22 = '#b0b0b0';
var d23 = '#b8b8b8';
var d24 = '#c0c0c0';
var d25 = '#c8c8c8';
var d26 = '#d0d0d0';
var d27 = '#d8d8d8';
var d28 = '#e0e0e0';
var d29 = '#e8e8e8';
var d30 = '#f0f0f0';
var d31 = '#f8f8f8';
var d32 = '#ffffff';

var lf0 = l32;
var lf1 = l24;
var lf2 = l18;
var lf3 = l14;
var lf4 = l12;
var lf5 = l6;

var lb0 = l0;
var lb1 = l1;
var lb2 = l2;
var lb3 = l3;
var lb4 = l4;
var lb5 = l5;

var df0 = d24;
var df1 = d21;
var df2 = d19;
var df3 = d15;
var df4 = d14;
var df5 = d10;

var db0 = d0;
var db1 = d4;
var db2 = d5;
var db3 = d7;
var db4 = d8;
var db5 = d9;

var lred = '#cc3333';

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
    ExportedSource: undefined,
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
    light: {
        ColorColumn: {backgroundColor: lb1},
        Comment: {color: lf4},
        Conceal: {color: lf1},
        Conditional: {color: lf1},
        Constant: {color: lf2},
        Cursor: {highlight: 'reverse'},
        CursorColumn: {backgroundColor: lb1},
        CursorLine: {backgroundColor: lb1},
        CursorLineNr: {color: lf4},
        DiffAdd: {},
        DiffChange: {},
        DiffDelete: {color: lred},
        DiffText: {},
        Directory: {color: lf1},
        Error: {},
        ErrorMsg: {color: lred},
        FoldColumn: {color: lf4},
        Folded: {color: lf4},
        Ignore: {},
        IncSearch: {backgroundColor: lb3},
        LineNr: {color: lf5},
        MatchParen: {backgroundColor: lb3},
        ModeMsg: {},
        MoreMsg: {},
        NonText: {color: lf5},
        Normal: {color: lf0, backgroundColor: lb0},
        Number: {color: lf2},
        Pmenu: {backgroundColor: lb1},
        PmenuSbar: {backgroundColor: lb0},
        PmenuSel: {backgroundColor: lb3},
        PmenuThumb: {backgroundColor: lb1},
        Question: {},
        Search: {backgroundColor: lb2},
        SignColumn: {color: lf5},
        Special: {color: lf1},
        SpecialKey: {color: lf5},
        SpellBad: {color: lred},
        SpellCap: {},
        SpellLocal: {},
        SpellRare: {},
        Statement: {color: lf1},
        StatusLine: {color: lf1, backgroundColor: lb2},
        StatusLineNC: {color: lf3, backgroundColor: lb2},
        StorageClass: {color: lf1},
        String: {color: lf2},
        TabLine: {color: lf3, backgroundColor: lb2},
        TabLineFill: {backgroundColor: lb2},
        TabLineSel: {color: lf1, backgroundColor: lb2},
        Title: {},
        Todo: {highlight: 'standout'},
        Type: {color: lf1},
        Underlined: {},
        VertSplit: {color: lb3},
        Visual: {backgroundColor: lb3},
        VisualNOS: {},
        WarningMsg: {},
        WildMenu: {backgroundColor: lb2},
        lCursor: {}
    },
    dark: {
        ColorColumn: {backgroundColor: db1},
        Comment: {color: df4},
        Conceal: {color: df1},
        Conditional: {color: df1},
        Constant: {color: df2},
        Cursor: {highlight: 'reverse'},
        CursorColumn: {backgroundColor: db1},
        CursorLine: {backgroundColor: db1},
        CursorLineNr: {color: df4},
        DiffAdd: {},
        DiffChange: {},
        DiffDelete: {color: lred},
        DiffText: {},
        Directory: {color: df1},
        Error: {},
        ErrorMsg: {color: lred},
        FoldColumn: {color: df4},
        Folded: {color: df4},
        Ignore: {},
        IncSearch: {backgroundColor: db3},
        LineNr: {color: df5},
        MatchParen: {backgroundColor: db3},
        ModeMsg: {},
        MoreMsg: {},
        NonText: {color: df5},
        Normal: {color: df0, backgroundColor: db0},
        Number: {color: df2},
        Pmenu: {backgroundColor: db1},
        PmenuSbar: {backgroundColor: db0},
        PmenuSel: {backgroundColor: db3},
        PmenuThumb: {backgroundColor: db1},
        Question: {},
        Search: {backgroundColor: db2},
        SignColumn: {color: df5},
        Special: {color: df1},
        SpecialKey: {color: df5},
        SpellBad: {color: lred},
        SpellCap: {},
        SpellLocal: {},
        SpellRare: {},
        Statement: {color: df1},
        StatusLine: {color: df1, backgroundColor: db2},
        StatusLineNC: {color: df3, backgroundColor: db2},
        StorageClass: {color: df1},
        String: {color: df2},
        TabLine: {color: df3, backgroundColor: db2},
        TabLineFill: {backgroundColor: db2},
        TabLineSel: {color: df1, backgroundColor: db2},
        Title: {},
        Todo: {highlight: 'standout'},
        Type: {color: df1},
        Underlined: {},
        VertSplit: {color: db3},
        Visual: {backgroundColor: db3},
        VisualNOS: {},
        WarningMsg: {},
        WildMenu: {backgroundColor: db2},
        lCursor: {}
    }
};

module.exports = initialState;
