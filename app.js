require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;
var model = require('./model');

var Header = React.createClass({
    render() {
        var {header, h1} = React.DOM;
        return header(null, h1(null, 'vim color scheme designer'));
    }
});

var Paste = React.createClass({
    render() {
        var {textarea} = React.DOM;
        var {onChange, onClick} = this;
        var className = (this.props.parsedSource !== undefined) ? 'hidden' : '';
        return textarea({onChange, className, placeholder: 'Paste output of `:TOhtml` here.'});
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
    onClick(e) {
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

var TabLineFile = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, group} = this;
        var {getColorPair, fileName, selected} = this.props;
        var style = getColorPair(group());
        return span({style, onClick}, ' 2 ' + fileName + ' ');
    },
    onClick(e) {
        var {selectGroup} = this.props;
        var {group} = this;
        selectGroup(group());
        e.stopPropagation();
    },
    group() {
        var {selected} = this.props;
        return (selected === true ? 'TabLineSel' : 'TabLine');
    }
});

var TabLine = React.createClass({
    render() {
        var {span} = React.DOM;
        var {getColorPair, selectGroup} = this.props;

        return span(
            null,
            [
                TabLineFile({
                    getColorPair,
                    selectGroup,
                    fileName: 'one-file.js',
                    selected: false}),
                TabLineFile({
                    getColorPair,
                    selectGroup,
                    fileName: 'another-file.js',
                    selected: false}),
                TabLineFile({
                    getColorPair,
                    selectGroup,
                    fileName: 'yet-another-file.js',
                    selected: true}),
                '\n'
            ]);
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
        var tabLine = TabLine({getColorPair, selectGroup});

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

        return pre({className, style, onClick}, [tabLine].concat(content));
    },
    onClick() {
        this.props.selectGroup('Normal');
    }
});

var Controls = React.createClass({
    render() {
        var {aside, h2, p, div, input, button} = React.DOM;
        var {onChangeColor, onChangeBackgroundColor, onClick} = this;

        var colorPair = this.props.getColorPair(this.props.selectedGroup);

        return aside(null,
            h2(null, 'Variant'),
            button({onClick: onClick, className: 'lightbulb light-button'}, 'Light'),
            button({onClick: onClick, className: 'lightbulb dark-button'}, 'Dark'),
            h2(null, 'Selected group'),
            p(null, this.props.selectedGroup),
            h2(null, 'Color'),
            div(null,
                input({type: 'color', value: colorPair.color, onChange: onChangeColor}),
                ' Foreground'),
            div(null,
                input({type: 'color', value: colorPair.backgroundColor, onChange: onChangeBackgroundColor}),
                ' Background'),
            h2(null, 'Show'));
    },
    onChangeColor(e) {
        this.props.setColor('color', e.target.value);
    },
    onChangeBackgroundColor(e) {
        this.props.setColor('backgroundColor', e.target.value);
    },
    onClick(e) {
        var body = document.getElementsByTagName('body')[0];
        body.className = body.className === 'light' ? 'dark' : 'light';
    },
});

var Export = React.createClass({
    render() {
        var {textarea} = React.DOM;

        return textarea({value: this.props.exportColorscheme()});
    }
});

var Root = React.createClass({
    getInitialState() {
        return this.props.data;
    },
    render() {
        var {main} = React.DOM;
        var {parsedSource, selectedGroup} = this.state;
        var {getColorPair, exportColorscheme} = this.props;
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
                setColor}));
            // Export({exportColorscheme}));
    },
    parse(unparsedSource) {
        this.setState({parsedSource: parse(unparsedSource)});
    },
    selectGroup(selectedGroup) {
        this.setState({selectedGroup});
    },
    setColor(what, color) { // TODO: How about setSelectedGroup(object)?
        var {dark, selectedGroup} = this.state;

        if (!(selectedGroup in dark))
            dark[selectedGroup] = {};

        var group = dark[selectedGroup];
        group[what] = color;
        this.setState({dark});
    }
});

React.renderComponent(Root(model), document.body);
