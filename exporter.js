function exportColorscheme() {
    var reset = ['SpecialKey', 'NonText', 'Directory', 'ErrorMsg', 'IncSearch', 'Search', 'MoreMsg', 'ModeMsg', 'LineNr', 'CursorLineNr', 'Question', 'StatusLine', 'StatusLineNC', 'VertSplit', 'Title', 'Visual', 'VisualNOS', 'WarningMsg', 'WildMenu', 'Folded', 'FoldColumn', 'DiffAdd', 'DiffChange', 'DiffDelete', 'DiffText', 'SignColumn', 'Conceal', 'SpellBad', 'SpellCap', 'SpellRare', 'SpellLocal', 'Pmenu', 'PmenuSel', 'PmenuSbar', 'PmenuThumb', 'TabLine', 'TabLineSel', 'TabLineFill', 'CursorColumn', 'CursorLine', 'ColorColumn', 'Cursor', 'lCursor', 'MatchParen', 'Normal', 'Error', 'Comment', 'Constant', 'Special', 'Identifier', 'Statement', 'PreProc', 'Type', 'Underlined', 'Ignore', 'Todo', 'String', 'Boolean']

    var str = ['hi clear', 'syntax reset'];

    for (var group in data.colors) {
        str.push('hi ' + group + ' guifg=' + data.colors[group]);
    }

    for (var group in data.backgroundColors) {
        str.push('hi ' + group + ' guibg=' + data.backgroundColors[group]);
    }

    reset.forEach((group) => {
        str.push('hi ' + group + ' gui=NONE');

        if (data.colors.hasOwnProperty(group) === false) {
            if (group !== 'Cursor' && group !== 'Visual') {
                str.push('hi ' + group + ' guifg=' + data.colors['Normal']);
            } else {
                str.push('hi ' + group + ' guifg=' + data.backgroundColors['Normal']);
            }
        }

        if (data.backgroundColors.hasOwnProperty(group) === false) {
            if (group !== 'Cursor' && group !== 'Visual') {
                str.push('hi ' + group + ' guibg=' + data.backgroundColors['Normal']);
            } else {
                str.push('hi ' + group + ' guifg=' + data.colors['Normal']);
            }
        }
    });

    return str.join('\n');
}

module.exports = {
    exportColorscheme
}