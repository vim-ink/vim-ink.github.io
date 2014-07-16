var React = require('react');

var Header = require('./header');
var Left = require('./left');
var Right = require('./right');
var Footer = require('./footer');
var Export = require('./export');

var App = React.createClass({
    getInitialState() {
        var {initialState} = this.props;

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
            setActiveColor,
            resetState,
            exportColorScheme,
            clearExportedSource} = this;
        var {activeVariant, parsedSource, selectedGroup, exportedSource, activeColor} = this.state;
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
                    activeVariant,
                    selectedGroup,
                    resetState,
                    exportColorScheme,
                    activateVariant,
                    activeColor,
                    setActiveColor,
                    getGroupProps,
                    setSelectedGroupProps})),
            Footer(),
            Export({exportedSource, clearExportedSource}));
    },
    componentDidMount() {
        var body = document.getElementsByTagName('body')[0];

        body.className = this.state.activeVariant;
    },
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
    },
    getGroupProps(group) {
        var {activeVariant} = this.state;
        var groups = this.state[activeVariant];

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
    activateVariant(activeVariant) {
        var body = document.getElementsByTagName('body')[0];

        body.className = activeVariant;
        this.setState({activeVariant});
    },
    selectGroup(selectedGroup) {
        this.setState({selectedGroup});
    },
    setActiveColor(activeColor) {
        this.setState({activeColor});
    },
    parse(unparsedSource) {
        var {parse} = this.props;

        this.setState({parsedSource: parse(unparsedSource)});
    },
    exportColorScheme() {
        var {exporter} = this.props;

        this.setState({exportedSource: exporter.exportColorScheme(this.state)});
    },
    clearExportedSource() {
        this.setState({exportedSource: undefined});
    },
    resetState() {
        var {initialState} = this.props;

        this.replaceState(initialState);
    }
});

module.exports = App;
