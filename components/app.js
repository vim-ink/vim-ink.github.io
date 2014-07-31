var _ = require('lodash');
var React = require('react/addons');
var Color = require('color');

var initialState = require('../initial-state');
var parse = require('../parser');
var exporter = require('../exporter');

var Header = require('./header');
var Left = require('./left');
var Right = require('./right');
var Footer = require('./footer');
var Export = require('./export');

var {merge} = require('../utils');
var transition = React.addons.CSSTransitionGroup;
var transitionFast = children => transition({transitionName: 'fast', children});

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
            selectGroup: this.selectGroup,
            setHoverGroup: this.setHoverGroup,
            setParsedSource: this.setParsedSource,
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
        var {activeVariant} = this.state;

        body.className = activeVariant + ' variant-transition';
        setTimeout(() => body.className = activeVariant, 500);
    },
    getGroup(group) {
        var groups =  this.state[this.state.activeVariant];

        return (group in groups ? groups[group] : {});
    },
    getStyle(group) {
        var {brightness, saturation} = this.state.postProcess[this.state.activeVariant];
        var normal = this.getGroup('Normal');
        var group_ = this.getGroup(group);

        var color = ('color' in group_ ?  group_.color : undefined);
        var backgroundColor = ('backgroundColor' in group_ ?  group_.backgroundColor : undefined);

        var style = {};

        switch (group_.highlight) {
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
    },
    getModifiedGroups() {
        // console.log(JSON.stringify(this.state.parsedSource));
        var initialGroups = initialState[this.state.activeVariant];
        var groups = this.state[this.state.activeVariant];

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
