var React = require('react');
var files = require('../files');
var _ = require('lodash');

var Vim = require('./vim');

var Left = React.createClass({
    render() {
        var {article} = React.DOM;
        var {activeFile,
            componentsVisibility,
            getGroupProps,
            parse,
            parsedSource,
            postProcess,
            selectGroup,
            setActiveFile,
            setHoverGroup,
            setParsedSource} = this.props;

        return article(null,
            Files({setParsedSource, setActiveFile, activeFile}),
            Vim({componentsVisibility, parsedSource, getGroupProps, selectGroup, setHoverGroup, postProcess}),
            Paste({parsedSource, parse}));
    }
});

var Files = React.createClass({
    render() {
        var {ul} = React.DOM;
        var {setParsedSource, activeFile, setActiveFile} = this.props;

        return ul({className: 'files'},
            FileLink({
                type: 'html',
                title: 'HTML',
                active: activeFile === 'html',
                setParsedSource,
                setActiveFile}),
            FileLink({
                type: 'css',
                title: 'CSS',
                active: activeFile === 'css',
                setParsedSource,
                setActiveFile}),
            FileLink({
                type: 'javascript',
                title: 'JavaScript',
                active: activeFile === 'javascript',
                setParsedSource,
                setActiveFile}),
            PasteLink({
                active: activeFile === undefined,
                setParsedSource, setActiveFile}));
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
        var {setParsedSource, setActiveFile, type} = this.props;
        setParsedSource(files[type].parsedSource);
        setActiveFile(type);
    }
});

var PasteLink = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {active} = this.props;
        var className = 'paste-link' + (active === true ? ' active' : '');

        return li({className, onClick}, 'Paste');
    },
    onClick(e) {
        var {setParsedSource, setActiveFile} = this.props;
        setParsedSource(undefined);
        setActiveFile(undefined);
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
