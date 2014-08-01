var _ = require('lodash');

function parse(input) {
    var htmlA = input.search(/<pre/) + 26;
    var htmlB = input.search(/<\/pre/);
    var html = input
        .substring(htmlA, htmlB)
        .replace(/<a href=".*?">/g, '')
        .replace(/<\/a>/g, '');

    var lines = html.split('\n');

    if (lines[lines.length - 1] === '') // Seems like this is always the case when pasting
        lines.pop();

    function parseLine(parsedLines, rest) {
        if (rest[0] === '<') {
            var groupA = rest.search('"') + 1;
            var groupB = groupA + rest.substring(groupA).search('"');
            var group = rest.substring(groupA, groupB);

            var contentA = groupB + 2;
            var contentB = contentA + rest.substring(contentA).search('<');
            var content = rest.substring(contentA, contentB);

            parsedLines.push({group: group, content: _.unescape(content)});

            var nextA = contentB + 7;

            if (nextA < rest.length) {
                return parseLine(parsedLines, rest.substring(nextA));
            } else {
                return parsedLines;
            }
        }
        else {
            var nextA = rest.search('<');

            if (nextA === -1) {
                parsedLines.push({group: undefined, content: _.unescape(rest)});
                return parsedLines;
            } else {
                parsedLines.push({group: undefined, content: _.unescape(rest.substring(0, nextA))});
                return parseLine(parsedLines, rest.substring(nextA));
            }
        }
    }

    return lines.map(function(line) {
        return parseLine([], line);
    });
}

module.exports = parse;
