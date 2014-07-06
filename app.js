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
        var {segment, getColorPair} = this.props;
        if (typeof(segment) === 'object') {
            var style = getColorPair(segment.group);
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
        var {onClick} = this;
        var {line, lineCount} = this.props.lineNumber;
        var {getColorPair} = this.props;
        var spaces = 1 + (lineCount.toString().length - line.toString().length)
        var style = getColorPair('LineNr');
        return span({style, onClick}, ' '.repeat(spaces) + line + ' ');
    },
    onClick() {
        this.props.selectGroup('LineNr');
        e.stopPropagation();
    }
});

var Line = React.createClass({
    render() {
        var {span} = React.DOM;
        var {getColorPair, line, lineNumber, selectGroup} = this.props;
        var lineNumber_ = [LineNumber({lineNumber, getColorPair, selectGroup})]
        var segments = line.map(segment => Segment({segment, getColorPair, selectGroup}));
        return span(null,
            lineNumber_.concat(segments.concat(span(null, '\n'))));
    }
});

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick} = this;
        var {parsedSource, getColorPair, selectGroup} = this.props;
        var className = parsedSource === undefined ? 'hidden' : '';
        var style = getColorPair('Normal');
        var content;

        if (parsedSource !== undefined) {
            content = parsedSource.map(
                (line, index) => Line({
                    getColorPair,
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
        var {onChangeColor, onChangeBackgroundColor} = this;

        var colorPair = this.props.getColorPair(this.props.selectedGroup);

        return aside(null,
            'Color of group ' + this.props.selectedGroup,
            div(null,
                input({type: 'color', value: colorPair.color, onChange: onChangeColor}),
                ' Foreground'),
            div(null,
                input({type: 'color', value: colorPair.backgroundColor, onChange: onChangeBackgroundColor}),
                ' Background'));
    },
    onChangeColor(e) {
        this.props.setColor('foreground', e.target.value);
    },
    onChangeBackgroundColor(e) {
        this.props.setColor('background', e.target.value);
    }
});

var Export = React.createClass({
    render() {
        var {textarea} = React.DOM;

        return textarea({value: 'foobar'});
    }
});

var Root = React.createClass({
    getInitialState() {
        return this.props.data;
    },
    render() {
        var {main} = React.DOM;
        var {parsedSource, selectedGroup} = this.state;
        var {getColorPair} = this.props;
        var {parse, selectGroup, setColor} = this;
        return main(
            null,
            Header(),
            Paste({
                parsedSource,
                parse}),
            Source({
                parsedSource,
                getColorPair,
                selectGroup}),
            Controls({
                selectedGroup,
                getColorPair,
                setColor}),
            Export());
    },
    parse(unparsedSource) {
        this.setState({parsedSource: parse(unparsedSource)});
    },
    selectGroup(selectedGroup) {
        this.setState({selectedGroup});
    },
    setColor(what, color) {
        var {selectedGroup} = this.state;

        switch (what) {
            case 'foreground':
                var {colors} = this.state;
                colors[selectedGroup] = color;
                this.setState({colors});
                break;
            case 'background':
                var {backgroundColors} = this.state;
                backgroundColors[selectedGroup] = color;
                this.setState({backgroundColors});
                break;
        }
    }
});

React.renderComponent(Root(model), document.body);
