var React = require('react');

var Vim = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick} = this;
        var {parsedSource, getGroupProps, selectGroup} = this.props;

        var className = parsedSource === undefined ? 'hidden' : '';
        var style = getGroupProps('Normal');
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

        return pre({className, style, onClick}, [tabLine].concat(content));
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

        var style = getGroupProps(group());

        return span({style, onClick}, ' 2 ' + fileName + ' ');
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

        var style = getGroupProps('LineNr');
        var spaces = 1 + (lineCount.toString().length - line.toString().length)

        return span({style, onClick}, ' '.repeat(spaces) + line + ' ');
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
        var {selectGroup, segment} = this.props;

        selectGroup(segment.group);
        e.stopPropagation();
    }
});

module.exports = Vim;
