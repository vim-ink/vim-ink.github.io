require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;
var exporter = require('./exporter');

var Header = React.createClass({
    render() {
        var {header, h1} = React.DOM;

        return header(null, h1(null, 'vim.ink'));
    }
});

var Paste = React.createClass({
    render() {
        var {textarea} = React.DOM;
        var {onChange} = this;
        var {parsedSource} = this.props;

        var className = (parsedSource !== undefined) ? 'hidden' : 'paste';

        return textarea({onChange, className, placeholder: 'Paste output of `:TOhtml` here.'});
    },
    onChange(e) {
        var {parse} = this.props;

        parse(e.target.value);
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

var Line = React.createClass({
    render() {
        var {span} = React.DOM;
        var {getGroupProps, line, lineNumber, selectGroup} = this.props;

        var lineNumber_ = [LineNumber({lineNumber, getGroupProps, selectGroup})]
        var segments = line.map(segment => Segment({segment, getGroupProps, selectGroup}));

        return span(null, lineNumber_.concat(segments.concat(span(null, '\n'))));
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

var Controls = React.createClass({
    render() {
        var {aside, h2, p, div, input, label, button, span, ul, li} = React.DOM;
        var {onChangeColor,
            onChangeBackgroundColor,
            onLightClick,
            onDarkClick,
            onExportClick,
            onResetClick} = this;
        var {getGroupProps, selectedGroup} = this.props;

        var lightActive = this.props.activeVariant === 'light' ? ' active' : '';
        var darkActive = this.props.activeVariant === 'dark' ? ' active' : '';
        var colorPair = getGroupProps(selectedGroup);

        return aside(null,
            h2(null, 'Variant'),
            button({onClick: onLightClick, className: 'switch-button light-button' + lightActive}, 'Light'),
            button({onClick: onDarkClick, className: 'switch-button dark-button' + darkActive}, 'Dark'),
            h2(null, 'Selected group'),
            div({className: 'line'},
                this.props.selectedGroup),
            h2(null, 'Color'),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({type: 'color', value: colorPair.color, onChange: onChangeColor}),
                    div({className: 'color'})),
                div({className: 'right'},
                    'Foreground')),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({type: 'color', value: colorPair.backgroundColor, onChange: onChangeBackgroundColor}),
                    div({className: 'color'})),
                div({className: 'right'},
                    'Background')),
            h2({className: 'collapsed'}, 'Highlight'),
            div({className: 'line'},
                button({className: 'highlight-button none'}, span(null, 'n')),
                button({className: 'highlight-button bold active'}, span(null, 'b')),
                button({className: 'highlight-button italic'}, span(null, 'i')),
                button({className: 'highlight-button underline'}, span(null, 'u')),
                button({className: 'highlight-button undercurl'}, span(null, 'u'))),
            div({className: 'line'},
                button({className: 'highlight-button reverse'}, span(null, 'r')),
                button({className: 'highlight-button standout'}, span(null, 's'))),
            h2({className: 'collapsed'}, 'Post process'),
            div({className: 'line post-process-line'},
                div({className: 'left'}, 'Brightness'),
                div({className: 'right'}, input({type: 'range', min: 1, max: 9}))),
            div({className: 'line post-process-line'},
                div({className: 'left'}, 'Contrast'),
                div({className: 'right'}, input({type: 'range', min: 1, max: 9}))),
            h2({className: 'collapsed'}, 'Parts'),
            div({className: 'line  button-line'},
                div({className: 'left'}, 'Tab line'),
                div({className: 'right'}, button({className: 'small-button'}, 'Show'))
            ),
            div({className: 'line button-line'},
                div({className: 'left'}, 'Status line'),
                div({className: 'right'}, button({className: 'small-button'}, 'Show'))
            ),
            h2({className: 'collapsed'}, 'Assigned groups'),
            div({className: 'line button-line'},
                div({className: 'left'}, 'Something'),
                div({className: 'right'}, button({className: 'small-button'}, 'Remove'))
            ),
            h2(null, 'Export'),
            div({className: 'line export-line-input'},
                div({className: 'left'}, label(null, 'Name')),
                div({className: 'right'}, input({className: 'text', value: 'whatever'}))),
            div({className: 'line export-line-button'},
                button({className: 'button', onClick: onExportClick}, 'Export')),
            h2({className: 'collapsed'}, 'Danger zone'),
            button({className: 'button', onClick: onResetClick}, 'Reset'));
    },
    onChangeColor(e) {
        this.props.setSelectedGroupProps({color: e.target.value});
    },
    onChangeBackgroundColor(e) {
        this.props.setSelectedGroupProps({backgroundColor: e.target.value});
    },
    onLightClick() {
        this.props.activateVariant('light');
    },
    onDarkClick() {
        this.props.activateVariant('dark');
    },
    onExportClick() {
        this.props.exportColorScheme();
    },
    onResetClick() {
        this.props.resetState();
    }
});

var Export = React.createClass({
    render() {
        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick} = this;
        var {exportedSource} = this.props;

        var hiddenConditional = exportedSource === undefined ? 'hidden' : '';

        return div({className: 'export dialog ' + hiddenConditional},
            h2(null, 'Here is your color scheme!'),
            p(null, 'Copy the code below to clipboard and paste into a new vim buffer. Do `:w ~/.vim/colors/whatever.vim`, `:set background light`, and finally `:colorscheme whatever`.'),
            textarea({value: exportedSource, readOnly: true}),
            button({className: 'button', onClick}, 'Close'));
    },
    onClick() {
        this.props.clearExportedSource();
    }
});

var Files = React.createClass({
    render() {
        var {ul, li} = React.DOM;
        return ul({className: 'files'},
            li(null, 'HTML'),
            li({className: 'active'}, 'CSS'),
            li(null, 'JavaScript'),
            li(null, 'Python'),
            li(null, 'Ruby'),
            li(null, 'Go'),
            li(null, 'Rust'),
            li({className: 'paste-link'}, 'Paste'));
    }
});

var Left = React.createClass({
    render() {
        var {article} = React.DOM;
        return article(null,
            this.props.paste,
            this.props.files,
            this.props.source);
    }
});

var Footer = React.createClass({
    render() {
        var {footer, ul, li} = React.DOM;
        return footer(null,
            ul({className: 'nav'},
              li(null, 'About'),
              li(null, 'GitHub'),
              li(null, 'Gittip')));
    }
});

var Root = React.createClass({
    getInitialState() {
        if (localStorage.getItem('state') !== null) {
            return JSON.parse(localStorage.getItem('state'));
        } else {
            return {
                _stateFormatVersion: 0,
                unparsedSource: undefined,
                parsedSource: undefined,
                activeVariant: 'light',
                selectedGroup: 'Normal',
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
                    },
                    Cursor: {
                        highlight: 'reverse'
                    },
                    Visual: {
                        highlight: 'reverse'
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
                    },
                    Cursor: {
                        highlight: 'reverse'
                    },
                    Visual: {
                        highlight: 'reverse'
                    }
                }
            };
        }
    },
    render() {
        var {span, main} = React.DOM;
        var {getGroupProps,
            parse,
            selectGroup,
            setSelectedGroupProps,
            activateVariant,
            resetState,
            exportColorScheme,
            clearExportedSource} = this;
        var {activeVariant,
            parsedSource,
            selectedGroup,
            exportedSource} = this.state;
        var {exportColorscheme} = this.props;
        return span(
            null,
            Header(),
            main(null,
                Left({
                        paste: Paste({
                            parsedSource,
                            parse}),
                        files: Files(),
                        source: Source({
                            parsedSource,
                            getGroupProps,
                            selectGroup})
                    }),
                Controls({
                    resetState,
                    exportColorScheme,
                    activeVariant,
                    activateVariant,
                    selectedGroup,
                    getGroupProps,
                    setSelectedGroupProps})),
            Footer(),
            Export({exportedSource, clearExportedSource}));
    },
    parse(unparsedSource) {
        this.setState({parsedSource: parse(unparsedSource)});
    },
    componentDidMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = this.state.activeVariant;
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
    },
    exportColorScheme() {
        this.setState({exportedSource: exporter.exportColorScheme(this.state)});
    },
    clearExportedSource() {
        this.setState({exportedSource: undefined});
    },
    resetState() {
        this.setState({parsedSource: undefined, exportedSource: undefined});
    },
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }
});

React.renderComponent(Root(), document.body);
