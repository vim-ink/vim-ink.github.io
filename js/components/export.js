var React = require('react');

var Export = React.createClass({
    render() {
        return React.DOM.div({key: 'export', className: 'export'},
            React.DOM.h2({key: 'h2'}, 'Export'),
            React.DOM.p({key: 'p'},
                        'Copy text into a new vim buffer, then `:w ~/.vim/colors/' +
                            this.props.exportName +
                            '.vim` and `:colorscheme ' +
                            this.props.exportName
                        + '`.'),
            React.DOM.textarea({
                key: 'textarea',
                onKeyDown: this.onKeyDown,
                ref: 'exportedSource',
                value: this.props.exportedSource,
                readOnly: true}),
            React.DOM.button({
                key: 'button',
                type: 'submit',
                className: 'button',
                onClick: this.onClick},
                'Close'));
    },
    componentDidMount() {
        var textarea = this.refs.exportedSource.getDOMNode();
        textarea.select();
        textarea.focus();
    },
    onClick() {
        this.props.clearExportedSource();
    },
    onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
            this.props.clearExportedSource();
        }
    }
});

module.exports = Export;
