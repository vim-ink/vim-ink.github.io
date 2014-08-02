var React = require('react');
var files = require('../constants/files');
var {merge} = require('../actions/utils');

var Header = React.createClass({
    render() {
        return React.DOM.header({key: 'header'},
            React.DOM.div({key: 'wrap', className: 'wrap clear-fix'},
                React.DOM.h1({key: 'h1'}, 'vim.ink'),
                Files(merge(this.props, {key: 'files'})),
                Panes(merge(this.props, {key: 'panes'}))));
    }
});

var Files = React.createClass({
    render() {
        return React.DOM.ul({
            key: 'nav',
            className: 'nav files'},
            FileLink(merge(this.props, {
                key: 'html',
                type: 'html',
                title: 'HTML'
            })),
            FileLink(merge(this.props, {
                key: 'css',
                type: 'css',
                title: 'CSS'
            })),
            FileLink(merge(this.props, {
                key: 'javascript',
                type: 'javascript',
                title: 'JavaScript'
            })),
            FileLink(merge(this.props, {
                key: 'c',
                type: 'c',
                title: 'C'
            })),
            FileLink(merge(this.props, {
                key: 'java',
                type: 'java',
                title: 'Java'
            })),
            FileLink(merge(this.props, {
                key: 'editor',
                type: 'editor',
                title: 'Editor'
            })),
            FileLink(merge(this.props, {
                key: 'ui',
                type: 'ui',
                title: 'UI'
            })),
            PasteLink(merge(this.props, {
                key: 'pasteLink'
            })));
    }
});

var FileLink = React.createClass({
    render() {
        return React.DOM.li({
            key: 'li',
            className: (this.props.type === this.props.activeFile ? 'active' : '')},
            React.DOM.a({onClick: this.onClick}, this.props.title));
    },
    onClick(e) {
        this.props.setParsedSource(files[this.props.type].parsedSource);
        this.props.setActiveFile(this.props.type);
    }
});

var PasteLink = React.createClass({
    render() {
        return React.DOM.li({
            key: 'li',
            className: (this.props.activeFile === undefined ? ' active' : '')},
            React.DOM.a({onClick: this.onClick}, 'Paste'));
    },
    onClick(e) {
        this.props.setParsedSource(undefined);
        this.props.setActiveFile(undefined);
    }
});

var Panes = React.createClass({
    render() {
        return React.DOM.ul({key: 'nav', className: 'nav panes'},
            Pane(merge(this.props, {key: 'light', id: 'light'}), 'Light'),
            Pane(merge(this.props, {key: 'dark', id: 'dark'}), 'Dark'),
            Pane(merge(this.props, {key: 'global', id: 'global', additionalClass: 'right-link'}), 'Global'));
    }
});

var Pane = React.createClass({
    render() {
        var className = (this.props.additionalClass !== undefined ? this.props.additionalClass : '') +
            (this.props.activePane ===  this.props.id ? ' active' : '');

        return React.DOM.li({
            key: 'li',
            className,
            onClick: this.onClick},
            React.DOM.a({onClick: this.onClick, children: this.props.children}));
    },
    onClick() {
        this.props.setActivePane(this.props.id);

        if (this.props.id !== 'global') {
            this.props.setActiveVariant(this.props.id);
        }
    }
});

module.exports = Header;
