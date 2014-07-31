var group = (group, content) => { return {group, content}; };
var sign = (s = '  ') => group('SignColumn', s);
var line = (s, group_ = 'LineNr') => group(group_, s);
var spaces = n => ' '.repeat(n);
var fill = (str, chr, totalWidth) => {
    return str + chr.repeat(totalWidth - str.length);
}

var files = {
    editor: {
        parsedSource: [
            [sign(), line('  1 '), spaces(2), group('CursorColumn', ' ')],
            [sign(), line('  2 '), spaces(2), group('CursorColumn', ' ')],
            [sign(), line('  3 ', 'CursorLineNr'), group('CursorLine', spaces(2)), group('Cursor', 'T'), group('CursorLine', 'he cursor' + spaces(73))],
            [sign(), line('  4 '), spaces(75), group('ColorColumn', ' ')],
            [sign(), line('  5 '), group('Visual', 'These words'), ' are selected' + spaces(51), group('ColorColumn', ' ')],
            [sign(), line('  6 '), 'Currently searching for ', group('IncSearch', 'foo'), ', already found ', group('Search', 'bar')],
            [sign(), line('  7 '), group('Cursor', '('), 'matching parens', group('MatchParen', ')')],
            [sign(), line('  8 '), 'foo(bar({baz, [qux', group('Error', '}))'), ' ', group('Comment', '// '), group('Todo', 'TODO'), group('Comment', ': Fix error')],
            [sign(), line('  9 '), group('Conceal', 'ƒ'), ' is a conceal character for `function`'],
            [sign(), line(' 10 ')],
            [sign('--'), line(' 11 '), group('DiffDelete', 'This line was deleted' + spaces(62))],
            [sign(), line(' 12 '), group('DiffText', 'These words'), group('DiffChange', ' on this line was changed' + spaces(47))],
            [sign('++'), line(' 13 '), group('DiffAdd', 'This line was added' + spaces(64))],
            [sign(), line(' 14 '), ],
            [sign(), line(' 15 '), 'A ', group('SpellBad', 'mispelled'), ' word'],
            [sign(), line(' 16 '), group('SpellCap', 'line'), ' starting without capital letter'],
            [sign(), line(' 17 '), 'For some reason ', group('SpellLocal', 'okay'), ' is a local word'],
            [sign(), line(' 18 '), group('SpellRare', 'vim'), ' seems to be a rare word'],
            [],
            [group('FoldColumn', '    '), group('Title', '# Heading 1')],
            [group('FoldColumn', '-   '), 'This is a paragraph'],
            [group('FoldColumn', '|   '), ''],
            [group('FoldColumn', '|   '), group('Title', '## Heading 1.1')],
            [group('FoldColumn', '|-  '), 'This is another paragraph'],
            [group('FoldColumn', '||  '), ''],
            [group('FoldColumn', '||  '), group('Title', '### Heading 1.1.1')],
            [group('FoldColumn', '||+ '), group('Folded', '+----  2 lines: This is a folded paragraph')],
            [group('FoldColumn', '||  '), group('Title', '### Heading 1.1.2')],
            [group('FoldColumn', '||+ '), group('Folded', '+----  2 lines: This is another folded paragraph')],
        ]
    },
    ui: {
        parsedSource: [
            [fill('one line', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('another line', ' ', 22), group('VertSplit', '│'), '  f', fill('', ' ', 61)],
            [fill('a third line', ' ', 22), group('VertSplit', '│'), '  ', group('Pmenu', 'foo' + spaces(18)), group('PmenuSbar', ' ')],
            [fill('', ' ', 22), group('VertSplit', '│'), '  ', group('PmenuSel', 'foobar' + spaces(15)), group('PmenuSbar', ' '), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), '  ', group('Pmenu', 'function' + spaces(13)), group('PmenuThumb', ' '), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), '  ', group('Pmenu', 'fun' + spaces(18)), group('PmenuSbar', ' '), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), group('VertSplit', '│'), fill('', ' ', 61)],
            [group('StatusLineNC', fill('inactive status', ' ', 23)), group('StatusLine', fill('active status', ' ', 62))],
            [group('WarningMsg', 'W10: Warning: Changing a readonly file')],
            [group('ErrorMsg', 'E37: No write since last change (add ! to override)')],
            [group('ModeMsg', '-- INSERT --')],
            [group('MoreMsg', '-- More --')],
            [],
            [fill('one-file', ' ', 22), fill('another-file', ' ', 22), fill('a-third-file', ' ', 22)],
            [group('Directory', 'one-directory'), fill('/', ' ', 9), group('Directory', 'another-directory'), fill('/', ' ', 5)],

            [group('StatusLine', 'one-file  another-file  '), group('WildMenu', 'a-third-file'), group('StatusLine', spaces(51))],
        ]
    },
    about: {
        parsedSource: [[{"group":"Special","content":"#"}," About"],[""],[{"group":"Special","content":"##"}," What is this?"],[""],["vim.ink is a color scheme designer for vim."]]
    },
    html: {
        parsedSource: [[{"group":"Comment","content":"<!DOCTYPE html>"}],[{"group":"htmlTag","content":"<"},{"group":"Statement","content":"html"},{"group":"htmlTag","content":" "},{"group":"Type","content":"lang"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"en\""},{"group":"htmlTag","content":">"}],["    ",{"group":"htmlTag","content":"<"},{"group":"Statement","content":"head"},{"group":"htmlTag","content":">"}],[{"group":"PreProc","content":"        "},{"group":"htmlTag","content":"<"},{"group":"Statement","content":"meta"},{"group":"htmlTag","content":" "},{"group":"Type","content":"charset"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"utf-8\""},{"group":"htmlTag","content":">"}],[{"group":"PreProc","content":"        "},{"group":"htmlTag","content":"<"},{"group":"Statement","content":"title"},{"group":"htmlTag","content":">"},{"group":"Title","content":"vim.ink"},{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"title"},{"group":"htmlEndTag","content":">"}],[{"group":"PreProc","content":"        "},{"group":"htmlTag","content":"<"},{"group":"Statement","content":"link"},{"group":"htmlTag","content":" "},{"group":"Type","content":"rel"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"stylesheet\""},{"group":"htmlTag","content":" "},{"group":"Type","content":"href"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"dest/app.css\""},{"group":"htmlTag","content":">"}],[{"group":"PreProc","content":"    "},{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"head"},{"group":"htmlEndTag","content":">"}],["    ",{"group":"htmlTag","content":"<"},{"group":"Statement","content":"body"},{"group":"htmlTag","content":">"}],["        ",{"group":"htmlTag","content":"<"},{"group":"Exception","content":"script"},{"group":"htmlTag","content":" "},{"group":"Type","content":"src"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"dest/app.js\""},{"group":"htmlTag","content":">"},{"group":"htmlEndTag","content":"</"},{"group":"Exception","content":"script"},{"group":"htmlEndTag","content":">"}],["    ",{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"body"},{"group":"htmlEndTag","content":">"}],[{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"html"},{"group":"htmlEndTag","content":">"}],[""]]
    },
    css: {
        parsedSource: [[{"group":"Comment","content":"/* Reset */"}],[""],[{"group":"Statement","content":"*"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"box-sizing"},": ",{"group":"Constant","content":"border-box"},";"],["    ",{"group":"Comment","content":"-webkit-"},{"group":"StorageClass","content":"touch-callout"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"Comment","content":"-webkit-"},{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    -khtml-",{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"Comment","content":"-moz-"},{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"Comment","content":"-ms-"},{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Comment","content":"/* Typography */"}],[""],[{"group":"Statement","content":"html"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-size"},": ",{"group":"Number","content":"62.5"},{"group":"Number","content":"%"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Statement","content":"body"},{"group":"Special","content":","}," ",{"group":"Statement","content":"input"},{"group":"Special","content":","}," ",{"group":"Statement","content":"button"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-family"},": ",{"group":"String","content":"'Source Sans Pro'"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Statement","content":"pre"},{"group":"Special","content":","}," ",{"group":"Statement","content":"textarea"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-family"},": ",{"group":"String","content":"'Source Code Pro'"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Statement","content":"body"},{"group":"Special","content":","}," ",{"group":"Statement","content":"h1"},{"group":"Special","content":","}," ",{"group":"Statement","content":"h2"},{"group":"Special","content":","}," ",{"group":"Statement","content":"button"},{"group":"Special","content":","}," ",{"group":"Statement","content":"input"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-weight"},": ",{"group":"Number","content":"300"},";"],[{"group":"cssBraces","content":"}"}],[""]]
    },
    javascript: {
        parsedSource: [[{"group":"StorageClass","content":"var"}," React ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'react'"},");"],[{"group":"StorageClass","content":"var"}," _ ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'lodash'"},");"],[""],[{"group":"StorageClass","content":"var"}," Header ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./header'"},");"],[{"group":"StorageClass","content":"var"}," Left ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./left'"},");"],[{"group":"StorageClass","content":"var"}," Right ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./right'"},");"],[{"group":"StorageClass","content":"var"}," Footer ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./footer'"},");"],[{"group":"StorageClass","content":"var"}," Export ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./export'"},");"],[""],[{"group":"StorageClass","content":"var"}," App ",{"group":"Operator","content":"="}," React.createClass({"],["    getInitialState() {"],["        ",{"group":"StorageClass","content":"var"}," {initialState} ",{"group":"Operator","content":"="}," ",{"group":"Special","content":"this"},".props;"],[""],["        ",{"group":"Conditional","content":"if"}," (localStorage.getItem(",{"group":"String","content":"'state'"},") ",{"group":"Operator","content":"!=="}," ",{"group":"Type","content":"null"},") {"],["            ",{"group":"Statement","content":"return"}," ",{"group":"Special","content":"JSON"},".parse(localStorage.getItem(",{"group":"String","content":"'state'"},"));"],["        } ",{"group":"Conditional","content":"else"}," {"],["            ",{"group":"Statement","content":"return"}," _.cloneDeep(initialState);"],["        }"],["    },"],[""]]
    },
    python: {
        parsedSource: undefined
    },
    ruby: {
        parsedSource: undefined
    },
    go: {
        parsedSource: undefined
    },
    rust: {
        parsedSource: undefined
    },
    haskell: {
        parsedSource: undefined
    },
    markdown: {
        parsedSource: undefined
    }
}

module.exports = files;
