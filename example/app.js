var React = require('react');
var ReactDom = require('react-dom');
var ReactGauge = require('../lib/react-gauge');

window.onload = function () {
    ReactDom.render(
        React.createElement(ReactGauge, {isInnerNumbers: false}),
        document.querySelector('.container1')  
    );
    
    ReactDom.render(
        React.createElement(ReactGauge, {
            isInnerNumbers: false, 
            aperture: 180, 
            arcStrokeWidth: 10,
            marks: ["а", "б", "в", "г", "д"],
        }),
        document.querySelector('.container2')  
    );
    
    ReactDom.render(
        React.createElement(ReactGauge, {isInnerNumbers: true, aperture: 240, radius: 110}),
        document.querySelector('.container3')  
    );

    var clock = ReactDom.render(
        React.createElement(ReactGauge, {
            isInnerNumbers: true, 
            radius: 150, 
            aperture: 0, 
            marks: [6, 7, 8, 9, 10, 11, 12, 1 , 2, 3, 4, 5, ""],
            ranges: [{
    			start: 0.00001,
    			end: 0.99999,
    			color: "#333"
    		}],
    		tickLength: 15,
    		miniTickLength: 7,
    		tickStrokeWidth: 4,
    		arcStrokeWidth: 10,
    		scaleDivisionNumber: 5,
    		tickLabelOffset: 20,
    		arrowValue: Math.floor(( new Date().getTime() / 1000 - 30 ) %  60) / 60
        }),
        document.querySelector('.container4')  
    );

    setInterval(function(){
        clock.setState({arrowValue: Math.floor(( new Date().getTime() / 1000 - 30 ) %  60) / 60});
    }, 100);
};
