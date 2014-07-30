var React = require('react');
var Color = require('color');

var merge = (...args) => Object.assign({}, ...args);

var Vim = React.createClass({
    render() {
        if (this.props.parsedSource === undefined)
            return null;

        var show = component => this.props.componentsVisibility[component] === 'show';

        return React.DOM.pre({
            key: 'pre',
            style: this.style(this.props.getGroup('Normal')),
            onMouseOver: this.onMouseOver,
            onClick: this.onClick,
            onMouseOut: this.onMouseOut},
            []
                .concat(show('tabLine') ?
                        TabLine(this.args()) :
                        [])
                .concat(this.source())
                .concat(NonText(merge(this.args(), {parsedSource: this.props.parsedSource})))
                .concat(show('statusLine') ?
                        StatusLine(this.args()) :
                        []));
    },
    args() {
        return {
            style: this.style,
            getGroup: this.props.getGroup,
            selectGroup: this.props.selectGroup,
            setHoverGroup: this.props.setHoverGroup
        };
    },
    source() {
        return this.props.parsedSource.map((line, index) =>
           Line(merge(this.args(), {
                key: index,
                componentsVisibility: this.props.componentsVisibility,
                line,
                lineNumber: {
                    line: index,
                    lineCount: this.props.parsedSource.length
                }
            })));
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
    style(props) {
        var {postProcess, activeVariant, getGroup} = this.props;
        var {brightness, saturation} = postProcess[activeVariant];
        var normal = getGroup('Normal');

        var color = ('color' in props ?
            props.color :
            undefined);
        var backgroundColor = ('backgroundColor' in props ?
            props.backgroundColor :
            undefined);

        var style = {};

        switch (props.highlight) {
            case 'bold':
                style['fontWeight'] = '400';
                break;
            case 'italic':
                style['fontStyle'] = 'italic';
                break;
            case 'underline':
                style['textDecoration'] = 'underline';
                break;
            case 'undercurl':
                style['border-bottom'] = '1px dotted #888888';
                break;
            case 'reverse':
                var color_ = color;

                color = backgroundColor !== undefined ? backgroundColor : normal.backgroundColor;
                backgroundColor = color_ !== undefined ? color_ : normal.color;
                break;
            case 'standout':
                style['fontWeight'] = 600;
                var color_ = color;

                color = backgroundColor !== undefined ? backgroundColor : normal.backgroundColor;
                backgroundColor = color_ !== undefined ? color_ : normal.color;
                break;
        }

        if (color !== undefined) {
            style['color'] = Color(color)
                .lighten(brightness)
                .saturate(saturation)
                .hexString();
        } else {
            style['color'] = undefined;
        }

        if (backgroundColor !== undefined) {
            style['backgroundColor'] = Color(backgroundColor)
                .lighten(brightness)
                .saturate(saturation)
                .hexString();
        } else {
            style['backgroundColor'] = undefined;
        }

        return style;
    }
});

var NonText = React.createClass({
    render() {
        var linesCount = Math.max(0, 32 - this.props.parsedSource.length);
        var group = 'NonText';
        var content = '~                                                                                       \n'.repeat(linesCount);

        return Segment(merge(this.props, {segment: {group, content}}));
    }
});

var StatusLine = React.createClass({
    render() {
        var {span} = React.DOM;
        var {style, getGroup, selectGroup, setHoverGroup} = this.props;
        var args = {style, getGroup, selectGroup, setHoverGroup};

        return span(
            null,
            [
                Segment(merge(args, {
                    segment: {
                        group: 'StatusLine',
                        content: '~/path/to/file                                                       1,1         Top    '
                    }
                }))
            ]);
    }
});

var TabLine = React.createClass({
    render() {
        var {span} = React.DOM;
        var {style, getGroup, selectGroup, setHoverGroup} = this.props;
        var args = {style, getGroup, selectGroup, setHoverGroup};

        return span(
            null,
            [
                Segment(merge(args, {
                    segment: {
                        group: 'TabLine',
                        content: [
                            ' one-file '
                        ]
                    }
                })),
                Segment(merge(args, {
                    segment: {
                        group: 'TabLine',
                        content: [
                            ' another-file '
                        ]
                    }
                })),
                Segment(merge(args, {
                    segment: {
                        group: 'TabLineSel',
                        content: ' selected-file '
                    }
                })),
                Segment(merge(args, {
                    segment: {
                        group: 'TabLineFill',
                        content: '                                            '
                    }
                })),
                Segment(merge(args, {
                    segment: {
                        group: 'TabLine',
                        content: '     ' // Should be 'X ', but I decided to hide it
                    }
                })),
                '\n'
            ]);
    }
});

var Line = React.createClass({
    render() {
        var {span} = React.DOM;
        var {componentsVisibility} = this.props;

        var children = []
            .concat(componentsVisibility['lineNumbers'] === 'show' ? this.lineNumber() : [])
            .concat(this.segments())
            .concat(span({key: 'newLine'}, '\n'));

        return span({key: 'line'}, children);
    },
    lineNumber() {
        return LineNumber({
            key: 'lineNumber',
            style: this.props.style,
            getGroup: this.props.getGroup,
            lineNumber: this.props.lineNumber,
            selectGroup: this.props.selectGroup,
            setHoverGroup: this.props.setHoverGroup
        });
    },
    segments() {
        return this.props.line.map((segment, index) =>
            Segment({
                key: index,
                segment,
                style: this.props.style,
                getGroup: this.props.getGroup,
                selectGroup: this.props.selectGroup,
                setHoverGroup: this.props.setHoverGroup
            }));
    }
});

var LineNumber = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, onMouseOver} = this;
        var {style, getGroup, lineNumber} = this.props;
        var {line, lineCount} = lineNumber;

        var props = getGroup('LineNr');
        var spaceCount = 1 + (lineCount.toString().length - line.toString().length)

        var content = ' '.repeat(spaceCount) + line + ' ';

        return span({
            style: style(props),
            onClick: this.onClick,
            onMouseOver: this.onMouseOver},
            content);
    },
    onMouseOver(e) {
        this.props.setHoverGroup('LineNr');
        e.stopPropagation();
    },
    onClick(e) {
        this.props.selectGroup('LineNr');
        e.stopPropagation();
    }
});

var Segment = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, onMouseOver, style} = this;
        var {segment, getGroup, style} = this.props;

        if (typeof(segment) === 'object') {
            var parentGroup = ('parentGroup' in segment ? segment.parentGroup : 'Normal');
            var props = getGroup(segment.group, parentGroup);

            return span({
                style: style(props),
                onClick,
                onMouseOver},
                segment.content);
        } else {
            return span(null, segment);
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
