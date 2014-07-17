var React = require('react');

var Right = React.createClass({
    render() {
        var {aside} = React.DOM;

        return aside(null,
            Variant(this.props),
            SelectedGroup(this.props),
            Color(this.props),
            Highlight(this.props),
            ModifiedGroups(this.props),
            Components(this.props),
            PostProcess(this.props),
            Export(this.props),
            DangerZone(this.props));
    }
});

var Variant = React.createClass({
    render() {
        var {section, h2, button} = React.DOM;
        var {onLightClick, onDarkClick} = this;

        var lightActive = this.props.activeVariant === 'light' ? ' active' : '';
        var darkActive = this.props.activeVariant === 'dark' ? ' active' : '';

        return section({},
            h2(null, 'Variant'),
            button({onClick: onLightClick, className: 'switch-button light-button' + lightActive}, 'Light'),
            button({onClick: onDarkClick, className: 'switch-button dark-button' + darkActive}, 'Dark'));
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
        var {section, h2, div} = React.DOM;
        var {selectedGroup} = this.props;

        return section({},
            h2(null, 'Selected group'),
            div({className: 'line'}, selectedGroup))
    }
});

var Color = React.createClass({
    render() {
        var {section, h2, div, input, label} = React.DOM;
        var {getGroupProps, selectedGroup, activeColor} = this.props;
        var {onChangeColor, onChangeBackgroundColor, onBackgroundClick, onForegroundClick} = this;

        var foregroundActive = activeColor === 'foreground' ? ' active' : '';
        var backgroundActive = activeColor === 'background' ? ' active' : '';

        var colorPair = getGroupProps(selectedGroup);

        return section({},
            h2(null, 'Color'),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({
                        type: 'color',
                        id: 'foregroundColor',
                        accessKey: 'f',
                        value: colorPair.color,
                        onClick: onForegroundClick,
                        onChange: onChangeColor}),
                    div({className: 'color', style: {backgroundColor: colorPair.color}})),
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
                        onChange: onChangeBackgroundColor}),
                    div({className: 'color', style: {backgroundColor: colorPair.backgroundColor}})),
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
        var {section, h2, div} = React.DOM;
        var {button} = this;

        return section({},
            h2({className: 'collapsed'}, 'Highlight'),
            div({className: 'line'},
                HighlightButton(Object.assign({}, this.props, {type: 'NONE', content: 'n'})),
                HighlightButton(Object.assign({}, this.props, {type: 'bold', content: 'b'})),
                HighlightButton(Object.assign({}, this.props, {type: 'italic', content: 'i'})),
                HighlightButton(Object.assign({}, this.props, {type: 'underline', content: 'u'})),
                HighlightButton(Object.assign({}, this.props, {type: 'undercurl', content: 'u'}))),
            div({className: 'line'},
                HighlightButton(Object.assign({}, this.props, {type: 'reverse', content: 'r'})),
                HighlightButton(Object.assign({}, this.props, {type: 'standout', content: 's'}))));
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

        return section({},
            h2({className: 'collapsed'}, 'Post process'),
            div({className: 'line post-process-line'},
                div({className: 'left'}, 'Brightness'),
                div({className: 'right'}, input({
                    type: 'range',
                    min: -0.25,
                    max: 0.25,
                    step: 0.025,
                    value: brightness,
                    onChange: onChangeBrightness}))),
            div({className: 'line post-process-line'},
                div({className: 'left'}, 'Saturation'),
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
        var {section, h2, div, button} = React.DOM;
        var {setComponentVisibility, componentsVisibility} = this.props;

        return section(null,
            h2({className: 'collapsed'}, 'Components'),
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
        var {section, h2} = React.DOM;
        var {getModifiedGroups, resetGroup} = this.props;
        var groups = getModifiedGroups();

        if (groups.length === 0) {
            return section({});
        } else {
            return section({},
                h2({className: 'collapsed'}, 'Modified groups'),
                groups.map(group => ModifiedGroup({group, resetGroup})));
        }
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
        
        return section({},
            h2(null, 'Export'),
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

        return section({},
            h2({className: 'collapsed'}, 'Danger zone'),
            div({className: 'line danger-zone-line'},
                button({className: 'button', onClick: onResetClick}, 'Reset')));
    },
    onResetClick() {
        this.props.resetState();
    }
});

module.exports = Right;
