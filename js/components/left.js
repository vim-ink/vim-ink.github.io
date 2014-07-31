var React = require('react');
var Vim = require('./vim');
var {merge} = require('../actions/utils');

var Left = React.createClass({
    render() {
        return React.DOM.article(
            {children: [
                Vim(merge(this.props, {key: 'vim'})),
                Paste(merge(this.props, {key: 'paste'}))]});
    }
});

var Paste = React.createClass({
    render() {
        if (this.props.parsedSource !== undefined)
            return null;

        return React.DOM.textarea({
            ref: 'pastedSource',
            onChange: this.onPaste,
            className: 'paste',
            placeholder: 'Paste output of `:TOhtml` here.',
            value: ''});
    },
    componentDidUpdate() {
        if (this.props.parsedSource !== undefined)
            return;

        var el = this.refs.pastedSource.getDOMNode();
        el.focus();
    },
    onPaste(e) {
        this.props.parseSource(e.target.value);
    }
});

module.exports = Left;
