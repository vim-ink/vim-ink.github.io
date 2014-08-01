var React = require('react/addons');

var transition = React.addons.CSSTransitionGroup;
var transitionFast = children => transition({transitionName: 'fast'}, children);

module.exports = {
    transitionFast
};
