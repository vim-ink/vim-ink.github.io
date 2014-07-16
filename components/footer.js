var React = require('react');

var Footer = React.createClass({
    render() {
        var {footer, ul, li} = React.DOM;

        return footer(null,
            ul({className: 'nav'},
              li(null, 'About'),
              li(null, 'GitHub'),
              li(null, 'Gittip')));
    }
});

module.exports = Footer;
