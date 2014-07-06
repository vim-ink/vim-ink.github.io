var data = {
    parsedSource: undefined,
    selectedGroup: 'Normal',
    colors: {'Normal': '#000000'},
    backgroundColors: {'Normal': '#ffffff'}
};

function getColorPair(group) {
    return {
        color: group in data.colors ?
            data.colors[group] :
            data.colors['Normal'],
        backgroundColor: group in data.backgroundColors ?
            data.backgroundColors[group] :
            data.backgroundColors['Normal'],
    };
}

module.exports = {
    data,
    getColorPair
}
