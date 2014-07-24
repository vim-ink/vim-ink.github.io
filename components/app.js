var React = require('react');
var _ = require('lodash');

var initialState = require('../initial-state');
var parse = require('../vim-tohtml-parser');
var exporter = require('../exporter');

var Header = require('./header');
var Left = require('./left');
var Right = require('./right');
var Footer = require('./footer');
var Export = require('./export');

var App = React.createClass({
    getInitialState() {
        if (localStorage.getItem('state') !== null) {
            return JSON.parse(localStorage.getItem('state'));
        } else {
            return _.cloneDeep(initialState);
        }
    },
    render() {
        var {span, main} = React.DOM;

        return span(
            null,
            Header({
                setActiveFile: this.setActiveFile,
                setActivePane: this.setActivePane,
                setActiveVariant: this.setActiveVariant,
                setParsedSource: this.setParsedSource,

                activeFile: this.state.activeFile,
                activePane: this.state.activePane // TODO: Remove these below.
            }),
            main({className: 'wrap'},
                Left({
                    getGroupProps: this.getGroupProps,
                    parse: this.parse,
                    selectGroup: this.selectGroup,
                    setActiveFile: this.setActiveFile,
                    setHoverGroup: this.setHoverGroup,
                    setParsedSource: this.setParsedSource,

                    activeFile: this.state.activeFile,
                    activeVariant: this.state.activeVariant,
                    componentsVisibility: this.state.componentsVisibility,
                    parsedSource: this.state.parsedSource,
                    postProcess: this.state.postProcess
                }),
                Right({
                    exportColorScheme: this.exportColorScheme,
                    getGroup: this.getGroup,
                    getGroupProps: this.getGroupProps,
                    getModifiedGroups: this.getModifiedGroups,
                    resetGroup: this.resetGroup,
                    resetState: this.resetState,
                    setActiveColor: this.setActiveColor,
                    setActivePane: this.setActivePane,
                    setActiveVariant: this.setActiveVariant,
                    setComponentVisibility: this.setComponentVisibility,
                    setPostProcessProps: this.setPostProcessProps,
                    setSectionVisibility: this.setSectionVisibility,
                    setSelectedGroupProps: this.setSelectedGroupProps,

                    activeColor: this.state.activeColor,
                    activePane: this.state.activePane,
                    activeVariant: this.state.activeVariant,
                    componentsVisibility: this.state.componentsVisibility,
                    exportName: this.state.exportName,
                    hoverGroup: this.state.hoverGroup,
                    postProcess: this.state.postProcess,
                    sectionsVisibility: this.state.sectionsVisibility,
                    selectedGroup: this.state.selectedGroup
                })),
            Footer(),
            Export({
                clearExportedSource: this.clearExportedSource,

                exportName: this.state.exportName,
                exportedSource: this.state.exportedSource
            }));
    },
    componentDidMount() {
        this.setBodyClassName(this.state.activeVariant);
    },
    setBodyClassName(variant) {
        var body = document.getElementsByTagName('body')[0];

        body.className = variant;
    },
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
    },
    getGroup(group) {
        var groups =  this.state[this.state.activeVariant];
        return (group in groups ? groups[group] : {});
    },
    getGroupProps(group, parentGroup = 'Normal') {
        var {activeVariant} = this.state;
        var groups = this.state[activeVariant];

        return {
            color: group in groups && 'color' in groups[group] ?
                groups[group].color :
                groups[parentGroup].color,
            backgroundColor: group in groups && 'backgroundColor' in groups[group] ?
                groups[group].backgroundColor :
                groups[parentGroup].backgroundColor,
            highlight: group in groups && 'highlight' in groups[group] ?
                groups[group].highlight :
                groups[parentGroup].highlight
        };
    },
    getModifiedGroups() {
        // console.log(JSON.stringify(this.state.parsedSource));
        var {activeVariant} = this.state;
        var initialGroups = initialState[activeVariant];
        var groups = this.state[activeVariant];

        return Object.keys(groups).filter(group => {
            return !(group in initialGroups && _.isEqual(initialGroups[group], groups[group]));
        });
    },
    resetGroup(group) {
        var {activeVariant} = this.state;
        var state = {};
        state[activeVariant] = _.cloneDeep(this.state[activeVariant]);

        if (group in initialState[activeVariant]) {
            state[activeVariant][group] = _.cloneDeep(initialState[activeVariant][group]);
        } else {
            delete state[activeVariant][group];
        }

        this.setState(state);
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
        var {activeVariant, selectedGroup} = this.state;
        var state = {};
        state[activeVariant] = _.cloneDeep(this.state[activeVariant]);
        
        if (!(selectedGroup in state[activeVariant])) {
            state[activeVariant][selectedGroup] = {};
        }
        
        Object.assign(state[activeVariant][selectedGroup], props);
        this.setState(state);
    },
    setSectionVisibility(section, visibility) {
        var {sectionsVisibility} = this.state;
        var state = {sectionsVisibility: _.cloneDeep(sectionsVisibility)};
        state.sectionsVisibility[section] = visibility;
        this.setState(state);
    },
    setComponentVisibility(component, visibility) {
        var {componentsVisibility} = this.state;
        var state = {componentsVisibility: _.cloneDeep(componentsVisibility)};
        state.componentsVisibility[component] = visibility;
        this.setState(state);
    },
    setPostProcessProps(props) {
        var {activeVariant, postProcess} = this.state;
        var state = {
            postProcess: _.cloneDeep(postProcess)
        };
        Object.assign(state.postProcess[activeVariant], props);
        this.setState(state);
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
        this.setState({parsedSource: parse(unparsedSource)});
    },
    exportColorScheme() {
        var {exportName} = this.state;

        this.setState({
            exportedSource: exporter(_.cloneDeep(this.state))
        });
    },
    clearExportedSource() {
        this.setState({exportedSource: undefined});
    },
    resetState() {
        var state = _.cloneDeep(initialState);

        this.setState(state);
        this.setBodyClassName(initialState.activeVariant);
    }
});

module.exports = App;
