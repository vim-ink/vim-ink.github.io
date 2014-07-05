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
                return parseLine(parsed, rest.substring(nextA));
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

    var output = '';
    parsedLines.forEach(function(line) {
        var htmlLine = [];
        line.forEach(function(bah) {
            if (typeof(bah) === 'object')
                htmlLine.push('<span class="' + bah.group + '">' + bah.content + '</span>');
            else
                htmlLine.push(bah);
        });
        output += htmlLine.join('') + '\n';
    });
    document.getElementById('output').innerHTML = output;
}
