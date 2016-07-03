var React = require('react');
var ReactDom = require('react-dom');
var ReactGauge = require('../lib/react-gauge');

window.onload = function () {
    ReactDom.render(
        React.createElement(ReactGauge, {isInnerNumbers: false}),
        document.querySelector('.container1')  
    );
    
    ReactDom.render(
        React.createElement(ReactGauge, {isInnerNumbers: false, aperture: 180}),
        document.querySelector('.container2')  
    );
    
    
};
