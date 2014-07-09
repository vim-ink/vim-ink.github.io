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
        var {segment, getGroupProps} = this.props;
        if (typeof(segment) === 'object') {
            var style = getGroupProps(segment.group);
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
        var {getGroupProps} = this.props;
        var spaces = 1 + (lineCount.toString().length - line.toString().length)
        var style = getGroupProps('LineNr');
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
        var {getGroupProps, line, lineNumber, selectGroup} = this.props;
        var lineNumber_ = [LineNumber({lineNumber, getGroupProps, selectGroup})]
        var segments = line.map(segment => Segment({segment, getGroupProps, selectGroup}));
        return span(null,
            lineNumber_.concat(segments.concat(span(null, '\n'))));
    }
});

var TabLineFile = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, group} = this;
        var {getGroupProps, fileName, selected} = this.props;
        var style = getGroupProps(group());
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
        var {getGroupProps, selectGroup} = this.props;

        return span(
            null,
            [
                TabLineFile({
                    getGroupProps,
                    selectGroup,
                    fileName: 'one-file.js',
                    selected: false}),
                TabLineFile({
                    getGroupProps,
                    selectGroup,
                    fileName: 'another-file.js',
                    selected: false}),
                TabLineFile({
                    getGroupProps,
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
        var {parsedSource, getGroupProps, selectGroup} = this.props;
        var className = parsedSource === undefined ? 'hidden' : '';
        var style = getGroupProps('Normal');

        var content;
        var tabLine = TabLine({getGroupProps, selectGroup});

        if (parsedSource !== undefined) {
            content = parsedSource.map(
                (line, index) => Line({
                    getGroupProps,
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
        var {onChangeColor, onChangeBackgroundColor, onLightClick, onDarkClick} = this;

        var colorPair = this.props.getGroupProps(this.props.selectedGroup);

        return aside(null,
            h2(null, 'Variant'),
            button({onClick: onLightClick, className: 'lightbulb light-button'}, 'Light'),
            button({onClick: onDarkClick, className: 'lightbulb dark-button'}, 'Dark'),
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
        this.props.setSelectedGroupProps({color: e.target.value});
    },
    onChangeBackgroundColor(e) {
        this.props.setSelectedGroupProps({backgroundColor: e.target.value});
    },
    onLightClick(e) {
        this.props.activateVariant('light');
    },
    onDarkClick(e) {
        this.props.activateVariant('dark');
    }
});

var Export = React.createClass({
    render() {
        var {textarea} = React.DOM;

        return textarea({value: this.props.exportColorscheme()});
    }
});

var Root = React.createClass({
    getInitialState() {
        return {
            parsedSource: undefined,
            selectedGroup: 'Normal',
            activeVariant: 'light',
            dark: {
                Normal: {
                    color: '#cccccc',
                    backgroundColor: '#000000',
                    highlight: 'NONE'
                },
                TabLine: {
                    color: '#000000',
                    backgroundColor: '#aaaaaa',
                    highlight: 'NONE'
                },
                TabLineSel: {
                    color: '#000000',
                    backgroundColor: '#cccccc',
                    highlight: 'NONE'
                }
            },
            light: {
                Normal: {
                    color: '#000000',
                    backgroundColor: '#ffffff',
                    highlight: 'NONE'
                },
                TabLine: {
                    color: '#000000',
                    backgroundColor: '#cccccc',
                    highlight: 'NONE'
                },
                TabLineSel: {
                    color: '#000000',
                    backgroundColor: '#aaaaaa',
                    highlight: 'NONE'
                }
            }
        };
    },
    render() {
        var {main} = React.DOM;
        var {parsedSource, selectedGroup} = this.state;
        var {exportColorscheme} = this.props;
        var {getGroupProps, parse, selectGroup, setSelectedGroupProps, activateVariant} = this;
        return main(
            null,
            Header(),
            Paste({
                parsedSource,
                parse}),
            Source({
                parsedSource,
                getGroupProps,
                selectGroup}),
            Controls({
                activateVariant,
                selectedGroup,
                getGroupProps,
                setSelectedGroupProps}));
            // Export({exportColorscheme}));
    },
    parse(unparsedSource) {
        this.setState({parsedSource: parse(unparsedSource)});
    },
    activateVariant(activeVariant) {
        var body = document.getElementsByTagName('body')[0];
        body.className = activeVariant;
        this.setState({activeVariant});
    },
    selectGroup(selectedGroup) {
        this.setState({selectedGroup});
    },
    getGroupProps(group) {
        var groups = this.state[this.state.activeVariant];

        return {
            color: group in groups && 'color' in groups[group] ?
                groups[group].color :
                groups['Normal'].color,
            backgroundColor: group in groups && 'backgroundColor' in groups[group] ?
                groups[group].backgroundColor :
                groups['Normal'].backgroundColor
        };
    },
    setSelectedGroupProps(props) {
        var newState = this.state;
        var group = newState.selectedGroup;
        var groups = newState[this.state.activeVariant];

        if (!(group in groups))
            groups[group] = {};

        Object.assign(groups[group], props);
        this.setState(newState);
    }
});

React.renderComponent(Root(model), document.body);
