var React = require('react');
var files = require('../files');

var merge = (...args) => Object.assign({}, ...args);

var Header = React.createClass({
    render() {
        var {header, h1, div} = React.DOM;

        return header({key: 'header'},
            div({key: 'wrap', className: 'wrap cf'},
                h1({key: 'h1'}, 'vim.ink'),
                Files(merge(this.props, {key: 'files'})),
                Panes(merge(this.props, {key: 'panes'}))));
    }
});

var Files = React.createClass({
    render() {
        var {ul} = React.DOM;

        return ul({key: 'nav', className: 'nav files'},
            FileLink(merge(this.props, {
                key: 'javascript',
                type: 'javascript',
                title: 'JavaScript'
            })),
            FileLink(merge(this.props, {
                key: 'css',
                type: 'css',
                title: 'CSS'
            })),
            FileLink(merge(this.props, {
                key: 'html',
                type: 'html',
                title: 'HTML'
            })),
            FileLink(merge(this.props, {
                key: 'vim',
                type: 'vim',
                title: 'UI'
            })),
            PasteLink(merge(this.props, {key: 'pasteLink'})));
    }
});

var FileLink = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {key, title, type, activeFile} = this.props;

        var className = type === activeFile ? 'active' : '';

        return li({key: 'li', className, onClick}, title);
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
        var {key, activeFile} = this.props;

        var className = (activeFile === undefined ? ' active' : '');

        return li({key, className, onClick}, 'Paste');
    },
    onClick(e) {
        var {setParsedSource, setActiveFile} = this.props;
        setParsedSource(undefined);
        setActiveFile(undefined);
    }
});

var Panes = React.createClass({
    render() {
        var {ul, li} = React.DOM;
        var {activePane, setActivePane} = this.props;

        return ul({key: 'nav', className: 'nav panes'},
            Pane(merge(this.props, {key: 'light', id: 'light'}), 'Light'),
            Pane(merge(this.props, {key: 'dark', id: 'dark'}), 'Dark'),
            Pane(merge(this.props, {key: 'global', id: 'global', additionalClassName: 'right-link'}), 'Global'));
    }
});

var Pane = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {children, additionalClassName, activePane, id} = this.props;

        var className = (additionalClassName !== undefined ? additionalClassName : '') +
            (activePane ===  id ? ' active' : '');

        return li({key: 'li', className, onClick}, children);
    },
    onClick() {
        var {setActivePane, setActiveVariant, id} = this.props;

        setActivePane(id);

        if (id !== 'global') {
            setActiveVariant(id);
        }
    }
});

module.exports = Header;
