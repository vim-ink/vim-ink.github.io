var React = require('react');
var files = require('../files');

var merge = (...args) => Object.assign({}, ...args);

var Header = React.createClass({
    render() {
        var {header, h1, div} = React.DOM;

        return header(null,
            div({className: 'wrap cf'},
            h1(null, 'vim.ink'),
            Files(this.props),
            Panes(this.props)));
    }
});

var Files = React.createClass({
    render() {
        var {ul} = React.DOM;

        return ul({className: 'nav files'},
            FileLink(Object.assign({}, this.props, {
                type: 'vim',
                title: 'Vim'
            })),
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

        var className = (activeFile === undefined ? ' active' : '');

        return li({className, onClick}, 'Paste');
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

        return ul({className: 'nav panes'},
            Pane(merge(this.props, {id: 'light'}), 'Light'),
            Pane(merge(this.props, {id: 'dark'}), 'Dark'),
            Pane(merge(this.props, {id: 'global', additionalClassName: 'right-link'}), 'Global'));
    }
});

var Pane = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick} = this;
        var {children, additionalClassName, activePane, id} = this.props;

        var className = (additionalClassName !== undefined ? additionalClassName : '') +
            (activePane ===  id ? ' active' : '');

        return li({className, onClick}, children);
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
