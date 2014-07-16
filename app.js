require('es6ify/node_modules/traceur/bin/traceur-runtime');
var React = require('react');

var parse = require('./vim-tohtml-parser').parse;
var exporter = require('./exporter');
var initialState = require('./initial-state');

var App = require('./components/app');

React.renderComponent(App({parse, exporter, initialState}), document.body);
