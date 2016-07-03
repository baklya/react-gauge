var React = require('react');
var ReactDom = require('react-dom');
var ReactGauge = require('../lib/react-gauge');

var App = React.createClass({
  displayName: 'App',

  render: function () {
    return (
        React.createElement(ReactGauge, {isInnerNumbers: false})
    );
  }
});


window.onload = function () {
    ReactDom.render(
        React.createElement(App),
        document.querySelector('.container')  
    );
};
