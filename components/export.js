var React = require('react');

var Export = React.createClass({
    render() {
        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick} = this;
        var {exportedSource, exportName} = this.props;

        var hiddenConditional = exportedSource === undefined ? 'hidden' : '';

        return div({className: 'export dialog ' + hiddenConditional},
            h2(null, 'Export'),
            p(null, 'Copy text into a new vim buffer, then `:w ~/.vim/colors/' + exportName + '.vim` and `:colorscheme ' + exportName + '`.'),
            textarea({ref: 'exportedSource', value: exportedSource, readOnly: true}),
            button({className: 'button', onClick}, 'Close'));
    },
    componentDidUpdate() {
        this.refs.exportedSource.getDOMNode().select();
    },
    onClick() {
        this.props.clearExportedSource();
    }
});

module.exports = Export;
