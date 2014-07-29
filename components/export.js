var React = require('react');

var Export = React.createClass({
    render() {
        if (this.props.exportedSource === undefined)
            return null;

        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick} = this;
        var {exportedSource, exportName} = this.props;

        return div({className: 'export dialog'},
            h2(null, 'Export'),
            p(null, 'Copy text into a new vim buffer, then `:w ~/.vim/colors/' + exportName + '.vim` and `:colorscheme ' + exportName + '`.'),
            textarea({ref: 'exportedSource', value: exportedSource, readOnly: true}),
            button({className: 'button', onClick}, 'Close'));
    },
    componentDidUpdate() {
        if (this.refs.exportedSource === undefined) {
            return;
        } else {
            this.refs.exportedSource.getDOMNode().select();
        }
    },
    onClick() {
        this.props.clearExportedSource();
    }
});

module.exports = Export;
