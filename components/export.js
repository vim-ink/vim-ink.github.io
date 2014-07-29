var React = require('react');

var Export = React.createClass({
    render() {
        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick} = this;

        return div({key: 'exportDialog', className: 'export dialog'},
            h2({key: 'h2'}, 'Export'),
            p({key: 'p'}, 'Copy text into a new vim buffer, then `:w ~/.vim/colors/' + this.props.exportName + '.vim` and `:colorscheme ' + this.props.exportName + '`.'),
            textarea({key: 'textarea', ref: 'exportedSource', value: this.props.exportedSource, readOnly: true}),
            button({key: 'button', className: 'button', onClick}, 'Close'));
    },
    componentDidMount() {
        this.refs.exportedSource.getDOMNode().select();
    },
    onClick() {
        this.props.clearExportedSource();
    }
});

module.exports = Export;
