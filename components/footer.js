var React = require('react');
var files = require('../files');

var Footer = React.createClass({
    render() {
        var {footer, ul, li} = React.DOM;
        var {onClick} = this;
        var {setActiveFile, setParsedSource} = this.props;

        return footer(null,
            ul({className: 'nav'},
               Site({title: 'About', onClick: () => {
                   setActiveFile('about');
                   setParsedSource(files.about.parsedSource);
               }}),
              Site({title: 'GitHub'}),
              Site({title: 'Donate'})));
    },
    onClick() {
        console.log('onClick');
    }
});

var Site = React.createClass({
    render() {
        var {li} = React.DOM;
        var {onClick, title} = this.props;

        return li({onClick}, title);
    }
});

module.exports = Footer;
