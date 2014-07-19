var React = require('react');
var Color = require('color');

var Vim = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick, onMouseOver, onMouseOut, attrs} = this;
        var {componentsVisibility, parsedSource, getGroupProps, selectGroup, setHoverGroup} = this.props;
        var className = parsedSource === undefined ? 'hidden' : '';
        var props = getGroupProps('Normal');
        var {style} = attrs(props);
        var tabLine = TabLine({setHoverGroup, attrs, getGroupProps, selectGroup});
        var source;

        if (parsedSource !== undefined) {
            source = parsedSource.map(
                (line, index) => Line({
                    setHoverGroup,
                    componentsVisibility,
                    attrs,
                    getGroupProps,
                    line,
                    lineNumber: {
                        line: index,
                        lineCount: parsedSource.length},
                    selectGroup}))
        }

        var output;
        if (componentsVisibility['tabLine'] === 'show') {
            output = [tabLine].concat(source);
        } else {
            output = source;
        }

        return pre({style, className, onClick, onMouseOver, onMouseOut}, output);
    },
    onMouseOver() {
        this.props.setHoverGroup('Normal');
    },
    onMouseOut() {
        this.props.setHoverGroup(undefined);
    },
    onClick() {
        var {selectGroup} = this.props;

        selectGroup('Normal');
    },
    attrs(props) {
        var {postProcess, activeVariant} = this.props;
        var {brightness, saturation} = postProcess[activeVariant];

        return {
            style: {
                color: Color(props.color)
                    .lighten(brightness)
                    .saturate(saturation)
                    .hexString(),
                backgroundColor: Color(props.backgroundColor)
                    .lighten(brightness)
                    .saturate(saturation)
                    .hexString()
            },
            className: props.highlight === 'NONE' ? '' : props.highlight
        };
    }
});

var TabLine = React.createClass({
    render() {
        var {span} = React.DOM;
        var {setHoverGroup, getGroupProps, selectGroup, attrs} = this.props;

        return span(
            null,
            [
                TabLineFile({
                    setHoverGroup,
                    attrs,
                    getGroupProps,
                    selectGroup,
                    fileName: 'one-file.js',
                    selected: false}),
                TabLineFile({
                    setHoverGroup,
                    attrs,
                    getGroupProps,
                    selectGroup,
                    fileName: 'another-file.js',
                    selected: false}),
                TabLineFile({
                    setHoverGroup,
                    attrs,
                    getGroupProps,
                    selectGroup,
                    fileName: 'yet-another-file.js',
                    selected: true}),
                '\n'
            ]);
    }
});

var TabLineFile = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, onMouseOver, group} = this;
        var {getGroupProps, fileName, selected, attrs} = this.props;

        var props = getGroupProps(group());
        var {style, className} = attrs(props);

        return span({style, className, onClick, onMouseOver}, ' 2 ' + fileName + ' ');
    },
    onMouseOver(e) {
        var {group} = this;
        var {setHoverGroup} = this.props;

        setHoverGroup(group());
        e.stopPropagation();
    },
    onClick(e) {
        var {group} = this;
        var {selectGroup} = this.props;

        selectGroup(group());
        e.stopPropagation();
    },
    group() {
        var {selected} = this.props;

        return (selected === true ? 'TabLineSel' : 'TabLine');
    }
});

var Line = React.createClass({
    render() {
        var {span} = React.DOM;
        var {setHoverGroup, componentsVisibility, attrs, getGroupProps, line, lineNumber, selectGroup} = this.props;
        var lineNumber_ = [LineNumber({setHoverGroup, attrs, lineNumber, getGroupProps, selectGroup})]
        var segments = line.map(segment => Segment({setHoverGroup, attrs, segment, getGroupProps, selectGroup}));
        var output = componentsVisibility['lineNumbers'] === 'show' ? lineNumber_ : [];

        return span(null, output.concat(segments.concat(span(null, '\n'))));
    }
});

var LineNumber = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, onMouseOver} = this;
        var {attrs, getGroupProps, lineNumber} = this.props;
        var {line, lineCount} = lineNumber;

        var props = getGroupProps('LineNr');
        var {style, className} = attrs(props);
        var spaces = 1 + (lineCount.toString().length - line.toString().length)

        return span({style, className, onClick, onMouseOver}, ' '.repeat(spaces) + line + ' ');
    },
    onMouseOver(e) {
        var {setHoverGroup} = this.props;

        setHoverGroup('LineNr');
        e.stopPropagation();
    },
    onClick(e) {
        var {selectGroup} = this.props;

        selectGroup('LineNr');
        e.stopPropagation();
    }
});

var Segment = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, onMouseOver, style} = this;
        var {segment, getGroupProps, attrs} = this.props;

        if (typeof(segment) === 'object') {
            var props = getGroupProps(segment.group);
            var {style, className} = attrs(props);

            return span({
                style,
                className,
                onClick,
                onMouseOver},
                segment.content);
        } else {
            var props = getGroupProps('Normal');
            var {className} = attrs(props)

            return span({className}, segment);
        }
    },
    onMouseOver(e) {
        var {setHoverGroup, segment} = this.props;
        setHoverGroup(segment.group);
        e.stopPropagation();
    },
    onClick(e) {
        var {selectGroup, segment} = this.props;

        selectGroup(segment.group);
        e.stopPropagation();
    }
});

module.exports = Vim;
