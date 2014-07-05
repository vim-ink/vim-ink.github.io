require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');

function parse(input) {
    var htmlA = input.search(/<pre/) + 26;
    var htmlB = input.search(/<\/pre/);
    var html = input
        .substring(htmlA, htmlB)
        .replace(/<a href=".*?">/g, '')
        .replace(/<\/a>/g, '');

    var lines = html.split('\n');

    function parseLine(parsedLines, rest) {
        if (rest[0] === '<') {
            var groupA = rest.search('"') + 1;
            var groupB = groupA + rest.substring(groupA).search('"');
            var group = rest.substring(groupA, groupB);

            var contentA = groupB + 2;
            var contentB = contentA + rest.substring(contentA).search('<');
            var content = rest.substring(contentA, contentB);

            parsedLines.push({group: group, content: content});

            var nextA = contentB + 7;

            if (nextA < rest.length) {
                return parseLine(parsedLines, rest.substring(nextA));
            }
            else {
                return parsedLines;
            }
        }
        else {
            var nextA = rest.search('<');
            if (nextA === -1) {
                parsedLines.push(rest);
                return parsedLines;
            }
            else {
                parsedLines.push(rest.substring(0, nextA));
                return parseLine(parsedLines, rest.substring(nextA));
            }
        }
    }

    return lines.map(function(line) {
        return parseLine([], line);
    });
}

function parsePastedCode() {
    var parsedLines = parse(document.getElementById('pastedCode').value);

    var output = parsedLines.map(function(line) {
        return line.map(function(segment) {
            return typeof(segment) === 'object' ?
                '<span class="' + segment.group + '">' + segment.content + '</span>' :
                segment;
        }).join('') + '\n';
    }).join('');

    document.getElementById('output').innerHTML = output;
}

var Root = React.createClass({
    render() {
        var {div, header, h1, textarea, button, pre} = React.DOM;
        return div(
            null,
            header(null, h1(null, 'vim-colorscheme-designer')),
            textarea({
                id: 'pastedCode',
                style: {width: '100%', height: '20em'}}),
            button({onClick: parsePastedCode}, 'Parse'),
            pre({id: 'output', style: {width: '100%', height: '20em'}}));
    }
});

React.renderComponent(Root(), document.body);
