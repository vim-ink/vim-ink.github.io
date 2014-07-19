var React = require('react');

var Export = React.createClass({
    render() {
        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick} = this;
        var {exportedSource} = this.props;

        var hiddenConditional = exportedSource === undefined ? 'hidden' : '';

        return div({className: 'export dialog ' + hiddenConditional},
            h2(null, 'Export'),
            p(null, 'Copy text into a new vim buffer, do `:w ~/.vim/colors/whatever.vim`, `:set background light`, and `:colorscheme whatever`.'),
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
