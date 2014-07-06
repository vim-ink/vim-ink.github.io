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
        var className = (this.props.model.parsedSource !== undefined) ? 'hidden' : '';
        return textarea({onChange, className});
    },
    onChange(e) {
        this.props.parse(e.target.value);
    }
});

var Segment = React.createClass({
    render() {
        var {span} = React.DOM;
        var {segment} = this.props;
        return (typeof(segment) === 'object' ?
            span({className: segment.group}, segment.content) :
            span(null, segment));
    }
});

var LineNumber = React.createClass({
    render() {
        var {span} = React.DOM;
        var {line, lineCount} = this.props;
        var spaces = 1 + (lineCount.toString().length - line.toString().length)
        return span({className: 'LineNr'}, ' '.repeat(spaces) + line + ' ');
    }
});

var Line = React.createClass({
    render() {
        var {span} = React.DOM;
        var {line, lineNumber} = this.props;
        var segments = line.map(segment => Segment({segment}));
        return span(null,
            [LineNumber(lineNumber)].concat(
                segments.concat(
                    span(null, '\n'))));
    }
});

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {parsedSource} = this.props.model;
        var className = parsedSource === undefined ? 'hidden' : '';
        var content;

        if (parsedSource !== undefined) {
            content = parsedSource.map(
                (line, index) => Line({
                line,
                lineNumber: {
                    line: index,
                    lineCount: parsedSource.length}}))
        }

        return pre({className}, content);
    }
});

var Root = React.createClass({
    getInitialState() {
        return this.props;
    },
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
    parse(unparsedSource) {
        this.setState({model: {parsedSource: parse(unparsedSource)}});
    }
});

React.renderComponent(Root({model}), document.body);
