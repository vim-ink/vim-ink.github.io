var files = require('./files');
var {light, dark} = require('./colors');

var lf0 = light[32];
var lf1 = light[27];
var lf2 = light[22];
var lf3 = light[17];
var lf4 = light[12];
var lf5 = light[7];

var lb0 = light[0];
var lb1 = light[1];
var lb2 = light[2];
var lb3 = light[3];
var lb4 = light[4];
var lb5 = light[5];

var lbred = '#fff0f0';
var lbgreen = '#f0fff0';

var df0 = dark[23];
var df1 = dark[21];
var df2 = dark[19];
var df3 = dark[17];
var df4 = dark[15];
var df5 = dark[13];

var db0 = dark[1];
var db1 = dark[3];
var db2 = dark[5];
var db3 = dark[7];
var db4 = dark[9];
var db5 = dark[11];

var dbred = '#280808';
var dbgreen = '#082808';

var initialState = {
    _version: 0,
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
