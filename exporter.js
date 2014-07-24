var Color = require('color');

function postProcessColor(color, postProcess) {
    var {brightness, saturation} = postProcess;

    return Color(color)
        .lighten(brightness)
        .saturate(saturation)
        .hexString()
        .toLowerCase();
}

function exportGroup(name, props, postProcess) {
    var str = ['hi', name];

    str.push('gui=' + ('highlight' in props ?  props.highlight : 'NONE'));
    str.push('guifg=' + ('color' in props ?  postProcessColor(props.color, postProcess) : 'NONE'));
    str.push('guibg=' + ('backgroundColor' in props ?  postProcessColor(props.backgroundColor, postProcess) : 'NONE'));

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
    var {exportName, postProcess} = state;

    var str = [].concat(
        ['hi clear',
        'syntax reset',
        'let g:colors_name = "' + exportName + '"',
        'if &background == "light"'],
        exportVariant(state.light, postProcess.light),
        ['elseif &background == "dark"'],
        exportVariant(state.dark, postProcess.dark),
        ['endif']);

    return str.join('\n');
}

module.exports = exportColorScheme;
