require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;
var exporter = require('./exporter');

var Source = require('./source');
var Controls = require('./controls');

var Header = React.createClass({
    render() {
        var {header, h1} = React.DOM;

        return header(null, h1(null, 'vim.ink'));
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
