var React = require('react');
var Color = require('color');

var merge = (...args) => Object.assign({}, ...args);

var Vim = React.createClass({
    render() {
        var {pre} = React.DOM;
        var {onClick, onMouseOver, onMouseOut, attrs} = this;
        var {componentsVisibility, parsedSource, getGroup, selectGroup, setHoverGroup} = this.props;
        var args = {attrs, getGroup, selectGroup, setHoverGroup};

        var className = parsedSource === undefined ? 'hidden' : '';
        var props = getGroup('Normal');
        var {style} = attrs(props);
        var source;

        if (parsedSource !== undefined) {
            source = parsedSource.map(
                (line, index) => Line(merge(args, {
                        componentsVisibility,
                        line,
                        lineNumber: {
                            line: index,
                            lineCount: parsedSource.length
                        }
                    })));
        }

        var output = [];

        if (componentsVisibility['tabLine'] === 'show') {
            output = output.concat(TabLine(args));
        }

        output = output.concat(source).concat(NonText(args));

        if (componentsVisibility['statusLine'] === 'show') {
            output = output.concat(StatusLine(args));
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
                style['fontWeight'] = '600';
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

        return {
            style,
            className: '' // TODO: Remove!
        };
    }
});

var NonText = React.createClass({
    render() {
        var {attrs, getGroup, selectGroup, setHoverGroup} = this.props;
        var args = {attrs, getGroup, selectGroup, setHoverGroup};

        return Segment(merge(args, {
            segment: {
                group: 'NonText',
                content: '~                                                                                   \n'.repeat(10)
            }
        }));
    }
});

var StatusLine = React.createClass({
    render() {
        var {span} = React.DOM;
        var {attrs, getGroup, selectGroup, setHoverGroup} = this.props;
        var args = {attrs, getGroup, selectGroup, setHoverGroup};

        return span(
            null,
            [
                Segment(merge(args, {
                    segment: {
                        group: 'StatusLine',
                        content: '~/path/to/file                                                      1,1         Top '
                    }
                }))
            ]);
    }
});

var TabLine = React.createClass({
    render() {
        var {span} = React.DOM;
        var {attrs, getGroup, selectGroup, setHoverGroup} = this.props;
        var args = {attrs, getGroup, selectGroup, setHoverGroup};

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
                        content: '                                           '
                    }
                })),
                Segment(merge(args, {
                    segment: {
                        group: 'TabLine',
                        content: 'X '
                    }
                })),
                '\n'
            ]);
    }
});

var Line = React.createClass({
    render() {
        var {span} = React.DOM;
        var {setHoverGroup, componentsVisibility, attrs, getGroup, line, lineNumber, selectGroup} = this.props;
        var lineNumber_ = [LineNumber({setHoverGroup, attrs, lineNumber, getGroup, selectGroup})]
        var segments = line.map(segment => Segment({setHoverGroup, attrs, segment, getGroup, selectGroup}));
        var output = componentsVisibility['lineNumbers'] === 'show' ? lineNumber_ : [];

        return span(null, output.concat(segments.concat(span(null, '\n'))));
    }
});

var LineNumber = React.createClass({
    render() {
        var {span} = React.DOM;
        var {onClick, onMouseOver} = this;
        var {attrs, getGroup, lineNumber} = this.props;
        var {line, lineCount} = lineNumber;

        var props = getGroup('LineNr');
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
        var {segment, getGroup, attrs} = this.props;

        if (typeof(segment) === 'object') {
            var parentGroup = ('parentGroup' in segment ? segment.parentGroup : 'Normal');
            var props = getGroup(segment.group, parentGroup);
            var {style, className} = attrs(props);

            return span({
                style,
                className,
                onClick,
                onMouseOver},
                segment.content);
        } else {
            var props = getGroup('Normal');
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
