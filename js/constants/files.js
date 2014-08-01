var gc = (group, content) => { return {group, content}; };
var c = (content) => gc(undefined, content);
var s = (sign = '  ') => gc('SignColumn', sign);
var l = (line, group = 'LineNr') => gc(group, line);

var spaces = n => ' '.repeat(n);
var fill = (str, chr, totalWidth) => {
    return str + chr.repeat(totalWidth - str.length);
}

var files = {
    editor: {
        parsedSource: [
            [s(), l('  1 '), c(spaces(2)), gc('CursorColumn', ' ')],
            [s(), l('  2 '), c(spaces(2)), gc('CursorColumn', ' ')],
            [s(), l('  3 ', 'CursorLineNr'), gc('CursorLine', spaces(2)), gc('Cursor', 'T'), gc('CursorLine', 'he cursor' + spaces(76))],
            [s(), l('  4 '), c(spaces(84)), gc('ColorColumn', ' ')],
            [s(), l('  5 '), gc('Visual', 'These words'), c(' are selected' + spaces(60)), gc('ColorColumn', ' ')],
            [s(), l('  6 '), gc('Currently searching for '), gc('IncSearch', 'foo'), c(', already found '), gc('Search', 'bar')],
            [s(), l('  7 '), gc('Cursor', '('), c('matching parens'), gc('MatchParen', ')')],
            [s(), l('  8 '), c('foo(bar({baz, [qux'), gc('Error', '}))'), c(' '), gc('Comment', '// '), gc('Todo', 'TODO'), gc('Comment', ': Fix error')],
            [s(), l('  9 '), gc('Conceal', 'ƒ'), c(' is a conceal character for `function`')],
            [s(), l(' 10 ')],
            [s('--'), l(' 11 '), gc('DiffDelete', 'This line was deleted' + spaces(67))],
            [s(), l(' 12 '), gc('DiffText', 'These words'), gc('DiffChange', ' on this line was changed' + spaces(52))],
            [s('++'), l(' 13 '), gc('DiffAdd', 'This line was added' + spaces(69))],
            [s(), l(' 14 ')],
            [s(), l(' 15 '), c('A '), gc('SpellBad', 'mispelled'), c(' word')],
            [s(), l(' 16 '), gc('SpellCap', 'line'), c(' starting without capital letter')],
            [s(), l(' 17 '), c('For some reason '), gc('SpellLocal', 'okay'), c(' is a local word')],
            [s(), l(' 18 '), gc('SpellRare', 'vim'), c(' seems to be a rare word')],
            [],
            [gc('FoldColumn', '    '), gc('Title', '# Heading 1')],
            [gc('FoldColumn', '-   '), c('This is a paragraph')],
            [gc('FoldColumn', '|   ')],
            [gc('FoldColumn', '|   '), gc('Title', '## Heading 1.1')],
            [gc('FoldColumn', '|-  '), c('This is another paragraph')],
            [gc('FoldColumn', '||  ')],
            [gc('FoldColumn', '||  '), gc('Title', '### Heading 1.1.1')],
            [gc('FoldColumn', '||+ '), gc('Folded', '+----  2 lines: This is a folded paragraph')],
            [gc('FoldColumn', '||  '), gc('Title', '### Heading 1.1.2')],
            [gc('FoldColumn', '||+ '), gc('Folded', '+----  2 lines: This is another folded paragraph')],
        ]
    },
    ui: {
        parsedSource: [
            [c(fill('one line', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('another line', ' ', 22)), gc('VertSplit', '│'), c('  f')],
            [c(fill('a third line', ' ', 22)), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'foo' + spaces(18)), gc('PmenuSbar', ' ')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│'), c('  '), gc('PmenuSel', 'foobar' + spaces(15)), gc('PmenuSbar', ' ')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'function' + spaces(13)), gc('PmenuThumb', ' ')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'fun' + spaces(18)), gc('PmenuSbar', ' ')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [c(fill('', ' ', 22)), gc('VertSplit', '│')],
            [gc('StatusLineNC', fill('inactive status', ' ', 23)), gc('StatusLine', fill('active status', ' ', 71))],
            [gc('WarningMsg', 'W10: Warning: Changing a readonly file')],
            [gc('ErrorMsg', 'E37: No write since last change (add ! to override)')],
            [gc('ModeMsg', '-- INSERT --')],
            [gc('MoreMsg', '-- More --')],
            [],
            [c(fill('one-file', ' ', 22) + fill('another-file', ' ', 22) + fill('a-third-file', ' ', 22))],
            [gc('Directory', 'one-directory'), c(fill('/', ' ', 9)), gc('Directory', 'another-directory'), c(fill('/', ' ', 5))],
            [gc('StatusLine', 'one-file  another-file  '), gc('WildMenu', 'a-third-file'), gc('StatusLine', spaces(58))],
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
        parsedSource: [[{"group":"StorageClass","content":"var"},{"content":" _ "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'lodash'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" React "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'react/addons'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" Color "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'color'"},{"content":");"}],[{"content":""}],[{"group":"StorageClass","content":"var"},{"content":" initialState "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'../constants/initial-state'"},{"content":");"}],[{"content":""}],[{"group":"StorageClass","content":"var"},{"content":" parse "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'../actions/parser'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" exporter "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'../actions/exporter'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" {merge, getGroupStyle} "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'../actions/utils'"},{"content":");"}],[{"content":""}],[{"group":"StorageClass","content":"var"},{"content":" Header "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'./header'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" Left "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'./left'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" Right "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'./right'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" Footer "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'./footer'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" Export "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'./export'"},{"content":");"}],[{"content":""}],[{"group":"StorageClass","content":"var"},{"content":" transition "},{"group":"Statement","content":"="},{"content":" React.addons.CSSTransitionGroup;"}],[{"group":"StorageClass","content":"var"},{"content":" transitionFast "},{"group":"Statement","content":"="},{"content":" children "},{"group":"Type","content":"=>"},{"content":" transition({transitionName: "},{"group":"String","content":"'fast'"},{"content":", children});"}],[{"content":""}],[{"group":"StorageClass","content":"var"},{"content":" App "},{"group":"Statement","content":"="},{"content":" React.createClass({"}],[{"content":"    getInitialState() {"}],[{"content":"        "},{"group":"Conditional","content":"if"},{"content":" (localStorage.getItem("},{"group":"String","content":"'state'"},{"content":") "},{"group":"Statement","content":"!=="},{"content":" "},{"group":"Type","content":"null"},{"content":") {"}],[{"content":"            "},{"group":"Statement","content":"return"},{"content":" "},{"group":"Special","content":"JSON"},{"content":".parse(localStorage.getItem("},{"group":"String","content":"'state'"},{"content":"));"}],[{"content":"        } "},{"group":"Conditional","content":"else"},{"content":" {"}],[{"content":"            "},{"group":"Statement","content":"return"},{"content":" _.cloneDeep(initialState);"}],[{"content":"        }"}],[{"content":"    },"}],[{"content":""}]]
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
