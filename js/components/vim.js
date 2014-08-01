var React = require('react');

var {spaces, fill, merge} = require('../actions/utils');

var Vim = React.createClass({
    render() {
        if (this.props.parsedSource === undefined)
            return null;

        return React.DOM.pre({
            key: 'pre',
            style: this.props.getStyle('Normal'),
            onMouseOver: this.onMouseOver,
            onClick: this.onClick,
            onMouseOut: this.onMouseOut,
            children: [
                TabLine(merge(this.props, {key: 'tabLine'})),
                Source(merge(this.props, {key: 'source'})),
                NonText(merge(this.props, {key: 'nonText'})),
                StatusLine(merge(this.props, {key: 'statusLine'}))
            ]});
    },
    onMouseOver() {
        this.props.setHoverGroup('Normal');
    },
    onMouseOut() {
        this.props.setHoverGroup(undefined);
    },
    onClick() {
        this.props.selectGroup('Normal');
    }
});

var Part = React.createClass({
    render() {
        var attributes = (this.props.group === undefined ? null : {
            key: 'part',
            style: this.props.getStyle(this.props.group),
            onClick: this.onClick,
            onMouseOver: this.onMouseOver,
        });

        return React.DOM.span(attributes, this.props.content);
    },
    onMouseOver(e) {
        this.props.setHoverGroup(this.props.group);
        e.stopPropagation();
    },
    onClick(e) {
        this.props.selectGroup(this.props.group);
        e.stopPropagation();
    }
});

var TabLine = React.createClass({
    render() {
        if (this.props.componentsVisibility['tabLine'] === 'hide')
            return null;

        return React.DOM.span(
            null,
            [
                Part(merge(this.props, {
                    key: 'oneFile',
                    group: 'TabLine',
                    content: ' one-file '
                })),
                Part(merge(this.props, {
                    key: 'anotherFile',
                    group: 'TabLine',
                    content: ' another-file '
                })),
                Part(merge(this.props, {
                    key: 'selectedFile',
                    group: 'TabLineSel',
                    content: ' selected-file '
                })),
                Part(merge(this.props, {
                    key: 'tabLineFill',
                    group: 'TabLineFill',
                    content: spaces(53),
                })),
                Part(merge(this.props, {
                    key: 'x',
                    group: 'TabLine',
                    content: 'X '
                })),
                '\n'
            ]);
    }
});

var Source = React.createClass({
    render() {
        return React.DOM.span(
            null,
            this.props.parsedSource.map((lineParts, index) =>
                Line(merge(this.props, {key: index, lineParts, index}))));
    }
});

var Line = React.createClass({
    render() {
        var children = [LineNumber(merge(this.props, {key: 'lineNumber'}))]
            .concat(this.lineParts())
            .concat([React.DOM.span({key: 'newLine'}, '\n')]);

        return React.DOM.span({key: 'line', children});
    },
    lineParts() {
        return this.props.lineParts.map((linePart, index) =>
            Part(merge(
                 this.props,
                 {key: index, group: linePart.group, content: linePart.content})));
    }
});

var LineNumber = React.createClass({
    render() {
        if (this.props.componentsVisibility['lineNumbers'] === 'hide' ||
            (this.props.activeFile === 'ui' || this.props.activeFile === 'editor')) {
            return null;
        }

        return Part(merge(
            this.props,
            {key: 'lineNr', group: 'LineNr', content: this.getContent()}
        ));
    },
    getContent() {
        var line = this.props.index + 1;
        var lineCount = this.props.parsedSource.length;
        var fillCount = 1 + (lineCount.toString().length - line.toString().length);
        return ' '.repeat(fillCount) + line + ' ';
    }
});

var NonText = React.createClass({
    render() {
        if (this.props.activeFile === 'ui') {
            return null;
        }

        var lineCount = Math.max(0, 32 - this.props.parsedSource.length);
        var group = 'NonText';
        var content = (fill('~') + '\n').repeat(lineCount);

        return Part(merge(this.props, {group, content}));
    }
});

var StatusLine = React.createClass({
    render() {
        if (this.props.componentsVisibility['statusLine'] !== 'show' ||
            this.props.activeFile === 'ui') {
            return null;
        }

        return Part(
            merge(this.props, {
                group: 'StatusLine',
                content: '~/path/to/file' + spaces(64) + '1,1         Top '
            }));
    }
});

module.exports = Vim;
