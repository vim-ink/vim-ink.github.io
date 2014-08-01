var cols = 94;

// spaces(4) returns '    '
var spaces = n => ' '.repeat(n);

// fill('foo', 8, '-')  returns 'foo-----'
// fill(' foo', 8, '-') returns ' foo----'
var fill = (str, totalWidth = cols, chr = ' ') => {
    return str + chr.repeat(totalWidth - str.length);
}

// merge({a: 'foo'}, {b: 'bar', c: 'baz'}) returns {a: 'foo', b: 'bar', c: 'baz'}
var merge = (...args) => Object.assign({}, ...args);

module.exports = {
    cols,
    spaces,
    fill,
    merge
};
