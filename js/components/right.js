var React = require('react/addons');

var transition = React.addons.CSSTransitionGroup;
var transitionFast = children => transition({transitionName: 'fast'}, children);

var merge = (...args) => Object.assign({}, ...args);

var Right = React.createClass({
    render() {
        var children = [];

        if (this.props.activePane === 'global') {
            children = [
                Export(merge(this.props, {key: 0, firstSection: true})),
                Components(merge(this.props, {key: 1})),
                DangerZone(merge(this.props, {key: 2}))];
        } else {
            children = [
                SelectedGroup(merge(this.props, {key: 0, firstSection: true})),
                Colors(merge(this.props, {key: 1})),
                Highlight(merge(this.props, {key: 2})),
                PostProcess(merge(this.props, {key: 3})),
                ModifiedGroups(merge(this.props, {key: 4}))];
        }

        return React.DOM.aside({key: 'aside', children});
    }
});

var Section = React.createClass({
    render() {
        var className = ('firstSection' in this.props && this.props.firstSection === true ?
            'first' : null);

        var children = transitionFast([
            React.DOM.h2({key: 'h2', onClick: this.onClick}, this.props.title)]
            .concat((this.props.sectionsVisibility[this.props.id] === 'show' ? this.props.children : [])));

        return React.DOM.section({
            key: 'section',
            className,
            children});
    },
    onClick() {
        var toggledVisibility = (this.props.sectionsVisibility[this.props.id] === 'show' ?
            'hide' : 'show');

        this.props.setSectionVisibility(this.props.id, toggledVisibility);
    }
});

var SelectedGroup = React.createClass({
    render() {
        var {selectedGroup, hoverGroup, sectionsVisibility} = this.props;

        var className = 'line selected-group-line';
        var hoverGroupContent = (hoverGroup !== undefined && hoverGroup !== selectedGroup ?
            hoverGroup :
            null);

        return Section(merge(this.props, {
            id: 'selectedGroup',
            title: 'Selected group'}),
            React.DOM.div({key: 'selectedGroup', className},
                React.DOM.span({key: 'left', className: 'left'}, selectedGroup),
                React.DOM.span({key: 'right', className: 'right'}, hoverGroupContent)));
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
                label_: 'Foreground',
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
                label_: 'Background',
                deleteSelectedGroupProp: this.props.deleteSelectedGroupProp,
                resetSelectedGroupProp: this.props.resetSelectedGroupProp,
                setActiveColor: this.props.setActiveColor,
                setSelectedGroupProps: this.props.setSelectedGroupProps
            }));
    }
});

var Color = React.createClass({
    render() {
        var rightClassName = (this.props.active === true ? ' active' : '');

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
            React.DOM.div({key: 'right', className: 'right' + rightClassName},
                React.DOM.label({key: 'label', htmlFor: this.props.id}, this.props.label_)));
    },
    onChange(e) {
        var {prop} = this.props;
        var props = {};
        props[prop] = e.target.value;
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
        var {div} = React.DOM;
        var className = this.className();
        var style = this.style();

        return div({key: 'overlay', className, style});
    },
    className() {
        var {value, pageBackgroundColor} = this.props;
        var className = 'color-overlay';

        if (value === undefined) {
            return className + ' none';
        }
        else {
            if (value === pageBackgroundColor) {
                className += ' border';
            }

            return className;
        }
    },
    style() {
        var {value} = this.props;

        return (value === undefined ? {} : {backgroundColor: value});
    }
});

var Highlight = React.createClass({
    render() {
        var {div} = React.DOM;

        var button = (o) => HighlightButton(merge(this.props, o));

        return Section(merge(this.props, {
            id: 'highlight',
            title: 'Highlight'}),
            div({key: 'line', className: 'line'},
                button({key: 'none', type: 'NONE', content: 'n'}),
                button({key: 'bold', type: 'bold', content: 'b'}),
                button({key: 'italic', type: 'italic', content: 'i'}),
                button({key: 'underline', type: 'underline', content: 'u'}),
                button({key: 'undercurl', type: 'undercurl', content: 'u'})),
            div({key: 'highlightLine2', className: 'line'},
                button({key: 'reverse', type: 'reverse', content: 'r'}),
                button({key: 'standout', type: 'standout', content: 's'})));
    }
});

var HighlightButton = React.createClass({
    render() {
        var {button, span} = React.DOM;
        var {onClick} = this;
        var {type, content} = this.props;

        var className = this.className(type);

        return button({key: 'button', className, onClick}, span({key: 'span'}, content));
    },
    className(type) {
        var {getGroup, selectedGroup} = this.props;

        var selectedType = getGroup(selectedGroup).highlight === undefined ?
            'NONE' : getGroup(selectedGroup).highlight;

        return 'highlight-button ' + type.toLowerCase() +
            (type === selectedType ? ' active' : '');
    },
    onClick(e) {
        var {setSelectedGroupProps, type} = this.props;

        if (e.shiftKey === true) {
            this.props.deleteSelectedGroupProp('highlight');
            e.preventDefault();
        } else if (e.altKey === true) {
            this.props.resetSelectedGroupProp('highlight');
            e.preventDefault();
        } else {
            setSelectedGroupProps({highlight: type});
        }
    }
});

var PostProcess = React.createClass({
    render() {
        var {div, input} = React.DOM;
        var {postProcess, activeVariant} = this.props;
        var {onChangeBrightness, onChangeSaturation, onBrightnessClick, onSaturationClick} = this;

        var {brightness, saturation} = postProcess[activeVariant];
        var brightnessClassName = 'left' + (Number(brightness) === 0 ? ' inactive' : '');
        var saturationClassName = 'left' + (Number(saturation) === 0 ? ' inactive' : '');

        return Section(merge(this.props, {
            id: 'postProcess',
            title: 'Post process'}),
            div({key: 'brightness', className: 'line post-process-line'},
                div({key: 'left', className: brightnessClassName}, 'Brightness'),
                div({key: 'right', className: 'right', onClick: onBrightnessClick}, input({
                    key: 'input',
                    type: 'range',
                    min: -0.25,
                    max: 0.25,
                    step: 0.025,
                    value: brightness,
                    onChange: onChangeBrightness}))),
            div({key: 'saturation', className: 'line post-process-line'},
                div({key: 'left', className: saturationClassName}, 'Saturation'),
                div({key: 'right', className: 'right', onClick: onSaturationClick}, input({
                    key: 'input',
                    type: 'range',
                    min: -1.0,
                    max: 1.0,
                    step: 0.1,
                    value: saturation,
                    onChange: onChangeSaturation}))));
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

var Components = React.createClass({
    render() {
        var {setComponentVisibility, componentsVisibility} = this.props;

        return Section(merge(this.props, {
            id: 'components',
            title: 'Components'}),
            Component({
                key: 'tabLine',
                setComponentVisibility,
                label: 'Tab line',
                component: 'tabLine',
                visibility: componentsVisibility['tabLine']}),
            Component({
                key: 'lineNumbers',
                setComponentVisibility,
                label: 'Line numbers',
                component: 'lineNumbers',
                visibility: componentsVisibility['lineNumbers']}),
            Component({
                key: 'statusLine',
                setComponentVisibility,
                label: 'Status line',
                component: 'statusLine',
                visibility: componentsVisibility['statusLine']}));
    }
});

var Component = React.createClass({
    render() {
        var {div, button} = React.DOM;
        var {onClick} = this;
        var {label, component, visibility} = this.props;

        var buttonText = visibility === 'show' ? 'Hide' : 'Show';

        return div({key: 'line', className: 'line  button-line'},
            div({key: 'left', className: 'left'}, label),
            div({key: 'right', className: 'right'},
                button({key: 'button', className: 'small-button', onClick},
                buttonText)));
    },
    onClick() {
        var visibility = this.props.visibility === 'show' ? 'hide' : 'show';
        this.props.setComponentVisibility(this.props.component, visibility);
    }
});

var ModifiedGroups = React.createClass({
    render() {
        var {div} = React.DOM;
        var {getModifiedGroups, resetGroup} = this.props;
        var groups = getModifiedGroups();

        var groups_ = groups.length === 0 ? ['none'] : groups;
        var children = groups_.map((group, index) => ModifiedGroup({key: index, group, resetGroup}));

        return Section(merge(this.props, {
            id: 'modifiedGroups',
            title: 'Modified groups'}),
            children);
    }
});

var ModifiedGroup = React.createClass({
    render() {
        var {div, button} = React.DOM;
        var {onClick} = this;
        var {group} = this.props;

        var displayGroup = (group !== 'none' ? group : 'None');
        var resetButton = (group !== 'none' ?
            button({key: 'resetButton', className: 'small-button', onClick}, 'Reset') :
            null);

        return div({key: 'line', className: 'line button-line'},
            div({key: 'left', className: 'left'}, displayGroup),
            div({key: 'right', className: 'right'}, resetButton));
    },
    onClick() {
        this.props.resetGroup(this.props.group);
    }
});

var Export = React.createClass({
    render() {
        var {div, label, input, button} = React.DOM;
        var {onExportClick, onChange} = this;
        var {exportName} = this.props;
        
        return Section(merge(this.props, {
            id: 'export_',
            title: 'Export'}),
            div({key: 'inputLine', className: 'line export-line-input'},
                div({key: 'left', className: 'left'},
                    label({key: 'name'}, 'Name')),
                div({key: 'right', className: 'right'},
                    input({key: 'text', className: 'text', value: exportName, onChange}))),
            div({key: 'buttonLine', className: 'line export-line-button'},
                button({key: 'button', className: 'button', onClick: onExportClick}, 'Export')));
    },
    onChange(e) {
        this.props.setExportName(e.target.value);
    },
    onExportClick() {
        this.props.exportColorScheme();
    }
});

var DangerZone = React.createClass({
    render() {
        var {section, h2, div, button} = React.DOM;
        var {onResetClick} = this;

        return Section(merge(this.props, {
            id: 'dangerZone',
            title: 'Danger zone'}),
            div({key: 'line', className: 'line danger-zone-line'},
                button({key: 'button', className: 'button', onClick: onResetClick}, 'Reset')));
    },
    onResetClick() {
        this.props.resetState();
    }
});

module.exports = Right;
