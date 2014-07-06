require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;
var model = require('./model');

var Paste = React.createClass({
    render() {
        var {textarea} = React.DOM;
        var {onChange, onClick} = this;
        var className = (this.props.model.source !== undefined) ? 'hidden' : '';
        return textarea({onChange, className});
    },
    onChange(e) {
        this.props.parse(e.target.value);
    }
});

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        return pre({id: 'output'});
    }
});

var Root = React.createClass({
    render() {
        var {parse} = this;
        var model = this.props;
        var {div, header, h1, textarea, button} = React.DOM;
        return div(
            null,
            header(null, h1(null, 'vim-colorscheme-designer')),
            Paste({model, parse}),
            Source());
    },
    parse(input) {
        var parsedLines = parse(input);

        var output = parsedLines.map(function(line) {
            return line.map(function(segment) {
                return typeof(segment) === 'object' ?
                    '<span class="' + segment.group + '">' + segment.content + '</span>' :
                    segment;
            }).join('') + '\n';
        }).join('');

        document.getElementById('output').innerHTML = output;
    },
    componentDidMount() {
        console.log(this.props.model);
    }
});

React.renderComponent(Root({model}), document.body);
