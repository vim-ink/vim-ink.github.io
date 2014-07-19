var React = require('react');
var _ = require('lodash');

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
            return _.cloneDeep(initialState);
        }
    },
    render() {
        var {span, main} = React.DOM;
        var {
            clearExportedSource,
            exportColorScheme,
            getGroupProps,
            getModifiedGroups,
            parse,
            resetGroup,
            resetState,
            selectGroup,
            setActiveColor,
            setActiveFile,
            setActivePane,
            setActiveVariant,
            setComponentVisibility,
            setHoverGroup,
            setParsedSource,
            setPostProcessProps,
            setSectionVisibility,
            setSelectedGroupProps} = this;
        var {activeColor,
            activeFile,
            activePane,
            activeVariant,
            componentsVisibility,
            exportedSource,
            hoverGroup,
            parsedSource,
            postProcess,
            sectionsVisibility,
            selectedGroup} = this.state;
        var {exportColorscheme} = this.props;

        return span(
            null,
            Header(),
            main(null,
                Left({
                    activeFile,
                    activeVariant,
                    componentsVisibility,
                    getGroupProps,
                    parse,
                    parsedSource,
                    postProcess,
                    selectGroup,
                    setActiveFile,
                    setHoverGroup,
                    setParsedSource}),
                Right({
                    activeColor,
                    activePane,
                    activeVariant,
                    componentsVisibility,
                    exportColorScheme,
                    getGroupProps,
                    getModifiedGroups,
                    hoverGroup,
                    postProcess,
                    resetGroup,
                    resetState,
                    sectionsVisibility,
                    selectedGroup,
                    setActiveColor,
                    setActivePane,
                    setActiveVariant,
                    setComponentVisibility,
                    setPostProcessProps,
                    setSectionVisibility,
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
                groups['Normal'].backgroundColor,
            highlight: group in groups && 'highlight' in groups[group] ?
                groups[group].highlight :
                groups['Normal'].highlight
        };
    },
    getModifiedGroups() {
        // console.log(JSON.stringify(this.state.parsedSource));
        var {initialState} = this.props;
        var {activeVariant} = this.state;
        var initialGroups = initialState[activeVariant];
        var groups = this.state[activeVariant];

        return Object.keys(groups).filter(group => {
            return !(group in initialGroups && _.isEqual(initialGroups[group], groups[group]));
        });
    },
    resetGroup(group) {
        var {initialState} = this.props;
        var newState = this.state;
        var initialGroups = initialState[this.state.activeVariant];
        var groups = newState[this.state.activeVariant];

        if (group in initialGroups)
            groups[group] = _.cloneDeep(initialGroups[group]);
        else
            delete groups[group];

        this.setState(newState);
    },
    setParsedSource(parsedSource) {
        this.setState({parsedSource});
    },
    setActiveFile(activeFile) {
        this.setState({activeFile});
    },
    setActivePane(activePane) {
        this.setState({activePane});
    },
    setHoverGroup(hoverGroup) {
        this.setState({hoverGroup});
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
    setSectionVisibility(section, visibility) {
        var newState = this.state;
        var {sectionsVisibility} = newState;
        sectionsVisibility[section] = visibility;
        this.setState(newState);
    },
    setComponentVisibility(component, visibility) {
        var newState = this.state;
        var {componentsVisibility} = newState;
        componentsVisibility[component] = visibility;
        this.setState(newState);
    },
    setPostProcessProps(props) {
        var newState = this.state;
        var {activeVariant} = newState;
        var postProcess = newState.postProcess[activeVariant];
        Object.assign(postProcess, props);
        this.setState(newState);
    },
    setActiveVariant(activeVariant) {
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

        this.setState({exportedSource: exporter.exportColorScheme(_.cloneDeep(this.state))});
    },
    clearExportedSource() {
        this.setState({exportedSource: undefined});
    },
    resetState() {
        var {initialState} = this.props;
        var {dark, light, postProcess} = _.cloneDeep(initialState);

        this.setState({dark, light, postProcess});
    }
});

module.exports = App;
