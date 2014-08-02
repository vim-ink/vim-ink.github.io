var React = require('react');
var {transitionFast} = require('../actions/transition');
var {merge} = require('../actions/utils');

var Right = React.createClass({
    render() {
        var children;

        if (this.props.activePane !== 'global') {
            children = [
                SelectedGroup(merge(this.props, {key: 0, firstSection: true})),
                Colors(merge(this.props, {key: 1})),
                Highlight(merge(this.props, {key: 2})),
                PostProcess(merge(this.props, {key: 3})),
                ModifiedGroups(merge(this.props, {key: 4}))];
        } else {
            children = [
                Export(merge(this.props, {key: 0, firstSection: true})),
                Components(merge(this.props, {key: 1})),
                DangerZone(merge(this.props, {key: 2}))];
        }

        return React.DOM.aside({key: 'aside', children});
    }
});

var SelectedGroup = React.createClass({
    render() {
        var {selectedGroup, hoverGroup} = this.props;

        var className = 'line selected-group-line';
        var content = (hoverGroup !== undefined && hoverGroup !== selectedGroup ?
            hoverGroup : null);

        return Section(merge(this.props, {
            id: 'selectedGroup',
            title: 'Selected group'}),
            React.DOM.div({key: 'selectedGroup', className},
                React.DOM.span({key: 'left', className: 'left'}, selectedGroup),
                React.DOM.span({key: 'right', className: 'right'}, content)));
    }
});

var Colors = React.createClass({
    render() {
        var group = this.props.getGroup(this.props.selectedGroup);
        var normal = this.props.getGroup('Normal');

        return Section(merge(this.props, {
            id: 'color',
            title: 'Color'}),
            Color({
                key: 'foregroundColor',
                pageBackgroundColor: this.props.activeVariant === 'light' ? '#ffffff' : '#000000',
                id: 'foregroundColor',
                activeId: 'foreground',
                active: this.props.activeColor === 'foreground',
                prop: 'color',
                accessKey: 'f',
                value: group.color !== undefined ? group.color : normal.color,
                color: group.color,
                label: 'Foreground',
                deleteSelectedGroupProp: this.props.deleteSelectedGroupProp,
                resetSelectedGroupProp: this.props.resetSelectedGroupProp,
                setActiveColor: this.props.setActiveColor,
                setSelectedGroupProps: this.props.setSelectedGroupProps
            }),
            Color({
                key: 'backgroundColor',
                pageBackgroundColor: this.props.activeVariant === 'light' ? '#ffffff' : '#000000',
                id: 'backgroundColor',
                activeId: 'background',
                active: this.props.activeColor === 'background',
                prop: 'backgroundColor',
                accessKey: 'b',
                value: group.backgroundColor !== undefined ? group.backgroundColor : normal.backgroundColor,
                color: group.backgroundColor,
                label: 'Background',
                deleteSelectedGroupProp: this.props.deleteSelectedGroupProp,
                resetSelectedGroupProp: this.props.resetSelectedGroupProp,
                setActiveColor: this.props.setActiveColor,
                setSelectedGroupProps: this.props.setSelectedGroupProps
            }));
    }
});

var Color = React.createClass({
    render() {
        return React.DOM.div({key: 'colorLine', className: 'line color-line'},
            React.DOM.div({key: 'left', className: 'left'},
                React.DOM.input({
                    key: this.props.id,
                    type: 'color',
                    id: this.props.id,
                    accessKey: this.props.accessKey,
                    value: this.props.value,
                    onClick: this.onClick,
                    onChange: this.onChange
                }),
                ColorOverlay({
                    key: 'overlay',
                    value: this.props.color,
                    pageBackgroundColor: this.props.pageBackgroundColor})),
            React.DOM.div({
                key: 'right',
                className: 'right' + (this.props.active === true ? ' active' : '')},
                React.DOM.label({
                    key: 'label',
                    htmlFor: this.props.id},
                    this.props.label)));
    },
    onChange(e) {
        var props = {};
        props[this.props.prop] = e.target.value;
        this.props.setSelectedGroupProps(props);
    },
    onClick(e) {
        this.props.setActiveColor(this.props.activeId);

        if (e.shiftKey === true) {
            this.props.deleteSelectedGroupProp(this.props.prop);
            e.preventDefault();
        } else if (e.altKey === true) {
            this.props.resetSelectedGroupProp(this.props.prop);
            e.preventDefault();
        }
    },
});

var ColorOverlay = React.createClass({
    render() {
        return React.DOM.div({
            key: 'overlay',
            className: this.className(),
            style: this.style()});
    },
    className() {
        var className = 'color-overlay';

        if (this.props.value === undefined) {
            return className + ' none';
        } else if (this.props.value === this.props.pageBackgroundColor) {
             return className + ' border';
        } else {
            return className;
        }
    },
    style() {
        return (this.props.value === undefined ?
            {} : {backgroundColor: this.props.value});
    }
});

var Highlight = React.createClass({
    render() {
        var button = (args) => HighlightButton(merge(this.props, args));

        return Section(merge(this.props, {
            id: 'highlight',
            title: 'Highlight'}),
            React.DOM.div({key: 'line', className: 'line'},
                button({key: 'none', type: 'NONE', content: 'n'}),
                button({key: 'bold', type: 'bold', content: 'b'}),
                button({key: 'italic', type: 'italic', content: 'i'}),
                button({key: 'underline', type: 'underline', content: 'u'}),
                button({key: 'undercurl', type: 'undercurl', content: 'u'})),
            React.DOM.div({key: 'highlightLine2', className: 'line'},
                button({key: 'reverse', type: 'reverse', content: 'r'}),
                button({key: 'standout', type: 'standout', content: 's'})));
    }
});

var HighlightButton = React.createClass({
    render() {
        return React.DOM.button({
            key: 'button',
            className: this.className(this.props.type),
            onClick: this.onClick},
            React.DOM.span({key: 'span'}, this.props.content));
    },
    className(type) {
        var {getGroup, selectedGroup} = this.props;

        var selectedType = (getGroup(selectedGroup).highlight === undefined ?
            'NONE' : getGroup(selectedGroup).highlight);

        return 'highlight-button ' + type.toLowerCase() +
            (type === selectedType ? ' active' : '');
    },
    onClick(e) {
        if (e.shiftKey === true) {
            this.props.deleteSelectedGroupProp('highlight');
            e.preventDefault();
        } else if (e.altKey === true) {
            this.props.resetSelectedGroupProp('highlight');
            e.preventDefault();
        } else {
            this.props.setSelectedGroupProps({highlight: this.props.type});
        }
    }
});

var PostProcess = React.createClass({
    render() {
        var {brightness, saturation} = this.props.postProcess[this.props.activeVariant];
        var brightnessClassName = 'left' + (Number(brightness) === 0 ? ' inactive' : '');
        var saturationClassName = 'left' + (Number(saturation) === 0 ? ' inactive' : '');

        return Section(merge(this.props, {
            id: 'postProcess',
            title: 'Post process'}),
            React.DOM.div({key: 'brightness', className: 'line post-process-line'},
                React.DOM.div({key: 'left', className: brightnessClassName}, 'Brightness'),
                React.DOM.div({
                    key: 'right',
                    className: 'right',
                    onClick: this.onBrightnessClick},
                    React.DOM.input({
                        key: 'input',
                        type: 'range',
                        min: -0.25,
                        max: 0.25,
                        step: 0.025,
                        value: brightness,
                        onChange: this.onChangeBrightness}))),
            React.DOM.div({key: 'saturation', className: 'line post-process-line'},
                React.DOM.div({key: 'left', className: saturationClassName}, 'Saturation'),
                React.DOM.div({
                    key: 'right',
                    className: 'right',
                    onClick: this.onSaturationClick},
                    React.DOM.input({
                        key: 'input',
                        type: 'range',
                        min: -1.0,
                        max: 1.0,
                        step: 0.1,
                        value: saturation,
                        onChange: this.onChangeSaturation}))));
    },
    onChangeBrightness(e) {
        this.props.setPostProcessProps({brightness: e.target.value});
    },
    onChangeSaturation(e) {
        this.props.setPostProcessProps({saturation: e.target.value});
    },
    onBrightnessClick(e) {
        if (e.shiftKey === true || e.altKey === true) {
            this.props.setPostProcessProps({brightness: 0});
        }
    },
    onSaturationClick(e) {
        if (e.shiftKey === true || e.altKey === true) {
            this.props.setPostProcessProps({saturation: 0});
        }
    }
});

var ModifiedGroups = React.createClass({
    render() {
        var modifiedGroups = this.props.getModifiedGroups();
        var groups = (modifiedGroups.length === 0 ? [null] : modifiedGroups);
        var children = groups.map((group, index) => {
            return ModifiedGroup({
                key: index,
                group,
                resetGroup: this.props.resetGroup})
        });

        return Section(merge(this.props, {
            id: 'modifiedGroups',
            title: 'Modified groups',
            children}));
    }
});

var ModifiedGroup = React.createClass({
    render() {
        var group;
        var resetButton;

        if (this.props.group === null) {
            group = 'None';
            resetButton = null;
        } else {
            group = this.props.group;
            resetButton = React.DOM.button({
                key: 'resetButton',
                className: 'small-button',
                onClick: this.onClick},
                'Reset');
        }

        return React.DOM.div({key: 'line', className: 'line button-line'},
            React.DOM.div({key: 'left', className: 'left'}, group),
            React.DOM.div({key: 'right', className: 'right'}, resetButton));
    },
    onClick() {
        this.props.resetGroup(this.props.group);
    }
});

var Export = React.createClass({
    render() {
        return Section(merge(this.props, {
            id: 'export_',
            title: 'Export'}),
            React.DOM.div({key: 'inputLine', className: 'line export-line-input'},
                React.DOM.div({key: 'left', className: 'left'},
                    React.DOM.label({key: 'name'}, 'Name')),
                React.DOM.div({key: 'right', className: 'right'},
                    React.DOM.input({
                        key: 'text',
                        type: 'text',
                        value: this.props.exportName,
                        onChange: this.onChange}))),
            React.DOM.div({key: 'buttonLine', className: 'line export-line-button'},
                React.DOM.button({
                    key: 'button',
                    className: 'button',
                    onClick: this.onExportClick},
                    'Export')));
    },
    onChange(e) {
        this.props.setExportName(e.target.value);
    },
    onExportClick() {
        this.props.exportColorScheme();
    }
});

var Components = React.createClass({
    render() {
        return Section(merge(this.props, {
            id: 'components',
            title: 'Components'}),
            Component({
                key: 'tabLine',
                setComponentVisibility: this.props.setComponentVisibility,
                label: 'Tab line',
                component: 'tabLine',
                visibility: this.props.componentsVisibility['tabLine']}),
            Component({
                key: 'lineNumbers',
                setComponentVisibility: this.props.setComponentVisibility,
                label: 'Line numbers',
                component: 'lineNumbers',
                visibility: this.props.componentsVisibility['lineNumbers']}),
            Component({
                key: 'statusLine',
                setComponentVisibility: this.props.setComponentVisibility,
                label: 'Status line',
                component: 'statusLine',
                visibility: this.props.componentsVisibility['statusLine']}));
    }
});

var Component = React.createClass({
    render() {
        var buttonText = (this.props.visibility === 'show' ? 'Hide' : 'Show');

        return React.DOM.div({key: 'line', className: 'line  button-line'},
            React.DOM.div({key: 'left', className: 'left'}, this.props.label),
            React.DOM.div({key: 'right', className: 'right'},
                React.DOM.button({
                    key: 'button',
                    className: 'small-button',
                    onClick: this.onClick},
                    buttonText)));
    },
    onClick() {
        var visibility = this.props.visibility === 'show' ? 'hide' : 'show';
        this.props.setComponentVisibility(this.props.component, visibility);
    }
});

var DangerZone = React.createClass({
    render() {
        return Section(merge(this.props, {
            id: 'dangerZone',
            title: 'Danger zone'}),
            React.DOM.div({key: 'line', className: 'line danger-zone-line'},
                React.DOM.button({
                    key: 'button',
                    className: 'button',
                    onClick: this.onResetClick},
                    'Reset')));
    },
    onResetClick() {
        this.props.resetState();
    }
});

var Section = React.createClass({
    render() {
        var className = ('firstSection' in this.props && this.props.firstSection === true ?
            'first' : null);

        var title = this.props.title;
        var icon = 'icon ' + (this.isExpanded() ? 'ion-ios7-minus-empty' : 'ion-ios7-plus-empty');

        var children = [
            React.DOM.h2({key: 'h2', onClick: this.onClick}, title, React.DOM.span({className: icon}))]
            .concat((this.isExpanded() === true ? this.props.children : []));

        return React.DOM.section({
            key: 'section',
            className,
            children});
    },
    isExpanded() {
        return (this.props.sectionsVisibility[this.props.id] === 'show');
    },
    onClick() {
        var toggledVisibility = (this.props.sectionsVisibility[this.props.id] === 'show' ?
            'hide' : 'show');

        this.props.setSectionVisibility(this.props.id, toggledVisibility);
    }
});

module.exports = Right;
