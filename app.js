require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;
var model = require('./model');

var Header = React.createClass({
    render() {
        var {header, h1} = React.DOM;
        return header(null, h1(null, 'vim-colorscheme-designer'));
    }
});

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
        var {source} = this.props.model;
        return pre({dangerouslySetInnerHTML: {__html: this.props.model.source}});
    }
});

var Root = React.createClass({
    render() {
        var {div} = React.DOM;
        var {model} = this.state;
        var {parse} = this;
        return div(
            null,
            Header(),
            Paste({model, parse}),
            Source({model}));
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

        this.setState({model: {source: output}});
    },
    getInitialState() {
        return this.props;
    }
});

React.renderComponent(Root({model}), document.body);
