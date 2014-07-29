require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react/addons');

var App = require('./components/app');

React.renderComponent(App(), document.body);
