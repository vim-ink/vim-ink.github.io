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
        var className = (this.props.parsedSource !== undefined) ? 'hidden' : '';
        return textarea({onChange, className});
    },
    onChange(e) {
        this.props.parse(e.target.value);
    }
});

var Segment = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick} = this;
        var {segment, colors} = this.props;
        if (typeof(segment) === 'object') {
            var style = (segment.group in colors ? {color: colors[segment.group]} : {});
            return span({style, onClick}, segment.content);
        } else {
            return span(null, segment);
        }
    },
    onClick() {
        this.props.selectGroup(this.props.segment.group);
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
        var {colors, line, lineNumber, selectGroup} = this.props;
        var segments = line.map(segment => Segment({segment, colors, selectGroup}));
        return span(null,
            [LineNumber(lineNumber)].concat(
                segments.concat(
                    span(null, '\n'))));
    }
});

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {parsedSource, colors, selectGroup} = this.props;
        var className = parsedSource === undefined ? 'hidden' : '';
        var content;

        if (parsedSource !== undefined) {
            content = parsedSource.map(
                (line, index) => Line({
                    colors,
                    line,
                    lineNumber: {
                        line: index,
                        lineCount: parsedSource.length},
                    selectGroup}))
        }

        return pre({className}, content);
    }
});

var Controls = React.createClass({
    render() {
        var {aside, div, input} = React.DOM;
        var {onChange} = this;

        return aside(null,
            'Selected: ' + this.props.selectedGroup,
            div(null,
                input({type: 'color', onChange}),
                ' Foreground'),
            div(null,
                input({type: 'color'}),
                ' Background'));
    },
    onChange(e) {
        this.props.setForegroundColor(e.target.value);
    }
});

var Root = React.createClass({
    getInitialState() {
        return this.props;
    },
    render() {
        var {main} = React.DOM;
        var {parsedSource, colors, selectedGroup} = this.state;
        var {parse, selectGroup, setForegroundColor} = this;
        return main(
            null,
            Header(),
            Paste({parsedSource, parse}),
            Source({parsedSource, colors, selectGroup}),
            Controls({selectedGroup, setForegroundColor}));
    },
    parse(unparsedSource) {
        this.setState({parsedSource: parse(unparsedSource)});
    },
    selectGroup(selectedGroup) {
        this.setState({selectedGroup});
    },
    setForegroundColor(color) {
        var colors = this.state.colors;
        colors[this.state.selectedGroup] = color;
        this.setState({colors});
    }
});

React.renderComponent(Root(model), document.body);
