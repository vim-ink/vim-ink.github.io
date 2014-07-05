require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');
var parse = require('./vim-tohtml-parser').parse;

var PastedCode = React.createClass({
    getInitialState() {
        return {show: true};
    },
    render() {
        var {div, textarea, button} = React.DOM;

        if (this.state.show === false) {
            return div(null, '');
        }

        return div(null,
            textarea({
                onChange: this.onChange,
                id: 'pastedCode',
                style: {width: '100%', height: '20em'}}),
            button({ onClick: this.onClick },
                'Parse'));
    },
    onChange(e) {
        this.setState({pastedSource: e.target.value});
    },
    onClick() {
        this.setState({show: false});
        this.props.parse(this.state.pastedSource);
    }
});

var Source = React.createClass({
    render() {
        var {pre} = React.DOM;
        return pre({id: 'output'});
    }
});

var Root = React.createClass({
    render() {
        var {parse} = this;
        var {div, header, h1, textarea, button} = React.DOM;
        return div(
            null,
            header(null, h1(null, 'vim-colorscheme-designer')),
            PastedCode({parse}),
            Source());
    },
    parse(input) {
        var parsedLines = parse(input);

        var output = parsedLines.map(function(line) {
            return line.map(function(segment) {
                return typeof(segment) === 'object' ?
                    '<span class="' + segment.group + '">' + segment.content + '</span>' :
                    segment;
            }).join('') + '\n';
        }).join('');

        document.getElementById('output').innerHTML = output;
    }
});

React.renderComponent(Root(), document.body);
