var React = require('react');

var merge = (...args) => Object.assign({}, ...args);

var Right = React.createClass({
    render() {
        var {aside} = React.DOM;
        var {activePane} = this.props;

        if (activePane === 'global') {
            return aside(null,
                Export(merge(this.props, {firstSection: true})),
                Components(this.props),
                DangerZone(this.props));
        }
        else {
            return aside(null,
                SelectedGroup(merge(this.props, {firstSection: true})),
                Colors(this.props),
                Highlight(this.props),
                PostProcess(this.props),
                ModifiedGroups(this.props));
        }
    }
});

var Section = React.createClass({
    render() {
        var {section, h2} = React.DOM;
        var {onClick} = this;
        var {children, title, sectionsVisibility, id} = this.props;

        var className = 'firstSection' in this.props && this.props.firstSection === true ? 'first' : null;
        var children_ = sectionsVisibility[id] === 'show' ? children : null;

        return section({className}, h2({onClick}, title), children_);
    },
    onClick() {
        var {setSectionVisibility, sectionsVisibility, id} = this.props;
        var toggledVisibility = sectionsVisibility[id] === 'show' ? 'hide' : 'show';

        setSectionVisibility(id, toggledVisibility);
    }
});

var SelectedGroup = React.createClass({
    render() {
        var {div, span} = React.DOM;
        var {selectedGroup, hoverGroup, sectionsVisibility} = this.props;

        var className = 'line selected-group-line';
        var hoverGroupContent = (hoverGroup !== undefined && hoverGroup !== selectedGroup ?
            hoverGroup :
            null);

        return Section(merge(this.props, {
            id: 'selectedGroup',
            title: 'Selected group'}),
            div({className},
                span({className: 'left'}, selectedGroup),
                span({className: 'right'}, hoverGroupContent)));
    }
});

var Colors = React.createClass({
    render() {
        var {div, input, label} = React.DOM;
        var {
            activeColor,
            activeVariant,
            deleteSelectedGroupProp,
            getGroup,
            resetSelectedGroupProp,
            selectedGroup,
            setActiveColor,
            setSelectedGroupProps
        } = this.props;

        var group = getGroup(selectedGroup);

        return Section(merge(this.props, {
            id: 'color',
            title: 'Color'}),
            Color({
                pageBackgroundColor: activeVariant === 'light' ? '#ffffff' : '#000000',
                id: 'foregroundColor',
                activeId: 'foreground',
                active: activeColor === 'foreground',
                prop: 'color',
                accessKey: 'f',
                value: group.color,
                label_: 'Foreground',
                deleteSelectedGroupProp,
                resetSelectedGroupProp,
                setActiveColor,
                setSelectedGroupProps
            }),
            Color({
                pageBackgroundColor: activeVariant === 'light' ? '#ffffff' : '#000000',
                id: 'backgroundColor',
                activeId: 'background',
                active: activeColor === 'background',
                prop: 'backgroundColor',
                accessKey: 'b',
                value: group.backgroundColor,
                label_: 'Background',
                deleteSelectedGroupProp,
                resetSelectedGroupProp,
                setActiveColor,
                setSelectedGroupProps
            }));
    }
});

var Color = React.createClass({
    render() {
        var {div, input, label} = React.DOM;
        var {id, accessKey, value, label_, active, pageBackgroundColor} = this.props;
        var {onChange, onClick} = this;

        var rightClassName = (active === true ? ' active' : '');

        return div({className: 'line color-line'},
            div({className: 'left'},
                input({
                    type: 'color',
                    id,
                    accessKey,
                    value: value,
                    onClick: onClick,
                    onChange: onChange
                }),
                ColorOverlay({value, pageBackgroundColor})),
            div({className: 'right' + rightClassName},
                label({htmlFor: id}, label_)));
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

        return div({className, style});
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
            div({className: 'line'},
                button({type: 'NONE', content: 'n'}),
                button({type: 'bold', content: 'b'}),
                button({type: 'italic', content: 'i'}),
                button({type: 'underline', content: 'u'}),
                button({type: 'undercurl', content: 'u'})),
            div({className: 'line'},
                button({type: 'reverse', content: 'r'}),
                button({type: 'standout', content: 's'})));
    }
});

var HighlightButton = React.createClass({
    render() {
        var {button, span} = React.DOM;
        var {onClick} = this;
        var {type, content} = this.props;

        var className = this.className(type);

        return button({className, onClick}, span(null, content));
    },
    className(type) {
        var {getGroup, selectedGroup} = this.props;
        var {selectedType} = this.props;

        var selectedType = getGroup(selectedGroup).highlight;

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
        var {onChangeBrightness, onChangeSaturation} = this;

        var {brightness, saturation} = postProcess[activeVariant];
        var brightnessClassName = 'left' + (Number(brightness) === 0 ? ' inactive' : '');
        var saturationClassName = 'left' + (Number(saturation) === 0 ? ' inactive' : '');

        return Section(merge(this.props, {
            id: 'postProcess',
            title: 'Post process'}),
            div({className: 'line post-process-line'},
                div({className: brightnessClassName}, 'Brightness'),
                div({className: 'right'}, input({
                    type: 'range',
                    min: -0.25,
                    max: 0.25,
                    step: 0.025,
                    value: brightness,
                    onChange: onChangeBrightness}))),
            div({className: 'line post-process-line'},
                div({className: saturationClassName}, 'Saturation'),
                div({className: 'right'}, input({
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
    }
});

var Components = React.createClass({
    render() {
        var {setComponentVisibility, componentsVisibility} = this.props;

        return Section(merge(this.props, {
            id: 'components',
            title: 'Components'}),
            Component({
                setComponentVisibility,
                label: 'Tab line',
                component: 'tabLine',
                visibility: componentsVisibility['tabLine']}),
            Component({
                setComponentVisibility,
                label: 'Line numbers',
                component: 'lineNumbers',
                visibility: componentsVisibility['lineNumbers']}),
            Component({
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

        return div({className: 'line  button-line'},
            div({className: 'left'}, label),
            div({className: 'right'},
                button({className: 'small-button', onClick},
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

        var content = groups.length === 0 ? div({className: 'modified-groups-line none'}, 'None') :
            groups.map(group => ModifiedGroup({group, resetGroup}));

        return Section(merge(this.props, {
            id: 'modifiedGroups',
            title: 'Modified groups'}),
            content);
    }
});

var ModifiedGroup = React.createClass({
    render() {
        var {div, button} = React.DOM;
        var {onClick} = this;
        var {group} = this.props;

        return div({className: 'line button-line'},
            div({className: 'left'}, group),
            div({className: 'right'}, button({className: 'small-button', onClick}, 'Reset')));
    },
    onClick() {
        this.props.resetGroup(this.props.group);
    }
});

var Export = React.createClass({
    render() {
        var {div, label, input, button} = React.DOM;
        var {onExportClick} = this;
        var {exportName} = this.props;
        
        return Section(merge(this.props, {
            id: 'export_',
            title: 'Export'}),
            div({className: 'line export-line-input'},
                div({className: 'left'}, label(null, 'Name')),
                div({className: 'right'}, input({className: 'text', value: exportName}))),
            div({className: 'line export-line-button'},
                button({className: 'button', onClick: onExportClick}, 'Export')));
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
            div({className: 'line danger-zone-line'},
                button({className: 'button', onClick: onResetClick}, 'Reset')));
    },
    onResetClick() {
        this.props.resetState();
    }
});

module.exports = Right;
