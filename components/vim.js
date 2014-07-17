var React = require('react');
var Color = require('color');

var Vim = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick, attrs} = this;
        var {parsedSource, getGroupProps, selectGroup} = this.props;

        var className = parsedSource === undefined ? 'hidden' : '';
        var props = getGroupProps('Normal');
        var {style} = attrs(props);

        var tabLine = TabLine({attrs, getGroupProps, selectGroup});
        var content;

        if (parsedSource !== undefined) {
            content = parsedSource.map(
                (line, index) => Line({
                    attrs,
                    getGroupProps,
                    line,
                    lineNumber: {
                        line: index,
                        lineCount: parsedSource.length},
                    selectGroup}))
        }

        return pre({style, className, onClick}, [tabLine].concat(content));
    },
    onClick() {
        var {selectGroup} = this.props;

        selectGroup('Normal');
    },
    attrs(props) {
        var {postProcess} = this.props;
        var {brightness, saturation} = postProcess;

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
        var {getGroupProps, selectGroup, attrs} = this.props;

        return span(
            null,
            [
                TabLineFile({
                    attrs,
                    getGroupProps,
                    selectGroup,
                    fileName: 'one-file.js',
                    selected: false}),
                TabLineFile({
                    attrs,
                    getGroupProps,
                    selectGroup,
                    fileName: 'another-file.js',
                    selected: false}),
                TabLineFile({
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
        var {onClick, group} = this;
        var {getGroupProps, fileName, selected, attrs} = this.props;

        var props = getGroupProps(group());
        var {style, className} = attrs(props);

        return span({style, className, onClick}, ' 2 ' + fileName + ' ');
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
        var {attrs, getGroupProps, line, lineNumber, selectGroup} = this.props;

        var lineNumber_ = [LineNumber({attrs, lineNumber, getGroupProps, selectGroup})]
        var segments = line.map(segment => Segment({attrs, segment, getGroupProps, selectGroup}));

        return span(null, lineNumber_.concat(segments.concat(span(null, '\n'))));
    }
});

var LineNumber = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick} = this;
        var {attrs, getGroupProps, lineNumber} = this.props;
        var {line, lineCount} = lineNumber;

        var props = getGroupProps('LineNr');
        var {style, className} = attrs(props);
        var spaces = 1 + (lineCount.toString().length - line.toString().length)

        return span({style, className, onClick}, ' '.repeat(spaces) + line + ' ');
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
        var {onClick, style} = this;
        var {segment, getGroupProps, attrs} = this.props;

        if (typeof(segment) === 'object') {
            var props = getGroupProps(segment.group);
            var {style, className} = attrs(props);

            return span({
                style,
                className,
                onClick},
                segment.content);
        } else {
            var props = getGroupProps('Normal');
            var {className} = attrs(props)

            return span({className}, segment);
        }
    },
    onClick(e) {
        var {selectGroup, segment} = this.props;

        selectGroup(segment.group);
        e.stopPropagation();
    }
});

module.exports = Vim;
