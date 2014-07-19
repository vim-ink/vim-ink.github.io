var React = require('react');
var files = require('../files');
var _ = require('lodash');

var Vim = require('./vim');

var Left = React.createClass({
    render() {
        var {article} = React.DOM;
        var {
            activeFile,
            activeVariant,
            componentsVisibility,
            getGroupProps,
            parse,
            parsedSource,
            postProcess,
            selectGroup,
            setActiveFile,
            setHoverGroup,
            setParsedSource
        } = this.props;

        return article(null,
            Files({setParsedSource, setActiveFile, activeFile}),
            Vim({
                activeVariant,
                componentsVisibility,
                getGroupProps,
                parsedSource,
                postProcess,
                selectGroup,
                setHoverGroup
            }),
            Paste({parsedSource, parse}));
    }
});

var Files = React.createClass({
    render() {
        var {ul} = React.DOM;
        var {setParsedSource, activeFile, setActiveFile} = this.props;

        return ul({className: 'nav'},
            FileLink(Object.assign({}, this.props, {
                type: 'html',
                title: 'HTML'
            })),
            FileLink(Object.assign({}, this.props, {
                type: 'css',
                title: 'CSS'
            })),
            FileLink(Object.assign({}, this.props, {
                type: 'javascript',
                title: 'JavaScript'
            })),
            PasteLink(this.props));
    }
});

var FileLink = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {title, type, activeFile} = this.props;

        var className = type === activeFile ? 'active' : '';

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
        var {activeFile} = this.props;

        var className = 'right-link' + (activeFile === undefined ? ' active' : '');

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
