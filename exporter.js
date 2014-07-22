function exportGroup(name, props, defaultProps) {
    var str = ['hi', name];

    str.push('gui=' + ('highlight' in props ?
        props.highlight :
        defaultProps.highlight));
    str.push('guifg=' + ('color' in props ?
        props.color :
        defaultProps.color));
    str.push('guibg=' + ('backgroundColor' in props ?
        props.backgroundColor :
        defaultProps.backgroundColor));

    return str.join(' ');
}

function exportVariant(variant) {
    var reset = ['SpecialKey', 'NonText', 'Directory', 'ErrorMsg', 'IncSearch', 'Search', 'MoreMsg', 'ModeMsg', 'LineNr', 'CursorLineNr', 'Question', 'StatusLine', 'StatusLineNC', 'VertSplit', 'Title', 'Visual', 'VisualNOS', 'WarningMsg', 'WildMenu', 'Folded', 'FoldColumn', 'DiffAdd', 'DiffChange', 'DiffDelete', 'DiffText', 'SignColumn', 'Conceal', 'SpellBad', 'SpellCap', 'SpellRare', 'SpellLocal', 'Pmenu', 'PmenuSel', 'PmenuSbar', 'PmenuThumb', 'TabLine', 'TabLineSel', 'TabLineFill', 'CursorColumn', 'CursorLine', 'ColorColumn', 'Cursor', 'lCursor', 'MatchParen', 'Normal', 'Error', 'Comment', 'Constant', 'Special', 'Identifier', 'Statement', 'PreProc', 'Type', 'Underlined', 'Ignore', 'Todo', 'String', 'Boolean'];
    var str = [];
    var groups = variant;

    reset.forEach(resetGroup => {
        if (!(resetGroup in groups)) {
            groups[resetGroup] = {};
        }
    });

    for (var group in groups) {
        str.push('    ' + exportGroup(group, groups[group], groups['Normal']));
    }

    return str;
}

function exportColorScheme(state) {
    var {exportName} = state;

    var str = [].concat(
        ['hi clear',
        'syntax reset',
        'let g:colors_name = "' + exportName + '"',
        'if &background == "light"'],
        exportVariant(state.light),
        ['elseif &background == "dark"'],
        exportVariant(state.dark),
        ['endif']);

    return str.join('\n');
}

module.exports = exportColorScheme;
