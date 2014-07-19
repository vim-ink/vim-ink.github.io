var React = require('react');
var merge = (...args) => Object.assign({}, ...args);

var Right = React.createClass({
    render() {
        var {aside} = React.DOM;
        var {activePane} = this.props;

        if (activePane === 'global') {
            return aside(null,
                Panes(this.props),
                Export(merge(this.props, {firstSection: true})),
                Components(this.props),
                DangerZone(this.props));
        }
        else {
            return aside(null,
                Panes(this.props),
                SelectedGroup(merge(this.props, {firstSection: true})),
                Color(this.props),
                Highlight(this.props),
                PostProcess(this.props),
                ModifiedGroups(this.props));
        }
    }
});

var Panes = React.createClass({
    render() {
        var {ul, li} = React.DOM;
        var {activePane, setActivePane} = this.props;

        return ul({className: 'nav'},
            Pane(merge(this.props, {id: 'light'}), 'Light'),
            Pane(merge(this.props, {id: 'dark'}), 'Dark'),
            Pane(merge(this.props, {id: 'global', additionalClassName: 'right-link'}), 'Global'));
    }
});

var Pane = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {children, additionalClassName, activePane, id} = this.props;

        var className = (additionalClassName !== undefined ? additionalClassName : '') +
            (activePane ===  id ? ' active' : '');

        return li({className, onClick}, children);
    },
    onClick() {
        var {setActivePane, setActiveVariant, id} = this.props;

        setActivePane(id);

        if (id !== 'global') {
            setActiveVariant(id);
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

        return Section(merge(this.props, {
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
        var {div, input} = React.DOM;
        var {postProcess, activeVariant} = this.props;
        var {onChangeBrightness, onChangeSaturation} = this;

        var {brightness, saturation} = postProcess[activeVariant];
        var brightnessClassName = 'left' + (-brightness === 0 ? ' inactive' : '');
        var saturationClassName = 'left' + (-saturation === 0 ? ' inactive' : '');

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
        
        return Section(merge(this.props, {
            id: 'export_',
            title: 'Export'}),
            div({className: 'line export-line-input'},
                div({className: 'left'}, label(null, 'Name')),
                div({className: 'right'}, input({className: 'text', value: 'whatever'}))),
            div({className: 'line export-line-button'},
                button({className: 'button', onClick: onExportClick}, 'Export')));
    },
    onExportClick() {
        console.log(this.props);
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
