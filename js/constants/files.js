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
            [c(fill('', 22, ' ')), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'fun' + spaces(18)), gc('PmenuThumb', ' ')],
            [c(fill('', 22, ' ')), gc('VertSplit', '│'), c('  '), gc('Pmenu', 'function' + spaces(13)), gc('PmenuSbar', ' ')],
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
    intro: {
        parsedSource: [[{"group":"Title","content":"# vim.ink"}],[{"content":""}],[{"content":"A color scheme designer for vim"}],[{"content":""}],[{"group":"Title","content":"## Getting started"}],[{"content":""}],[{"content":"1.  Pick a language above"}],[{"content":"2.  Click some part of this area to select a group"}],[{"content":"3.  Use the controls to the right to modify"}]]
    },
    about: {
        parsedSource: [[{"group":"Title","content":"# About"}],[{"content":""}],[{"content":"vim.ink is a vim color scheme designer. A vim color scheme comes with a light"}],[{"content":"and dark variant making it suitable for different lightning conditions. vim.ink"}],[{"content":"includes a default set of grayscale tones designed to be used on its own, or as"}],[{"content":"a base for new color schemes."}],[{"content":""}],[{"group":"Title","content":"## Default color scheme"}],[{"content":""}],[{"content":"The default color scheme has been carefully designed to look balanced among"}],[{"content":"highlight groups, and between light and dark variants. It can be complemented"}],[{"content":"with system-wide adjustments such as using the brightness control of the"}],[{"content":"display, or software such as F.lux or Redshift to adapt the colors to the time"}],[{"content":"of day."}],[{"content":""}],[{"group":"Title","content":"## Setting groups to transparent, or resetting groups to default"}],[{"content":""}],[{"content":"Shift-clicking an individual color makes it transparent. Alt-clicking resets an"}],[{"content":"individual color to its default value. Alt-clicking resets an individual post"}],[{"content":"process slider to zero."}],[{"content":""}],[{"group":"Title","content":"# ~/.vimrc"}],[{"content":""}],[{"group":"Title","content":"## Load color scheme"}],[{"content":""}],[{"group":"String","content":"    colorscheme my-default"}],[{"content":""}],[{"group":"String","content":"    set background=light"}],[{"content":""}],[{"group":"Title","content":"## Automatically reload color scheme on write"}],[{"content":""}],[{"group":"String","content":"    autocmd! BufWritePost my-default.vim source %"}],[{"content":""}],[{"group":"Title","content":"## Make vertical split line continuous"}],[{"content":""}],[{"group":"String","content":"    set fillchars=vert:\\│"}],[{"content":""}],[{"group":"Title","content":"# Implementation"}],[{"content":""}],[{"content":"vim.ink is built with React and HTML5 technologies. Local storage is used for"}],[{"content":"persisting the application state. Libraries are used sparingly, and the UI"}],[{"content":"components are implemented using plain CSS with a little help of Sass."}],[{"content":""}],[{"group":"Title","content":"# Limitations"}],[{"content":""}],[{"content":"This section mentions the limitations that are by design. Check GitHub Issues"}],[{"content":"for an updated list of bugs and enhancements."}],[{"content":""}],[{"group":"Title","content":"## Included source code use generic groups"}],[{"content":""}],[{"content":"The highlight groups of the included source are extracted from the generated"}],[{"content":"HTML of vims built-in command "},{"group":"String","content":"`:TOhtml`"},{"content":".  From my experience, generic group"}],[{"content":"names such as "},{"group":"String","content":"`Statement`"},{"content":" or "},{"group":"String","content":"`Conditional`"},{"content":" are exported instead of specific"}],[{"content":"group names such as "},{"group":"String","content":"`sassVariable`"},{"content":" or "},{"group":"String","content":"`sassVariableAssignment`"},{"content":". Because specific"}],[{"content":"groups are often linked to generic groups, most source code should look"}],[{"content":"acceptable with only the generic groups set. For this reason, the included"}],[{"content":"source code will continue to use generic groups. If you need to style specific"}],[{"content":"groups and find a way to export them, then I suggest you to use the paste"}],[{"content":"functionality."}],[{"content":""}],[{"group":"Title","content":"## Only supports vim"}],[{"content":""}],[{"content":"vim.ink has been built with vim in mind, and will not support other editors. I’m"}],[{"content":"totally for having an almost identical color scheme designer for another editor,"}],[{"content":"and would encourage someone interested to fork the project and modify it. This"}],[{"content":"is a forward-looking project, and will of course support NeoVim."}],[{"content":""}],[{"group":"Title","content":"# Contribute"}],[{"content":""}],[{"content":"vim.ink is developed and designed by Alexander Teinum. Contact me through"}],[{"content":"GitHub, Twitter, or email if you are interested in contributing. My email"}],[{"content":"address is ateinum@gmail.com."}]]
    },
    html: {
        parsedSource: [[{"group":"Comment","content":"<!DOCTYPE html>"}],[{"content":"<"},{"group":"Statement","content":"html"},{"content":" "},{"group":"Type","content":"lang"},{"content":"="},{"group":"String","content":"\"en\""},{"content":">"}],[{"content":"    <"},{"group":"Statement","content":"head"},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"meta"},{"content":" "},{"group":"Type","content":"charset"},{"content":"="},{"group":"String","content":"\"utf-8\""},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"title"},{"content":">"},{"group":"Title","content":"vim.ink"},{"content":"</"},{"group":"Statement","content":"title"},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"link"},{"content":" "},{"group":"Type","content":"rel"},{"content":"="},{"group":"String","content":"\"stylesheet\""},{"content":" "},{"group":"Type","content":"href"},{"content":"="},{"group":"String","content":"\"app.css\""},{"content":">"}],[{"content":"    </"},{"group":"Statement","content":"head"},{"content":">"}],[{"content":"    <"},{"group":"Statement","content":"body"},{"content":">"}],[{"content":"        <"},{"group":"Statement","content":"script"},{"content":" "},{"group":"Type","content":"src"},{"content":"="},{"group":"String","content":"\"app.js\""},{"content":"></"},{"group":"Statement","content":"script"},{"content":">"}],[{"content":"    </"},{"group":"Statement","content":"body"},{"content":">"}],[{"content":"</"},{"group":"Statement","content":"html"},{"content":">"}]]
    },
    css: {
        parsedSource: [[{"group":"Statement","content":"html"},{"content":" {"}],[{"content":"    "},{"group":"StorageClass","content":"font-size"},{"content":": "},{"group":"Number","content":"62.5"},{"group":"Number","content":"%"},{"content":";"}],[{"content":"}"}],[{"content":""}],[{"group":"Statement","content":"body"},{"content":" {"}],[{"content":"    "},{"group":"StorageClass","content":"font-size"},{"content":": "},{"group":"Number","content":"1.5"},{"group":"Number","content":"em"},{"content":"; "},{"group":"Comment","content":"/* Use em instead of rem because of Chrome bug */"}],[{"content":"}"}],[{"content":""}],[{"group":"Statement","content":"body"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"button"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"h1"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"h2"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"input"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"textarea"},{"content":" {"}],[{"content":"    "},{"group":"StorageClass","content":"font-weight"},{"content":": "},{"group":"Number","content":"300"},{"content":";"}],[{"content":"}"}],[{"content":""}],[{"group":"Statement","content":"body"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"button"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"input"},{"content":" {"}],[{"content":"    "},{"group":"StorageClass","content":"font-family"},{"content":": "},{"group":"String","content":"'Source Sans Pro'"},{"content":";"}],[{"content":"}"}],[{"content":""}],[{"group":"Statement","content":"pre"},{"group":"Special","content":","},{"content":" "},{"group":"Statement","content":"textarea"},{"content":" {"}],[{"content":"    "},{"group":"StorageClass","content":"font-family"},{"content":": "},{"group":"String","content":"'Source Code Pro'"},{"content":";"}],[{"content":"}"}]]
    },
    javascript: {
        parsedSource: [[{"group":"StorageClass","content":"var"},{"content":" React "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'react'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" {transitionFast} "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'../actions/transition'"},{"content":");"}],[{"group":"StorageClass","content":"var"},{"content":" {merge} "},{"group":"Statement","content":"="},{"content":" require("},{"group":"String","content":"'../actions/utils'"},{"content":");"}],[{"content":""}],[{"group":"StorageClass","content":"var"},{"content":" Right "},{"group":"Statement","content":"="},{"content":" React.createClass({"}],[{"content":"    render() {"}],[{"content":"        "},{"group":"StorageClass","content":"var"},{"content":" children;"}],[{"content":""}],[{"content":"        "},{"group":"Conditional","content":"if"},{"content":" ("},{"group":"Special","content":"this"},{"content":".props.activePane "},{"group":"Statement","content":"!=="},{"content":" "},{"group":"String","content":"'global'"},{"content":") {"}],[{"content":"            children "},{"group":"Statement","content":"="},{"content":" ["}],[{"content":"                SelectedGroup(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"0"},{"content":", firstSection: "},{"group":"Boolean","content":"true"},{"content":"})),"}],[{"content":"                Colors(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"1"},{"content":"})),"}],[{"content":"                Highlight(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"2"},{"content":"})),"}],[{"content":"                PostProcess(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"3"},{"content":"})),"}],[{"content":"                ModifiedGroups(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"4"},{"content":"}))];"}],[{"content":"        } "},{"group":"Conditional","content":"else"},{"content":" {"}],[{"content":"            children "},{"group":"Statement","content":"="},{"content":" ["}],[{"content":"                Export(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"0"},{"content":", firstSection: "},{"group":"Boolean","content":"true"},{"content":"})),"}],[{"content":"                Components(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"1"},{"content":"})),"}],[{"content":"                DangerZone(merge("},{"group":"Special","content":"this"},{"content":".props, {key: "},{"group":"Number","content":"2"},{"content":"}))];"}],[{"content":"        }"}],[{"content":""}],[{"content":"        "},{"group":"Statement","content":"return"},{"content":" React.DOM.aside({key: "},{"group":"String","content":"'aside'"},{"content":", children});"}],[{"content":"    }"}],[{"content":"});"}]]
    },
    c: {
        parsedSource: [[{"content":"#include "},{"group":"String","content":"<linux/init.h>"}],[{"content":"#include "},{"group":"String","content":"<linux/stat.h>"}],[{"content":"#include "},{"group":"String","content":"<linux/kdev_t.h>"}],[{"content":"#include "},{"group":"String","content":"<linux/syscalls.h>"}],[{"content":""}],[{"group":"Comment","content":"/*"}],[{"group":"Comment","content":" * Create a simple rootfs that is similar to the default initramfs"}],[{"group":"Comment","content":" "},{"group":"Comment","content":"*/"}],[{"group":"StorageClass","content":"static"},{"content":" "},{"group":"Type","content":"int"},{"content":" __init default_rootfs("},{"group":"Type","content":"void"},{"content":")"}],[{"content":"{"}],[{"content":"        "},{"group":"Type","content":"int"},{"content":" err;"}],[{"content":""}],[{"content":"        err = sys_mkdir(("},{"group":"StorageClass","content":"const"},{"content":" "},{"group":"Type","content":"char"},{"content":" __user __force *) "},{"group":"String","content":"\"/dev\""},{"content":", 0"},{"group":"Number","content":"755"},{"content":");"}],[{"content":"        "},{"group":"Conditional","content":"if"},{"content":" (err < "},{"group":"Number","content":"0"},{"content":")"}],[{"content":"                "},{"group":"Statement","content":"goto"},{"content":" out;"}],[{"content":""}],[{"content":"        err = sys_mknod(("},{"group":"StorageClass","content":"const"},{"content":" "},{"group":"Type","content":"char"},{"content":" __user __force *) "},{"group":"String","content":"\"/dev/console\""},{"content":","}],[{"content":"                        S_IFCHR | S_IRUSR | S_IWUSR,"}],[{"content":"                        new_encode_dev(MKDEV("},{"group":"Number","content":"5"},{"content":", "},{"group":"Number","content":"1"},{"content":")));"}],[{"content":"        "},{"group":"Conditional","content":"if"},{"content":" (err < "},{"group":"Number","content":"0"},{"content":")"}],[{"content":"                "},{"group":"Statement","content":"goto"},{"content":" out;"}],[{"content":""}],[{"content":"        err = sys_mkdir(("},{"group":"StorageClass","content":"const"},{"content":" "},{"group":"Type","content":"char"},{"content":" __user __force *) "},{"group":"String","content":"\"/root\""},{"content":", 0"},{"group":"Number","content":"700"},{"content":");"}],[{"content":"        "},{"group":"Conditional","content":"if"},{"content":" (err < "},{"group":"Number","content":"0"},{"content":")"}],[{"content":"                "},{"group":"Statement","content":"goto"},{"content":" out;"}],[{"content":""}],[{"content":"        "},{"group":"Statement","content":"return"},{"content":" "},{"group":"Number","content":"0"},{"content":";"}],[{"content":""}],[{"group":"Statement","content":"out"},{"content":":"}],[{"content":"        printk(KERN_WARNING "},{"group":"String","content":"\"Failed to create a rootfs"},{"group":"Special","content":"\\n"},{"group":"String","content":"\""},{"content":");"}],[{"content":"        "},{"group":"Statement","content":"return"},{"content":" err;"}],[{"content":"}"}],[{"content":"rootfs_initcall(default_rootfs);"}]]
    },
    java: {
        parsedSource: [[{"content":"package org.stagemonitor.core.metrics;"}],[{"content":""}],[{"content":"import com.codahale.metrics.Metric;"}],[{"content":"import com.codahale.metrics.MetricFilter;"}],[{"content":""}],[{"content":"import java.util.List;"}],[{"content":"import java.util.regex.Pattern;"}],[{"content":""}],[{"group":"StorageClass","content":"public"},{"content":" "},{"group":"StorageClass","content":"class"},{"content":" RegexMetricFilter "},{"group":"StorageClass","content":"implements"},{"content":" MetricFilter {"}],[{"content":""}],[{"content":"        "},{"group":"StorageClass","content":"private"},{"content":" "},{"group":"StorageClass","content":"final"},{"content":" List<Pattern> patterns;"}],[{"content":""}],[{"content":"        "},{"group":"StorageClass","content":"public"},{"content":" RegexMetricFilter(List<Pattern> patterns) {"}],[{"content":"                "},{"group":"Type","content":"this"},{"content":".patterns = patterns;"}],[{"content":"        }"}],[{"content":""}],[{"content":"        @Override"}],[{"content":"        "},{"group":"StorageClass","content":"public"},{"content":" "},{"group":"Type","content":"boolean"},{"content":" matches(String name, Metric metric) {"}],[{"content":"                "},{"group":"Statement","content":"for"},{"content":" ("},{"group":"StorageClass","content":"final"},{"content":" Pattern pattern : patterns) {"}],[{"content":"                        "},{"group":"Conditional","content":"if"},{"content":" (pattern.matcher(name).matches()) {"}],[{"content":"                                "},{"group":"Statement","content":"return"},{"content":" "},{"group":"Boolean","content":"true"},{"content":";"}],[{"content":"                        }"}],[{"content":"                }"}],[{"content":"                "},{"group":"Statement","content":"return"},{"content":" "},{"group":"Boolean","content":"false"},{"content":";"}],[{"content":"        }"}],[{"content":"}"}]]
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
