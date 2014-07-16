var React = require('react');

var Export = React.createClass({
    render() {
        var {div, button, p, h2, textarea} = React.DOM;
        var {onClick} = this;
        var {exportedSource} = this.props;

        var hiddenConditional = exportedSource === undefined ? 'hidden' : '';

        return div({className: 'export dialog ' + hiddenConditional},
            h2(null, 'Here is your color scheme!'),
            p(null, 'Copy the code below to clipboard and paste into a new vim buffer. Do `:w ~/.vim/colors/whatever.vim`, `:set background light`, and finally `:colorscheme whatever`.'),
            textarea({value: exportedSource, readOnly: true}),
            button({className: 'button', onClick}, 'Close'));
    },
    onClick() {
        this.props.clearExportedSource();
    }
});

module.exports = Export;
