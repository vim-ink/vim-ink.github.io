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
var lf1 = l27;
var lf2 = l22;
var lf3 = l17;
var lf4 = l12;
var lf5 = l7;

var lb0 = l0;
var lb1 = l1;
var lb2 = l2;
var lb3 = l3;
var lb4 = l4;
var lb5 = l5;

var df0 = d23;
var df1 = d21;
var df2 = d19;
var df3 = d17;
var df4 = d15;
var df5 = d13;

var db0 = d1;
var db1 = d3;
var db2 = d5;
var db3 = d7;
var db4 = d9;
var db5 = d11;

var lbred = '#fff0f0';
var lbgreen = '#f0fff0';
var dbred = '#280808';
var dbgreen = '#082808';

var initialState = {
    _version: 0,
    activeColor: 'foreground',
    activeFile: 'javascript',
    activePane: 'light',
    activeVariant: 'light',
    exportName: 'my-default',
    exportedSource: undefined,
    hoverGroup: undefined,
    parsedSource: files.javascript.parsedSource,
    selectedGroup: 'Normal',
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
        Boolean: {color: lf3},
        ColorColumn: {backgroundColor: lb1},
        Comment: {color: lf4},
        Conceal: {color: lf3},
        Conditional: {color: lf2},
        Constant: {color: lf3},
        Cursor: {highlight: 'reverse'},
        CursorColumn: {backgroundColor: lb1},
        CursorLine: {backgroundColor: lb1},
        CursorLineNr: {color: lf4},
        DiffAdd: {backgroundColor: lbgreen},
        DiffChange: {backgroundColor: lb1},
        DiffDelete: {backgroundColor: lbred},
        DiffText: {backgroundColor: lb3},
        Directory: {color: lf2},
        Error: {backgroundColor: lbred},
        ErrorMsg: {backgroundColor: lbred},
        FoldColumn: {color: lf5},
        Folded: {color: lf4},
        Ignore: {},
        IncSearch: {backgroundColor: lb3},
        LineNr: {color: lf5},
        MatchParen: {backgroundColor: lb3},
        ModeMsg: {},
        MoreMsg: {},
        NonText: {color: lf5},
        Normal: {color: lf0, backgroundColor: lb0},
        Number: {color: lf3},
        Pmenu: {backgroundColor: lb1},
        PmenuSbar: {backgroundColor: lb2},
        PmenuSel: {backgroundColor: lb3},
        PmenuThumb: {backgroundColor: lb4},
        Question: {},
        Search: {backgroundColor: lb2},
        SignColumn: {color: lf5},
        Special: {color: lf3},
        SpecialKey: {color: lf5},
        SpellBad: {backgroundColor: lbred, highlight: 'undercurl'},
        SpellCap: {highlight: 'undercurl'},
        SpellLocal: {backgroundColor: lbgreen, highlight: 'undercurl'},
        SpellRare: {backgroundColor: lb2, highlight: 'undercurl'},
        Statement: {color: lf2},
        StatusLine: {color: lf1, backgroundColor: lb2},
        StatusLineNC: {color: lf4, backgroundColor: lb2},
        StorageClass: {color: lf2},
        String: {color: lf3},
        TabLine: {color: lf4, backgroundColor: lb2},
        TabLineFill: {backgroundColor: lb2},
        TabLineSel: {color: lf1, backgroundColor: lb2},
        Title: {color: lf3},
        Todo: {highlight: 'standout'},
        Type: {color: lf2},
        Underlined: {},
        VertSplit: {color: lb3},
        Visual: {backgroundColor: lb3},
        VisualNOS: {},
        WarningMsg: {backgroundColor: lbred},
        WildMenu: {backgroundColor: lb5},
        lCursor: {}
    },
    dark: {
        Boolean: {color: df3},
        ColorColumn: {backgroundColor: db1},
        Comment: {color: df4},
        Conceal: {color: df3},
        Conditional: {color: df2},
        Constant: {color: df3},
        Cursor: {highlight: 'reverse'},
        CursorColumn: {backgroundColor: db1},
        CursorLine: {backgroundColor: db1},
        CursorLineNr: {color: df4},
        DiffAdd: {backgroundColor: dbgreen},
        DiffChange: {backgroundColor: db1},
        DiffDelete: {backgroundColor: dbred},
        DiffText: {backgroundColor: db3},
        Directory: {color: df2},
        Error: {backgroundColor: dbred},
        ErrorMsg: {backgroundColor: dbred},
        FoldColumn: {color: df5},
        Folded: {color: df4},
        Ignore: {},
        IncSearch: {backgroundColor: db3},
        LineNr: {color: df5},
        MatchParen: {backgroundColor: db3},
        ModeMsg: {},
        MoreMsg: {},
        NonText: {color: df5},
        Normal: {color: df0, backgroundColor: db0},
        Number: {color: df3},
        Pmenu: {backgroundColor: db1},
        PmenuSbar: {backgroundColor: db2},
        PmenuSel: {backgroundColor: db3},
        PmenuThumb: {backgroundColor: db4},
        Question: {},
        Search: {backgroundColor: db2},
        SignColumn: {color: df5},
        Special: {color: df3},
        SpecialKey: {color: df5},
        SpellBad: {backgroundColor: dbred, highlight: 'undercurl'},
        SpellCap: {highlight: 'undercurl'},
        SpellLocal: {backgroundColor: dbgreen, highlight: 'undercurl'},
        SpellRare: {backgroundColor: db2, highlight: 'undercurl'},
        Statement: {color: df2},
        StatusLine: {color: df1, backgroundColor: db2},
        StatusLineNC: {color: df4, backgroundColor: db2},
        StorageClass: {color: df2},
        String: {color: df3},
        TabLine: {color: df4, backgroundColor: db2},
        TabLineFill: {backgroundColor: db2},
        TabLineSel: {color: df1, backgroundColor: db2},
        Title: {color: df3},
        Todo: {highlight: 'standout'},
        Type: {color: df2},
        Underlined: {},
        VertSplit: {color: db3},
        Visual: {backgroundColor: db3},
        VisualNOS: {},
        WarningMsg: {backgroundColor: dbred},
        WildMenu: {backgroundColor: db5},
        lCursor: {}
    }
};

module.exports = initialState;
