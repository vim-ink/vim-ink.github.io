var React = require('react');

var Header = React.createClass({
    render() {
        var {header, h1} = React.DOM;

        return header(null, h1(null, 'vim.ink'));
    }
});

module.exports = Header;
