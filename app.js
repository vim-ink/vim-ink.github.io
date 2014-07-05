require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;

function parsePastedCode() {
    var parsedLines = parse(document.getElementById('pastedCode').value);

    var output = parsedLines.map(function(line) {
        return line.map(function(segment) {
            return typeof(segment) === 'object' ?
                '<span class="' + segment.group + '">' + segment.content + '</span>' :
                segment;
        }).join('') + '\n';
    }).join('');

    document.getElementById('output').innerHTML = output;
}

var PastedCode = React.createClass({
    render() {
        var {div, textarea, button} = React.DOM;

        return div(null,
            textarea({
                id: 'pastedCode',
                style: {width: '100%', height: '20em'}}),
            button({onClick: this.parse}, 'Parse'));
    },
    parse() {
        parsePastedCode();
    }
})

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        return pre({id: 'output'});
    }
})

var Root = React.createClass({
    render() {
        var {div, header, h1, textarea, button} = React.DOM;
        return div(
            null,
            header(null, h1(null, 'vim-colorscheme-designer')),
            PastedCode(),
            Source());
    }
});

React.renderComponent(Root(), document.body);
