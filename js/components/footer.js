var React = require('react');
var files = require('../constants/files');

var Footer = React.createClass({
    render() {
        var {footer, ul, li, a} = React.DOM;
        var {onClick} = this;
        var {setActiveFile, setParsedSource} = this.props;

        return footer(null,
            ul({className: 'nav'},
                li(null, a({onClick: () => {
                    setActiveFile('about');
                    setParsedSource(files.about.parsedSource);
                }}, 'About')),
                li(null, a({href: 'http://github.com/alexanderte'}, 'GitHub')),
                li(null, a({href: ''}, 'Donate'))));
    },
    onClick() {
        console.log('onClick');
    }
});

module.exports = Footer;
