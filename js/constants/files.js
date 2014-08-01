var {spaces, fill} = require('../actions/utils');

var gc = (group, content) => { return {group, content}; };
var c = (content) => gc(undefined, content);
var s = (sign = '  ') => gc('SignColumn', sign);
var l = (line, group = 'LineNr') => gc(group, line);

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
            [c(fill('one line', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('another line', 22, ' ')), gc('VertSplit', '│'), c('  f')],
            [c(fill('a third line', 22, ' ')), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'foo' + spaces(18)), gc('PmenuSbar', ' ')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│'), c('  '), gc('PmenuSel', 'foobar' + spaces(15)), gc('PmenuSbar', ' ')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'function' + spaces(13)), gc('PmenuThumb', ' ')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'fun' + spaces(18)), gc('PmenuSbar', ' ')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│')],
            [gc('StatusLineNC', fill('inactive status', 23, ' ')), gc('StatusLine', fill('active status', 71, ' '))],
            [gc('WarningMsg', 'W10: Warning: Changing a readonly file')],
            [gc('ErrorMsg', 'E37: No write since last change (add ! to override)')],
            [gc('ModeMsg', '-- INSERT --')],
            [gc('MoreMsg', '-- More --')],
            [],
            [c(fill('one-file', 22, ' ') + fill('another-file', 22, ' ') + fill('a-third-file', 22, ' '))],
            [gc('Directory', 'one-directory'), c(fill('/', 9, ' ')), gc('Directory', 'another-directory'), c(fill('/', 5, ' '))],
            [gc('StatusLine', 'one-file  another-file  '), gc('WildMenu', 'a-third-file'), gc('StatusLine', spaces(58))],
        ]
    },
    about: {
        parsedSource: [[{"group":"Title","content":"# About"}],[{"content":""}],[{"content":"vim.ink is a vim color scheme designer. A vim color scheme comes with a light"}],[{"content":"and dark variant, making it suitable for different lightning conditions. vim.ink"}],[{"content":"includes a default set of grayscale tones designed to be used on its own or as a"}],[{"content":"base for new color schemes."}],[{"content":""}],[{"group":"Title","content":"## Default color scheme"}],[{"content":""}],[{"content":"The default color scheme has been carefully designed to look balanced among"}],[{"content":"highlight groups, and between light and dark variants. It can be complemented"}],[{"content":"with system-wide adjustments such as using the brightness control of the display"}],[{"content":"and software such as F.lux or Redshift to adapt the colors to the time of day."}],[{"content":""}],[{"group":"Title","content":"## Setting groups to transparent, or resetting groups to default"}],[{"content":""}],[{"content":"Shift-clicking an individual color makes it transparent. Alt-clicking resets an"}],[{"content":"individual color to its default value. Alt-clicking resets an individual post"}],[{"content":"process slider to zero."}],[{"content":""}],[{"group":"Title","content":"# ~/.vimrc"}],[{"content":""}],[{"group":"Title","content":"## Load color scheme"}],[{"content":""}],[{"group":"String","content":"    colorscheme my-default"}],[{"content":""}],[{"group":"String","content":"    set background=light"}],[{"content":""}],[{"group":"Title","content":"## Automatically reload color scheme on write"}],[{"content":""}],[{"group":"String","content":"    autocmd! BufWritePost my-default.vim source %"}],[{"content":""}],[{"group":"Title","content":"## Make vertical split line continuous"}],[{"content":""}],[{"group":"String","content":"    set fillchars=vert:\\│"}],[{"content":""}],[{"group":"Title","content":"# Implementation"}],[{"content":""}],[{"content":"vim.ink is built with React and HTML5 technologies. Local storage is used for"}],[{"content":"persisting the application state. Libraries are used sparingly and the UI"}],[{"content":"components are implemented using plain CSS with a little help of Sass."}],[{"content":""}],[{"group":"Title","content":"## Limitations"}],[{"content":""}],[{"group":"Title","content":"### 256 terminals not supported"}],[{"content":""}],[{"content":"Color schemes are currently exported with only the 24-bit colors set. The export"}],[{"content":"functionality should be extended to generate fallback colors. A solution for now"}],[{"content":"is to use CSApprox or similar plugin to automatically generate fallback colors."}],[{"content":"Support for 24-bit colors in terminals is on its way, but I’m not sure how far"}],[{"content":"it has come."}],[{"content":""}],[{"group":"Title","content":"### Not possible to style popular plugins"}],[{"content":""}],[{"content":"There is currently no included support popular plugins such as The NERD Tree or"}],[{"content":"vim-airline. I have not yet decided whether these should be included, but there"}],[{"content":"should be a way in the future to style them."}],[{"content":""}],[{"group":"Title","content":"### Included source code use generic groups"}],[{"content":""}],[{"content":"The highlight groups of the included source are extracted from the generated"}],[{"content":"HTML of vims built-in command "},{"group":"String","content":"`:TOhtml`"},{"content":".  From my experience, generic group"}],[{"content":"names such as "},{"group":"String","content":"`Statement`"},{"content":" or "},{"group":"String","content":"`Conditional`"},{"content":" are exported instead of specific"}],[{"content":"group names such as "},{"group":"String","content":"`sassVariable`"},{"content":" or "},{"group":"String","content":"`sassVariableAssignment`"},{"content":". Because specific"}],[{"content":"groups are often linked to generic groups, most source code should look"}],[{"content":"acceptable with only the generic groups set. For this reason, the included"}],[{"content":"source code will continue to use generic groups. If you need to style specific"}],[{"content":"groups and find a way to export them then I suggest you to use the paste"}],[{"content":"functionality."}],[{"content":""}],[{"group":"Title","content":"### Not feature complete"}],[{"content":""}],[{"content":"There are a few features of vim color schemes that are currently not supported."}],[{"content":"One of them is multiple highlight groups. Another is coloring of undercurl. The"}],[{"content":"highlight groups lCursor, VisualNOS, Ignore, Question, and SpecialKey are"}],[{"content":"currently not supported."}],[{"content":""}],[{"group":"Title","content":"### Only supports vim"}],[{"content":""}],[{"content":"vim.ink has been built with vim in mind, and will not support other editors. I’m"}],[{"content":"totally for having an almost identical color scheme designer for another editor,"}],[{"content":"and would encourage someone interested to fork the project and modify it. This"}],[{"content":"is a forward-looking project, and will of course support NeoVim."}],[{"content":""}],[{"group":"Title","content":"# Contribute"}],[{"content":""}],[{"content":"vim.ink is developed and designed by Alexander Teinum. Either contact me by"}],[{"content":"though GitHub, Twitter, or email if you are interested in contributing. My email"}],[{"content":"address is ateinum@gmail.com."}]]
    },
    html: {
        parsedSource: [[{"group":"Comment","content":"<!DOCTYPE html>"}],[{"content":"<"},{"group":"Statement","content":"html"},{"content":" "},{"group":"Type","content":"lang"},{"content":"="},{"group":"String","content":"\"en\""},{"content":">"}],[{"content":"    <"},{"group":"Statement","content":"head"},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"meta"},{"content":" "},{"group":"Type","content":"charset"},{"content":"="},{"group":"String","content":"\"utf-8\""},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"title"},{"content":">"},{"group":"Title","content":"vim.ink"},{"content":"</"},{"group":"Statement","content":"title"},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"link"},{"content":" "},{"group":"Type","content":"rel"},{"content":"="},{"group":"String","content":"\"stylesheet\""},{"content":" "},{"group":"Type","content":"href"},{"content":"="},{"group":"String","content":"\"app.css\""},{"content":">"}],[{"content":"    </"},{"group":"Statement","content":"head"},{"content":">"}],[{"content":"    <"},{"group":"Statement","content":"body"},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"script"},{"content":" "},{"group":"Type","content":"src"},{"content":"="},{"group":"String","content":"\"app.js\""},{"content":"></"},{"group":"Statement","content":"script"},{"content":">"}],[{"content":"    </"},{"group":"Statement","content":"body"},{"content":">"}],[{"content":"</"},{"group":"Statement","content":"html"},{"content":">"}],[{"content":""}]]
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
