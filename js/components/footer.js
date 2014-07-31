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
                     React.DOM.a({href: 'http://github.com/alexanderte'}, 'GitHub')),
                React.DOM.li(null,
                     React.DOM.a({href: ''}, 'Donate'))));
    }
});

module.exports = Footer;
