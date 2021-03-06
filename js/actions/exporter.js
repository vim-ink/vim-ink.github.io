var Color = require('color');

function postProcessColor(color, postProcess) {
    return Color(color)
        .lighten(postProcess.brightness)
        .saturate(postProcess.saturation)
        .hexString()
        .toLowerCase();
}

function exportGroup(name, props, postProcess) {
    var str = ['hi', name];

    str.push('gui=' + ('highlight' in props && props.highlight !== undefined ?
       props.highlight : 'NONE'));

    if ('highlight' in props && props.highlight === 'undercurl') {
        str.push('guisp=NONE');
    }

    str.push('guifg=' + ('color' in props && props.color !== undefined ?
        postProcessColor(props.color, postProcess) : 'NONE'));
    str.push('guibg=' + ('backgroundColor' in props && props.backgroundColor !== undefined ?
        postProcessColor(props.backgroundColor, postProcess) : 'NONE'));

    return str.join(' ');
}

function exportVariant(variant, postProcess) {
    var reset = ['SpecialKey', 'NonText', 'Directory', 'ErrorMsg', 'IncSearch', 'Search', 'MoreMsg', 'ModeMsg', 'LineNr', 'CursorLineNr', 'Question', 'StatusLine', 'StatusLineNC', 'VertSplit', 'Title', 'Visual', 'VisualNOS', 'WarningMsg', 'WildMenu', 'Folded', 'FoldColumn', 'DiffAdd', 'DiffChange', 'DiffDelete', 'DiffText', 'SignColumn', 'Conceal', 'SpellBad', 'SpellCap', 'SpellRare', 'SpellLocal', 'Pmenu', 'PmenuSel', 'PmenuSbar', 'PmenuThumb', 'TabLine', 'TabLineSel', 'TabLineFill', 'CursorColumn', 'CursorLine', 'ColorColumn', 'Cursor', 'lCursor', 'MatchParen', 'Normal', 'Error', 'Comment', 'Constant', 'Special', 'Identifier', 'Statement', 'PreProc', 'Type', 'Underlined', 'Ignore', 'Todo', 'String', 'Boolean'];
    var str = [];
    var groups = variant;

    reset.forEach(resetGroup => {
        if (!(resetGroup in groups)) {
            groups[resetGroup] = {};
        }
    });

    for (var group in groups) {
        str.push('    ' + exportGroup(group, groups[group], postProcess));
    }

    return str;
}

function exportColorScheme(state) {
    var str = [].concat(
        ['hi clear',
        'syntax reset',
        'let g:colors_name = "' + state.exportName + '"',
        'if &background == "light"'],
        exportVariant(state.light, state.postProcess.light),
        ['elseif &background == "dark"'],
        exportVariant(state.dark, state.postProcess.dark),
        ['endif']);

    return str.join('\n');
}

module.exports = exportColorScheme;
