require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;
var model = require('./model');

var Header = React.createClass({
    render() {
        var {header, h1} = React.DOM;
        return header(null, h1(null, 'vim colorscheme designer'));
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
        var {segment, colors, backgroundColors} = this.props;
        if (typeof(segment) === 'object') {
            var style = {
                color: (segment.group in colors ? colors[segment.group] : colors['Normal']),
                backgroundColor: (segment.group in backgroundColors ? backgroundColors[segment.group] : backgroundColors['Normal'])};
            return span({style, onClick}, segment.content);
        } else {
            return span(null, segment);
        }
    },
    onClick(e) {
        this.props.selectGroup(this.props.segment.group);
        e.stopPropagation();
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
        var {colors, backgroundColors, line, lineNumber, selectGroup} = this.props;
        var segments = line.map(segment => Segment({segment, colors, backgroundColors, selectGroup}));
        return span(null,
            [LineNumber(lineNumber)].concat(
                segments.concat(
                    span(null, '\n'))));
    }
});

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick} = this;
        var {parsedSource, colors, backgroundColors, selectGroup} = this.props;
        var className = parsedSource === undefined ? 'hidden' : '';
        var style = {color: colors['Normal'], backgroundColor: backgroundColors['Normal']};
        var content;

        if (parsedSource !== undefined) {
            content = parsedSource.map(
                (line, index) => Line({
                    colors,
                    backgroundColors,
                    line,
                    lineNumber: {
                        line: index,
                        lineCount: parsedSource.length},
                    selectGroup}))
        }

        return pre({className, style, onClick}, content);
    },
    onClick() {
        this.props.selectGroup('Normal');
    }
});

var Controls = React.createClass({
    render() {
        var {aside, div, input} = React.DOM;
        var {onChangeForegroundColor, onChangeBackgroundColor} = this;

        var color = this.props.selectedGroup in this.props.colors ?
            this.props.colors[this.props.selectedGroup] :
            this.props.colors['Normal'];
        var backgroundColor = this.props.selectedGroup in this.props.backgroundColors ?
            this.props.backgroundColors[this.props.selectedGroup] :
            this.props.backgroundColors['Normal'];

        return aside(null,
            'Color of group ' + this.props.selectedGroup,
            div(null,
                input({type: 'color', value: color, onChange: onChangeForegroundColor}),
                ' Foreground'),
            div(null,
                input({type: 'color', value: backgroundColor, onChange: onChangeBackgroundColor}),
                ' Background'));
    },
    onChangeForegroundColor(e) {
        this.props.setForegroundColor(e.target.value);
    },
    onChangeBackgroundColor(e) {
        this.props.setBackgroundColor(e.target.value);
    }
});

var Root = React.createClass({
    getInitialState() {
        return this.props;
    },
    render() {
        var {main} = React.DOM;
        var {parsedSource, colors, backgroundColors, selectedGroup} = this.state;
        var {parse, selectGroup, setForegroundColor, setBackgroundColor} = this;
        return main(
            null,
            Header(),
            Paste({
                parsedSource,
                parse}),
            Source({
                parsedSource,
                colors,
                backgroundColors,
                selectGroup}),
            Controls({
                selectedGroup,
                colors,
                backgroundColors,
                setForegroundColor,
                setBackgroundColor}));
    },
    parse(unparsedSource) {
        this.setState({parsedSource: parse(unparsedSource)});
    },
    selectGroup(selectedGroup) {
        this.setState({selectedGroup});
    },
    setForegroundColor(color) {
        var {colors, selectedGroup} = this.state;
        colors[selectedGroup] = color;
        this.setState({colors});
    },
    setBackgroundColor(color) {
        var {backgroundColors, selectedGroup} = this.state;
        backgroundColors[selectedGroup] = color;
        this.setState({backgroundColors});
    }
});

React.renderComponent(Root(model), document.body);
