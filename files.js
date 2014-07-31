var spaces = n => ' '.repeat(n);
var g = (group, content) => {
    return {group, content};
};
var line = (s, group = 'LineNr') => g(group, s);
var sign = (s) => g('SignColumn', s);
var fill = (str, chr, totalWidth) => {
    return str + chr.repeat(totalWidth - str.length);
}

var files = {
    vimEditor: {
        title: 'vim',
        parsedSource: [
            [sign('  '), line('  1 '), spaces(2), g('CursorColumn', ' ')],
            [sign('  '), line('  2 '), spaces(2), g('CursorColumn', ' ')],
            [sign('  '), line('  3 ', 'CursorLineNr'), g('CursorLine', spaces(2)), g('Cursor', 'T'), g('CursorLine', 'he cursor' + spaces(73))],
            [sign('  '), line('  4 '), spaces(78), g('ColorColumn', ' ')],
            [sign('  '), line('  5 '), g('Visual', 'These words'), ' are selected' + spaces(54), g('ColorColumn', ' ')],
            [sign('  '), line('  6 '), 'Currently searching for ', g('IncSearch', 'foo'), ', already found ', g('Search', 'bar')],
            [sign('  '), line('  7 '), g('Cursor', '('), 'matching parens', g('MatchParen', ')')],
            [sign('  '), line('  8 '), 'foo(bar({baz, [qux', g('Error', '}))'), ' ', g('Comment', '// '), g('Todo', 'TODO'), g('Comment', ': Fix error')],
            [sign('  '), line('  9 '), g('Conceal', 'ƒ'), ' is a conceal character for `function`'],
            [sign('  '), line(' 10 ')],
            [sign('--'), line(' 11 '), g('DiffDelete', 'This line was deleted' + spaces(62))],
            [sign('  '), line(' 12 '), g('DiffText', 'These words'), g('DiffChange', ' on this line was changed' + spaces(47))],
            [sign('++'), line(' 13 '), g('DiffAdd', 'This line was added' + spaces(64))],
            [],
            [g('FoldColumn', '    '), g('Title', '# Heading 1')],
            [g('FoldColumn', '-   '), 'This is a paragraph'],
            [g('FoldColumn', '|   '), ''],
            [g('FoldColumn', '|   '), g('Title', '## Heading 1.1')],
            [g('FoldColumn', '|-  '), 'This is another paragraph'],
            [g('FoldColumn', '||  '), ''],
            [g('FoldColumn', '||  '), g('Title', '### Heading 1.1.1')],
            [g('FoldColumn', '||+ '), g('Folded', '+----  2 lines: This is a folded paragraph')],
            [g('FoldColumn', '||  '), g('Title', '### Heading 1.1.2')],
            [g('FoldColumn', '||+ '), g('Folded', '+----  2 lines: This is another folded paragraph')],
        ]
    },
    vimUI: {
        title: 'vim',
        parsedSource: [
            [fill('one line', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('another line', ' ', 22), g('VertSplit', '│'), '  f', fill('', ' ', 61)],
            [fill('a third line', ' ', 22), g('VertSplit', '│'), '  ', g('Pmenu', 'foo' + spaces(18)), g('PmenuSbar', ' ')],
            [fill('', ' ', 22), g('VertSplit', '│'), '  ', g('PmenuSel', 'foobar' + spaces(15)), g('PmenuSbar', ' '), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), '  ', g('Pmenu', 'function' + spaces(13)), g('PmenuThumb', ' '), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), '  ', g('Pmenu', 'fun' + spaces(18)), g('PmenuSbar', ' '), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [fill('', ' ', 22), g('VertSplit', '│'), fill('', ' ', 61)],
            [g('StatusLineNC', fill('inactive status', ' ', 23)), g('StatusLine', fill('active status', ' ', 62))],
            [g('ErrorMsg', 'E37: No write since last change (add ! to override)')],
            [g('WarningMsg', 'W10: Warning: Changing a readonly file')],
            [g('ModeMsg', '-- INSERT --')],
            [g('MoreMsg', '-- More --')],
            [],
            [fill('one-file', ' ', 22), fill('another-file', ' ', 22), fill('a-third-file', ' ', 22)],
            [g('Directory', 'one-directory'), fill('/', ' ', 9), g('Directory', 'another-directory'), fill('/', ' ', 5)],

            [g('StatusLine', 'one-file  another-file  '), g('WildMenu', 'a-third-file'), g('StatusLine', spaces(51))],
        ]
    },
    about: {
        title: 'About',
        parsedSource: [[{"group":"Special","content":"#"}," About"],[""],[{"group":"Special","content":"##"}," What is this?"],[""],["vim.ink is a color scheme designer for vim."]]
    },
    html: {
        title: 'HTML',
        parsedSource: [[{"group":"Comment","content":"<!DOCTYPE html>"}],[{"group":"htmlTag","content":"<"},{"group":"Statement","content":"html"},{"group":"htmlTag","content":" "},{"group":"Type","content":"lang"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"en\""},{"group":"htmlTag","content":">"}],["    ",{"group":"htmlTag","content":"<"},{"group":"Statement","content":"head"},{"group":"htmlTag","content":">"}],[{"group":"PreProc","content":"        "},{"group":"htmlTag","content":"<"},{"group":"Statement","content":"meta"},{"group":"htmlTag","content":" "},{"group":"Type","content":"charset"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"utf-8\""},{"group":"htmlTag","content":">"}],[{"group":"PreProc","content":"        "},{"group":"htmlTag","content":"<"},{"group":"Statement","content":"title"},{"group":"htmlTag","content":">"},{"group":"Title","content":"vim.ink"},{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"title"},{"group":"htmlEndTag","content":">"}],[{"group":"PreProc","content":"        "},{"group":"htmlTag","content":"<"},{"group":"Statement","content":"link"},{"group":"htmlTag","content":" "},{"group":"Type","content":"rel"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"stylesheet\""},{"group":"htmlTag","content":" "},{"group":"Type","content":"href"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"dest/app.css\""},{"group":"htmlTag","content":">"}],[{"group":"PreProc","content":"    "},{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"head"},{"group":"htmlEndTag","content":">"}],["    ",{"group":"htmlTag","content":"<"},{"group":"Statement","content":"body"},{"group":"htmlTag","content":">"}],["        ",{"group":"htmlTag","content":"<"},{"group":"Exception","content":"script"},{"group":"htmlTag","content":" "},{"group":"Type","content":"src"},{"group":"htmlTag","content":"="},{"group":"String","content":"\"dest/app.js\""},{"group":"htmlTag","content":">"},{"group":"htmlEndTag","content":"</"},{"group":"Exception","content":"script"},{"group":"htmlEndTag","content":">"}],["    ",{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"body"},{"group":"htmlEndTag","content":">"}],[{"group":"htmlEndTag","content":"</"},{"group":"Statement","content":"html"},{"group":"htmlEndTag","content":">"}],[""]]
    },
    css: {
        title: 'CSS',
        parsedSource: [[{"group":"Comment","content":"/* Reset */"}],[""],[{"group":"Statement","content":"*"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"box-sizing"},": ",{"group":"Constant","content":"border-box"},";"],["    ",{"group":"Comment","content":"-webkit-"},{"group":"StorageClass","content":"touch-callout"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"Comment","content":"-webkit-"},{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    -khtml-",{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"Comment","content":"-moz-"},{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"Comment","content":"-ms-"},{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],["    ",{"group":"StorageClass","content":"user-select"},": ",{"group":"Constant","content":"none"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Comment","content":"/* Typography */"}],[""],[{"group":"Statement","content":"html"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-size"},": ",{"group":"Number","content":"62.5"},{"group":"Number","content":"%"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Statement","content":"body"},{"group":"Special","content":","}," ",{"group":"Statement","content":"input"},{"group":"Special","content":","}," ",{"group":"Statement","content":"button"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-family"},": ",{"group":"String","content":"'Source Sans Pro'"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Statement","content":"pre"},{"group":"Special","content":","}," ",{"group":"Statement","content":"textarea"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-family"},": ",{"group":"String","content":"'Source Code Pro'"},";"],[{"group":"cssBraces","content":"}"}],[""],[{"group":"Statement","content":"body"},{"group":"Special","content":","}," ",{"group":"Statement","content":"h1"},{"group":"Special","content":","}," ",{"group":"Statement","content":"h2"},{"group":"Special","content":","}," ",{"group":"Statement","content":"button"},{"group":"Special","content":","}," ",{"group":"Statement","content":"input"}," ",{"group":"cssBraces","content":"{"}],["    ",{"group":"StorageClass","content":"font-weight"},": ",{"group":"Number","content":"300"},";"],[{"group":"cssBraces","content":"}"}],[""]]
    },
    javascript: {
        title: 'JavaScript',
        parsedSource: [[{"group":"StorageClass","content":"var"}," React ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'react'"},");"],[{"group":"StorageClass","content":"var"}," _ ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'lodash'"},");"],[""],[{"group":"StorageClass","content":"var"}," Header ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./header'"},");"],[{"group":"StorageClass","content":"var"}," Left ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./left'"},");"],[{"group":"StorageClass","content":"var"}," Right ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./right'"},");"],[{"group":"StorageClass","content":"var"}," Footer ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./footer'"},");"],[{"group":"StorageClass","content":"var"}," Export ",{"group":"Operator","content":"="}," require(",{"group":"String","content":"'./export'"},");"],[""],[{"group":"StorageClass","content":"var"}," App ",{"group":"Operator","content":"="}," React.createClass({"],["    getInitialState() {"],["        ",{"group":"StorageClass","content":"var"}," {initialState} ",{"group":"Operator","content":"="}," ",{"group":"Special","content":"this"},".props;"],[""],["        ",{"group":"Conditional","content":"if"}," (localStorage.getItem(",{"group":"String","content":"'state'"},") ",{"group":"Operator","content":"!=="}," ",{"group":"Type","content":"null"},") {"],["            ",{"group":"Statement","content":"return"}," ",{"group":"Special","content":"JSON"},".parse(localStorage.getItem(",{"group":"String","content":"'state'"},"));"],["        } ",{"group":"Conditional","content":"else"}," {"],["            ",{"group":"Statement","content":"return"}," _.cloneDeep(initialState);"],["        }"],["    },"],[""]]
    },
    python: {
        title: 'Python',
        parsedSource: undefined
    },
    ruby: {
        title: 'Ruby',
        parsedSource: undefined
    },
    go: {
        title: 'Go',
        parsedSource: undefined
    },
    rust: {
        title: 'Rust',
        parsedSource: undefined
    },
    haskell: {
        title: 'Haskell',
        parsedSource: undefined
    },
    markdown: {
        title: 'Markdown',
        parsedSource: undefined
    }
}

module.exports = files;
