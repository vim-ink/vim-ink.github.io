var s = n => ' '.repeat(n);
var g = (group, content) => {
    return {group, content};
};

var files = {
    vim: {
        title: 'Vim',
        parsedSource: [
            [s(2), g('CursorColumn', ' ')],
            [s(2), g('CursorColumn', ' ')],
            [g('CursorLine', s(2)), g('Cursor', 'T'), g('CursorLine', 'he cursor' + s(73))],
            [s(78), g('ColorColumn', ' ')],
            [g('Visual', 'These words'), ' are selected' + s(54), g('ColorColumn', ' ')],
            ['Currently searching for ', g('IncSearch', 'foo'), ', already found ', g('Search', 'bar'), g('ColorColumn', ' ')],
            [g('Cursor', '('), 'matching parens', g('MatchParen', ')')],
            [g('Conceal', 'ƒ'), ' is the conceal character for `function`'],
            [g('DiffDelete', 'This line was deleted' + s(62))],
            [g('DiffText', 'These words'), g('DiffChange', ' on this line was changed' + s(47))],
            [g('DiffAdd', 'This line was added' + s(64))],
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
