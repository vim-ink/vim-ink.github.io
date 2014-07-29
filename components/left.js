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
            getGroup,
            parse,
            parsedSource,
            postProcess,
            selectGroup,
            setActiveFile,
            setHoverGroup,
            setParsedSource
        } = this.props;

        return article(null,
            // Files({setParsedSource, setActiveFile, activeFile}),
            Vim({
                activeVariant,
                componentsVisibility,
                getGroup,
                parsedSource,
                postProcess,
                selectGroup,
                setHoverGroup
            }),
            Paste({parsedSource, parse}));
    }
});

var Paste = React.createClass({
    render() {
        if (this.props.parsedSource !== undefined)
            return null;

        var {textarea} = React.DOM;
        var {onChange} = this;

        return textarea({onChange, className: 'paste', placeholder: 'Paste output of `:TOhtml` here.', value: ''});
    },
    onChange(e) {
        var {parse} = this.props;

        parse(e.target.value);
    }
});

module.exports = Left;
