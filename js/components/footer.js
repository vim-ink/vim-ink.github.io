var React = require('react');
var files = require('../constants/files');

var Footer = React.createClass({
    render() {
        return React.DOM.footer(null,
            React.DOM.ul({className: 'nav'},
                React.DOM.li(null,
                     React.DOM.a({onClick: () => {
                        this.props.setActiveFile('about');
                        this.props.setParsedSource(files.about.parsedSource);
                     }}, 'About')),
                React.DOM.li(null,
                     React.DOM.a({href: 'https://twitter.com/vim_ink'}, 'Twitter')),
                React.DOM.li(null,
                     React.DOM.a({href: 'https://github.com/vim-ink/vim-ink.github.io'}, 'GitHub')),
                React.DOM.li(null,
                     React.DOM.a({href: 'https://www.gittip.com/vim_ink/'}, 'Donate'))));
    }
});

module.exports = Footer;
