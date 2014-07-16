var React = require('react');

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

var Right = React.createClass({
    render() {
        var {aside, h2, p, div, input, label, button, span, ul, li} = React.DOM;
        var {onChangeColor,
            onChangeBackgroundColor,
            onExportClick,
            onResetClick} = this;
        var {getGroupProps, selectedGroup} = this.props;

        var colorPair = getGroupProps(selectedGroup);

        return aside(null,
            Variant(this.props),
            h2(null, 'Selected group'),
            div({className: 'line'},
                this.props.selectedGroup),
            h2(null, 'Color'),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({type: 'color', value: colorPair.color, onChange: onChangeColor}),
                    div({className: 'color'})),
                div({className: 'right'},
                    'Foreground')),
            div({className: 'line color-line'},
                div({className: 'left'},
                    input({type: 'color', value: colorPair.backgroundColor, onChange: onChangeBackgroundColor}),
                    div({className: 'color'})),
                div({className: 'right'},
                    'Background')),
            h2({className: 'collapsed'}, 'Highlight'),
            div({className: 'line'},
                button({className: 'highlight-button none'}, span(null, 'n')),
                button({className: 'highlight-button bold active'}, span(null, 'b')),
                button({className: 'highlight-button italic'}, span(null, 'i')),
                button({className: 'highlight-button underline'}, span(null, 'u')),
                button({className: 'highlight-button undercurl'}, span(null, 'u'))),
            div({className: 'line'},
                button({className: 'highlight-button reverse'}, span(null, 'r')),
                button({className: 'highlight-button standout'}, span(null, 's'))),
            h2({className: 'collapsed'}, 'Post process'),
            div({className: 'line post-process-line'},
                div({className: 'left'}, 'Brightness'),
                div({className: 'right'}, input({type: 'range', min: 1, max: 9}))),
            div({className: 'line post-process-line'},
                div({className: 'left'}, 'Contrast'),
                div({className: 'right'}, input({type: 'range', min: 1, max: 9}))),
            h2({className: 'collapsed'}, 'Parts'),
            div({className: 'line  button-line'},
                div({className: 'left'}, 'Tab line'),
                div({className: 'right'}, button({className: 'small-button'}, 'Show'))
            ),
            div({className: 'line button-line'},
                div({className: 'left'}, 'Status line'),
                div({className: 'right'}, button({className: 'small-button'}, 'Show'))
            ),
            h2({className: 'collapsed'}, 'Assigned groups'),
            div({className: 'line button-line'},
                div({className: 'left'}, 'Something'),
                div({className: 'right'}, button({className: 'small-button'}, 'Remove'))
            ),
            h2(null, 'Export'),
            div({className: 'line export-line-input'},
                div({className: 'left'}, label(null, 'Name')),
                div({className: 'right'}, input({className: 'text', value: 'whatever'}))),
            div({className: 'line export-line-button'},
                button({className: 'button', onClick: onExportClick}, 'Export')),
            h2({className: 'collapsed'}, 'Danger zone'),
            div({className: 'line danger-zone-line'},
                button({className: 'button', onClick: onResetClick}, 'Reset')));
    },
    onChangeColor(e) {
        this.props.setSelectedGroupProps({color: e.target.value});
    },
    onChangeBackgroundColor(e) {
        this.props.setSelectedGroupProps({backgroundColor: e.target.value});
    },
    onExportClick() {
        this.props.exportColorScheme();
    },
    onResetClick() {
        this.props.resetState();
    }
});

module.exports = Right;
