var React = require('react');
var Vim = require('./vim');
var {merge} = require('../utils');

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
            onChange: this.onChange,
            className: 'paste',
            placeholder: 'Paste output of `:TOhtml` here.',
            value: ''});
    },
    onChange(e) {
        this.props.parse(e.target.value);
    }
});

module.exports = Left;
