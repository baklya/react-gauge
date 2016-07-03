var React = require('react');
var ReactDom = require('react-dom');
var ReactGauge = require('../lib/react-gauge');

window.onload = function () {
    ReactDom.render(
        React.createElement(ReactGauge, {
            isInnerNumbers: false,
            arrowValue: 4/6
        }),
        document.querySelector('.container1')  
    );
    
    ReactDom.render(
        React.createElement(ReactGauge, {
            isInnerNumbers: false, 
            aperture: 180, 
            arcStrokeWidth: 10,
            marks: ["r", "a", "i", "n", "b", "o", "w"],
            svgContainerHeight: 250,
            ranges: [{
    			start: 0,
    			end: 1/7,
    			color: "#f00"
    		},
    		{
    			start: 1/7,
    			end: 2/7,
    			color: "#ff7f00"
    		},
    		{
    			start: 2/7,
    			end: 3/7,
    			color: "#ffff00"
    		},
    		{
    			start: 3/7,
    			end: 4/7,
    			color: "#00bc3f"
    		},
    		{
    			start: 4/7,
    			end: 5/7,
    			color: "#0068ff"
    		},
    		{
    			start: 5/7,
    			end: 6/7,
    			color: "#7a00e5"
    		},
    		{
    			start: 6/7,
    			end: 1,
    			color: "#bc31fe"
    		}]
        }),
        document.querySelector('.container2')  
    );
    
    ReactDom.render(
        React.createElement(ReactGauge, {
            isInnerNumbers: true, 
            aperture: 240, 
            radius: 110,
            contentWidth: 250,
            svgContainerWidth: 350,
            svgContainerHeight: 180
            
        }),
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
    		arrowValue: Math.floor(( new Date().getTime() / 1000 - 30 ) %  60) / 60,
    		contentWidth: 400,
            svgContainerWidth: 400,
            svgContainerHeight: 400
        }),
        document.querySelector('.container4')  
    );

    setInterval(function(){
       // clock.setState({arrowValue: Math.floor(( new Date().getTime() / 1000 - 30 ) %  60) / 60});
    }, 100);
};
