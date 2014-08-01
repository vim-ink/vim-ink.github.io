var _ = require('lodash');
var React = require('react');

var Header = require('./header');
var Left = require('./left');
var Right = require('./right');
var Footer = require('./footer');
var Export = require('./export');

var initialState = require('../constants/initial-state');

var parse = require('../actions/parser');
var exporter = require('../actions/exporter');
var {transitionFast} = require('../actions/transition');
var {merge} = require('../actions/utils');
var {getGroupStyle} = require('../actions/style');

var App = React.createClass({
    getInitialState() {
        if (localStorage.getItem('state') !== null) {
            return JSON.parse(localStorage.getItem('state'));
        } else {
            return _.cloneDeep(initialState);
        }
    },
    render() {
        return React.DOM.span({
            key: 'span',
            children: transitionFast([ // Only really used for `Export`
                this.getHeader(),
                this.getMain(),
                this.getFooter(),
                this.getExport()
            ])
        });
    },
    getHeader() {
        return Header(merge(this.state, {
            key: 'header',
            setActiveFile: this.setActiveFile,
            setActivePane: this.setActivePane,
            setActiveVariant: this.setActiveVariant,
            setParsedSource: this.setParsedSource
        }));
    },
    getMain() {
        return React.DOM.main({
                key: 'main',
                className: 'wrap clear-fix',
                children: [
                    this.getLeft(),
                    this.getRight()
                ]
        });
    },
    getFooter() {
        return Footer({
            key: 'footer',
            setActiveFile: this.setActiveFile,
            setParsedSource: this.setParsedSource
        });
    },
    getExport() {
        if (this.state.exportedSource === undefined) {
            return [];
        } else {
            return Export(merge(this.state, {
                key: 'export',
                clearExportedSource: this.clearExportedSource,
                exportName: this.state.exportName,
                exportedSource: this.state.exportedSource
            }));
        }
    },
    getLeft() {
        return Left(merge(this.state, {
            key: 'left',
            getGroup: this.getGroup,
            getStyle: this.getStyle,
            parseSource: this.parseSource,
            selectGroup: this.selectGroup,
            setHoverGroup: this.setHoverGroup,
            setParsedSource: this.setParsedSource
        }));
    },
    getRight() {
        return Right(merge(this.state, {
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
            setSelectedGroupProps: this.setSelectedGroupProps
        }));
    },
    componentDidMount() {
        var body = document.getElementsByTagName('body')[0];
        body.className = this.state.activeVariant;
    },
    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('state', JSON.stringify(this.state));
    },
    startAppTransition(variant, transition = 'variant-transition', duration = 500) {
        var body = document.getElementsByTagName('body')[0];
        body.className = variant + ' ' + transition;
        setTimeout(() => body.className = variant, duration);
    },
    getGroup(group) {
        var groups =  this.state[this.state.activeVariant];

        return (group in groups ? groups[group] : {});
    },
    getModifiedGroups() {
        console.log(JSON.stringify(this.state.parsedSource));
        var initialGroups = initialState[this.state.activeVariant];
        var groups = this.state[this.state.activeVariant];

        return Object.keys(groups).filter(group => {
            return !(group in initialGroups && _.isEqual(initialGroups[group], groups[group]));
        });
    },
    getStyle(group) {
        return getGroupStyle(
            this.getGroup('Normal'),
            this.getGroup(group),
            this.state.postProcess[this.state.activeVariant])
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
    deleteSelectedGroupProp(prop) {
        if (this.state.selectedGroup === 'Normal') {
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
    selectGroup(selectedGroup) {
        var newState = {selectedGroup};

        if (this.state.activePane === 'global') {
            newState.activePane = this.state.activeVariant;
        }

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
    setExportName(exportName) {
        this.setState({exportName});
    },
    setSectionVisibility(section, visibility) {
        var state = {sectionsVisibility: _.cloneDeep(this.state.sectionsVisibility)};
        state.sectionsVisibility[section] = visibility;
        this.setState(state);
    },
    setComponentVisibility(component, visibility) {
        var state = {componentsVisibility: _.cloneDeep(this.state.componentsVisibility)};
        state.componentsVisibility[component] = visibility;
        this.setState(state);
    },
    setPostProcessProps(props) {
        var state = {
            postProcess: _.cloneDeep(this.state.postProcess)
        };
        Object.assign(state.postProcess[this.state.activeVariant], props);
        this.setState(state);
    },
    setActiveVariant(activeVariant) {
        this.setState({activeVariant});
        this.startAppTransition(activeVariant);
    },
    setActiveColor(activeColor) {
        this.setState({activeColor});
    },
    parseSource(source) {
        this.setState({parsedSource: parse(source)});
    },
    exportColorScheme() {
        this.setState({
            exportedSource: exporter(_.cloneDeep(this.state))
        });
    },
    clearExportedSource() {
        this.setState({exportedSource: undefined});
    },
    resetState() {
        this.setState(_.cloneDeep(initialState));
        this.startAppTransition(initialState.activeVariant, 'reset-transition', 750);
    }
});

module.exports = App;
