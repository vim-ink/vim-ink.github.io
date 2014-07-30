var React = require('react/addons');
var _ = require('lodash');

var transition = React.addons.CSSTransitionGroup;
var transitionFast = children => transition({transitionName: 'fast', children});

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
        // if (localStorage.getItem('state') !== null) {
        //     return JSON.parse(localStorage.getItem('state'));
        // } else {
            return _.cloneDeep(initialState);
        // }
    },
    render() {
        var {span, main} = React.DOM;

        var children = [
            Header({
                key: 'header',
                setActiveFile: this.setActiveFile,
                setActivePane: this.setActivePane,
                setActiveVariant: this.setActiveVariant,
                setParsedSource: this.setParsedSource,

                activeFile: this.state.activeFile,
                activePane: this.state.activePane // TODO: Remove these below.
            }),
            main({
                    key: 'main',
                    className: 'wrap cf'
                },
                Left({
                    key: 'left',
                    getGroup: this.getGroup,
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
                    key: 'right',
                    deleteSelectedGroupProp: this.deleteSelectedGroupProp,
                    exportColorScheme: this.exportColorScheme,
                    getGroup: this.getGroup,
                    getModifiedGroups: this.getModifiedGroups,
                    resetGroup: this.resetGroup,
                    resetSelectedGroupProp: this.resetSelectedGroupProp,
                    resetState: this.resetState,
                    setActiveColor: this.setActiveColor,
                    setActivePane: this.setActivePane,
                    setActiveVariant: this.setActiveVariant,
                    setComponentVisibility: this.setComponentVisibility,
                    setExportName: this.setExportName,
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
            Footer({
                key: 'footer',
                setActiveFile: this.setActiveFile,
                setParsedSource: this.setParsedSource
            })]
            .concat(
                (this.state.exportedSource === undefined ?
                    [] :
                    [Export({
                        key: 'export',
                        clearExportedSource: this.clearExportedSource,
                        exportName: this.state.exportName,
                        exportedSource: this.state.exportedSource
                    })]));


        return span({
            key: 'span',
            children: transitionFast(children)
        });
    },
    componentDidMount() {
        this.updateBodyClass();
    },
    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('state', JSON.stringify(this.state));

        if (this.state.activeVariant !== prevState.activeVariant) {
            setTimeout(() => this.updateBodyClass(), 0);
        }
    },
    updateBodyClass() {
        var body = document.getElementsByTagName('body')[0];
        body.className = this.state.activeVariant + ' variant-transition';
        setTimeout(() => body.className = this.state.activeVariant, 500);
    },
    getGroup(group) {
        var groups =  this.state[this.state.activeVariant];
        return (group in groups ? groups[group] : {});
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
    setExportName(exportName) {
        this.setState({exportName});
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
    deleteSelectedGroupProp(prop) {
        var {selectedGroup} = this.state;

        if (selectedGroup === 'Normal') {
            this.resetSelectedGroupProp(prop);
        } else {
            var props = {};
            props[prop] = undefined;
            this.setSelectedGroupProps(props);
        }
    },
    resetSelectedGroupProp(prop) {
        var {activeVariant, selectedGroup} = this.state;
        var props = {};

        if (selectedGroup in initialState[activeVariant] &&
            prop in initialState[activeVariant][selectedGroup]) {
            props[prop] = initialState[activeVariant][selectedGroup][prop];
        } else {
            props[prop] = undefined;
        }

        this.setSelectedGroupProps(props);
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
    }
});

module.exports = App;
