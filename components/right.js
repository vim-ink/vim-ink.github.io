var React = require('react');

var Right = React.createClass({
    render() {
        var {aside} = React.DOM;

        return aside(null,
            Variant(this.props),
            SelectedGroup(this.props),
            Color(this.props),
            Highlight(this.props),
            PostProcess(this.props),
            ModifiedGroups(this.props),
            Components(this.props),
            Export(this.props),
            DangerZone(this.props));
    }
});

var Section = React.createClass({
    render() {
        var {section, h2} = React.DOM;
        var {onClick} = this;
        var {children, title, sectionsVisibility, id} = this.props;

        var children_ = sectionsVisibility[id] === 'show' ? children : null;

        return section(null, h2({onClick}, title), children_);
    },
    onClick() {
        var {setSectionVisibility, sectionsVisibility, id} = this.props;
        var toggledVisibility = sectionsVisibility[id] === 'show' ? 'hide' : 'show';

        setSectionVisibility(id, toggledVisibility);
    }
});

var Variant = React.createClass({
    render() {
        var {button} = React.DOM;
        var {onLightClick, onDarkClick} = this;
        var {activeVariant} = this.props;

        var lightClassName = 'switch-button light-button' + (activeVariant === 'light' ? ' active' : '');
        var darkClassName = 'switch-button dark-button' + (activeVariant === 'dark' ? ' active' : '');

        return Section(Object.assign({}, this.props, {
            id: 'variant',
            title: 'Variant'}),
            button({
                    onClick: onLightClick,
                    className: lightClassName
                },
                'Light'),
            button({
                    onClick: onDarkClick,
                    className: darkClassName
                },
                'Dark'));
    },
    onLightClick() {
        this.props.activateVariant('light');
    },
    onDarkClick() {
        this.props.activateVariant('dark');
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

        return Section(Object.assign({}, this.props, {
            id: 'selectedGroup',
            title: 'Selected group'}),
            div({className},
                span({className: 'left'}, selectedGroup),
                span({className: 'right'}, hoverGroupContent)));
    }
});

var Color = React.createClass({
    render() {
        var {div, input, label} = React.DOM;
        var {getGroupProps, selectedGroup, activeColor} = this.props;
        var {
            onBackgroundClick,
            onChangeBackgroundColor,
            onChangeColor,
            onForegroundClick
        } = this;

        var foregroundActive = activeColor === 'foreground' ? ' active' : '';
        var backgroundActive = activeColor === 'background' ? ' active' : '';

        var colorPair = getGroupProps(selectedGroup);

        return Section(Object.assign({}, this.props, {
            id: 'color',
            title: 'Color'}),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({
                        type: 'color',
                        id: 'foregroundColor',
                        accessKey: 'f',
                        value: colorPair.color,
                        onClick: onForegroundClick,
                        onChange: onChangeColor
                    }),
                    div({
                        className: 'color',
                        style: {backgroundColor: colorPair.color}})),
                div({className: 'right' + foregroundActive},
                    label({htmlFor: 'foregroundColor'}, 'Foreground'))),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({
                        type: 'color',
                        id: 'backgroundColor',
                        accessKey: 'b',
                        value: colorPair.backgroundColor,
                        onClick: onBackgroundClick,
                        onChange: onChangeBackgroundColor
                    }),
                    div({
                        className: 'color',
                        style: {backgroundColor: colorPair.backgroundColor}})),
                div({className: 'right' + backgroundActive},
                    label({htmlFor: 'backgroundColor'}, 'Background'))));
    },
    onChangeColor(e) {
        this.props.setSelectedGroupProps({color: e.target.value});
    },
    onChangeBackgroundColor(e) {
        this.props.setSelectedGroupProps({backgroundColor: e.target.value});
    },
    onForegroundClick(e) {
        this.props.setActiveColor('foreground');
    },
    onBackgroundClick(e) {
        this.props.setActiveColor('background');
    }
});

var Highlight = React.createClass({
    render() {
        var {div} = React.DOM;

        var button = (o) => HighlightButton(Object.assign({}, this.props, o));

        return Section(Object.assign({}, this.props, {
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
        var {getGroupProps, selectedGroup} = this.props;
        var {selectedType} = this.props;

        var selectedType = getGroupProps(selectedGroup).highlight;

        return 'highlight-button ' + type.toLowerCase() +
            (type === selectedType ? ' active' : '');
    },
    onClick(e) {
        var {setSelectedGroupProps, type} = this.props;

        setSelectedGroupProps({highlight: type})
    }
});

var PostProcess = React.createClass({
    render() {
        var {section, h2, div, input} = React.DOM;
        var {postProcess} = this.props;
        var {onChangeBrightness, onChangeSaturation} = this;

        var {brightness, saturation} = postProcess;
        var brightnessClassName = 'left' + (-brightness === 0 ? ' inactive' : '');
        var saturationClassName = 'left' + (-saturation === 0 ? ' inactive' : '');

        return Section(Object.assign({}, this.props, {
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
        var {div, button} = React.DOM;
        var {setComponentVisibility, componentsVisibility} = this.props;

        return Section(Object.assign({}, this.props, {
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

        return Section(Object.assign({}, this.props, {
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
        var {section, h2, div, label, input, button} = React.DOM;
        var {onExportClick} = this;
        
        return Section(Object.assign({}, this.props, {
            id: 'export_',
            title: 'Export'}),
            div({className: 'line export-line-input'},
                div({className: 'left'}, label(null, 'Name')),
                div({className: 'right'}, input({className: 'text', value: 'whatever'}))),
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

        return Section(Object.assign({}, this.props, {
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
