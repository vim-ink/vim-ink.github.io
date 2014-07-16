var React = require('react');

var parse = require('../vim-tohtml-parser').parse;
var exporter = require('../exporter');
var initialState = require('../initial-state');

var Header = require('./header');
var Left = require('./left');
var Right = require('./right');
var Export = require('./export');
var Footer = require('./footer');

var App = React.createClass({
    getInitialState() {
        if (localStorage.getItem('state') !== null) {
            return JSON.parse(localStorage.getItem('state'));
        } else {
            return initialState;
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
        var {activeVariant, parsedSource, selectedGroup, exportedSource} = this.state;
        var {exportColorscheme} = this.props;

        return span(
            null,
            Header(),
            main(null,
                Left({
                    parsedSource,
                    parse,
                    getGroupProps,
                    selectGroup}),
                Right({
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

module.exports = App;
