var React = require('react');

var Footer = React.createClass({
    render() {
        var {footer, ul, li} = React.DOM;

        return footer(null,
            ul({className: 'nav'},
              li(null, 'FAQ'),
              li(null, 'GitHub'),
              li(null, 'Donate')));
    }
});

module.exports = Footer;
