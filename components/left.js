var React = require('react');

var Vim = require('./vim');

var Paste = React.createClass({
    render() {
        var {textarea} = React.DOM;
        var {onChange} = this;
        var {parsedSource} = this.props;

        var className = (parsedSource !== undefined) ? 'hidden' : 'paste';

        return textarea({onChange, className, placeholder: 'Paste output of `:TOhtml` here.'});
    },
    onChange(e) {
        var {parse} = this.props;

        parse(e.target.value);
    }
});

var Files = React.createClass({
    render() {
        var {ul, li} = React.DOM;

        return ul({className: 'files'},
            li(null, 'HTML'),
            li({className: 'active'}, 'CSS'),
            li(null, 'JavaScript'),
            li(null, 'Python'),
            li(null, 'Ruby'),
            li(null, 'Go'),
            li(null, 'Rust'),
            li({className: 'paste-link'}, 'Paste'));
    }
});

var Left = React.createClass({
    render() {
        var {article} = React.DOM;
        var {parsedSource, parse, getGroupProps, selectGroup} = this.props;

        return article(null,
            Paste({
                parsedSource,
                parse}),
            Files(),
            Vim({
                parsedSource,
                getGroupProps,
                selectGroup}));
    }
});

module.exports = Left;
