var React = require('react');

var Export = React.createClass({
    render() {
        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick, onKeyDown} = this;

        return div({key: 'exportDialog', className: 'export dialog'},
            h2({key: 'h2'}, 'Export'),
            p({key: 'p'}, 'Copy text into a new vim buffer, then `:w ~/.vim/colors/' + this.props.exportName + '.vim` and `:colorscheme ' + this.props.exportName + '`.'),

            textarea({key: 'textarea', onKeyDown, ref: 'exportedSource', value: this.props.exportedSource, readOnly: true}),
            button({key: 'button', type: 'submit', className: 'button', onClick}, 'Close'));
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
