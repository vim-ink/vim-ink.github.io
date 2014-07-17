var React = require('react');
var files = require('../files');
var _ = require('lodash');

var Vim = require('./vim');

var Left = React.createClass({
    render() {
        var {article} = React.DOM;
        var {setParsedSource, parsedSource, componentsVisibility, parse, getGroupProps, selectGroup, postProcess} = this.props;

        return article(null,
            Files({setParsedSource}),
            Vim({componentsVisibility, parsedSource, getGroupProps, selectGroup, postProcess}),
            Paste({parsedSource, parse}));
    }
});

var Files = React.createClass({
    render() {
        var {ul} = React.DOM;
        var {setParsedSource} = this.props;

        return ul({className: 'files'},
            FileLink({type: 'html', title: 'HTML', active: true, setParsedSource}),
            FileLink({type: 'css', title: 'CSS', active: false, setParsedSource}),
            FileLink({type: 'javascript', title: 'JavaScript', active: false, setParsedSource}),
            PasteLink({active: false, setParsedSource}));
    }
});

var FileLink = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {title, active} = this.props;
        var className = active === true ? 'active' : '';

        return li({className, onClick}, title);
    },
    onClick(e) {
        var {setParsedSource, type} = this.props;
        setParsedSource(files[type].parsedSource);
    }
});

var PasteLink = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {active} = this.props;
        var className = 'paste-link' + (active === true ? 'active' : '');

        return li({className, onClick}, 'Paste');
    },
    onClick(e) {
        var {setParsedSource} = this.props;
        setParsedSource(undefined);
    }
});

var Paste = React.createClass({
    render() {
        var {textarea} = React.DOM;
        var {onChange} = this;
        var {parsedSource} = this.props;

        var className = (parsedSource !== undefined) ? 'hidden' : 'paste';

        return textarea({onChange, className, placeholder: 'Paste output of `:TOhtml` here.', value: ''});
    },
    onChange(e) {
        var {parse} = this.props;

        parse(e.target.value);
    }
});

module.exports = Left;
