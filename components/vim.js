var React = require('react');
var Color = require('color');

function styleFromProps(props) {
    return {
        color: Color(props.color).lighten(0.1).hexString(),
        backgroundColor: Color(props.backgroundColor).lighten(0.1).hexString()
    };
}

function classNameFromProps(props) {
    return props.highlight === 'NONE' ? '' : props.highlight;
}

var Vim = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick} = this;
        var {parsedSource, getGroupProps, selectGroup} = this.props;

        var className = parsedSource === undefined ? 'hidden' : '';
        var props = getGroupProps('Normal');
        var style = styleFromProps(props);

        var tabLine = TabLine({getGroupProps, selectGroup});
        var content;

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

        return pre({style, className, onClick}, [tabLine].concat(content));
    },
    onClick() {
        var {selectGroup} = this.props;

        selectGroup('Normal');
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

var TabLineFile = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, group} = this;
        var {getGroupProps, fileName, selected} = this.props;
        var props = getGroupProps(group());
        var style = styleFromProps(props);
        var className = classNameFromProps(props);

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
        var {getGroupProps, line, lineNumber, selectGroup} = this.props;

        var lineNumber_ = [LineNumber({lineNumber, getGroupProps, selectGroup})]
        var segments = line.map(segment => Segment({segment, getGroupProps, selectGroup}));

        return span(null, lineNumber_.concat(segments.concat(span(null, '\n'))));
    }
});

var LineNumber = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick} = this;
        var {getGroupProps, lineNumber} = this.props;
        var {line, lineCount} = lineNumber;

        var props = getGroupProps('LineNr');
        var style = styleFromProps(props);
        var className = classNameFromProps(props);
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
        var {segment, getGroupProps} = this.props;

        if (typeof(segment) === 'object') {
            var props = getGroupProps(segment.group);
            var style = styleFromProps(props);
            var className = classNameFromProps(props);

            return span({
                style,
                className,
                onClick},
                segment.content);
        } else {
            var props = getGroupProps('Normal');
            var className = classNameFromProps(props);

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
