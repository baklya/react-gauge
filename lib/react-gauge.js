var ReactGauge = React.createClass({
  displayName: 'ReactGauge',


  getInitialState: function () {
    return {
		radius: this.props.radius,
		arcStrokeWidth: this.props.arcStrokeWidth,
		tickOffset: this.props.tickOffset,
		tickStrokeWidth: this.props.tickStrokeWidth,
		tickLength: this.props.tickLength,
		miniTickLength: this.props.tickLength,
		miniTickStrokeWidth: this.props.miniTickStrokeWidth,
		scaleDivisionNumber: this.props.scaleDivisionNumber,
		tickLabelOffset: this.props.tickLabelOffset,
		centralCircleRadius: this.props.centralCircleRadius,
    	isInnerNumbers: this.props.isInnerNumbers
    }
  },

  getDefaultProps: function () {
    return {
    	radius: 175,
    	arcStrokeWidth: 3,
		tickOffset: 7,
    	tickStrokeWidth: 2,
    	tickLength: 5,
    	miniTickLength: 1,
    	miniTickStrokeWidth: 1,
    	scaleDivisionNumber: 10,
    	tickLabelOffset: 10,
    	centralCircleRadius: 10,
    	isInnerNumbers: false
    }
  },

  handleChange: function (event) {
    this.setState({
    	radius: event.target.radius,
    	arcStrokeWidth: event.target.arcStrokeWidth,
    	tickOffset: event.target.tickOffset,
    	tickStrokeWidth: event.target.tickStrokeWidth,
    	tickLength: event.target.tickLength,
    	miniTickLength: event.target.miniTickLength,
    	miniTickStrokeWidth: event.target.miniTickStrokeWidth,
    	scaleDivisionNumber: event.target.scaleDivisionNumber,
    	tickLabelOffset: event.target.tickLabelOffset,
    	centralCircleRadius: event.target.centralCircleRadius,
    	isInnerNumbers: event.target.isInnerNumbers
    })
  },

  propTypes: {
	radius: React.PropTypes.number,
	arcStrokeWidth: React.PropTypes.number,
	tickOffset: React.PropTypes.number,
	tickStrokeWidth: React.PropTypes.number,
	tickLength: React.PropTypes.number,
	miniTickLength: React.PropTypes.number,
	miniTickStrokeWidth: React.PropTypes.number,
	scaleDivisionNumber: React.PropTypes.number,
	tickLabelOffset: React.PropTypes.number,
	centralCircleRadius: React.PropTypes.number,
    isInnerNumbers: React.PropTypes.bool,
  },







  render: function () {
	var gaugeRadius = this.state.radius;
	var gaugeArcStrokeWidth = this.state.arcStrokeWidth;
	var gaugeTickOffset = this.state.tickOffset;
	var gaugeTickStrokeWidth = this.state.tickStrokeWidth;
	var gaugeTickLength = this.state.tickLength;
	var gaugeMiniTickLength = this.state.miniTickLength;
	var gaugeMiniTickStrokeWidth = this.state.miniTickStrokeWidth;
	var gaugeScaleDivisionNumber = this.state.scaleDivisionNumber;
	var gaugeTickLabelOffset = this.state.tickLabelOffset;
	var gaugeCentralCircleRadius = this.state.centralCircleRadius;
	var gaugeInnerNumbers = this.state.isInnerNumbers;




    var Gauge = function(ranges, marks, arrowValue){


	

	

	
	
	
	
	
	
	
	var width = 450;
	var height = 450;
	
	var center ={
		x: width / 2,
		y: height / 2
	};

	var gaugeStart = -120;
	var gaugeEnd = 120;

	
	
	
	var gaugeLength = gaugeEnd - gaugeStart;

	
	
	var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
		var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		};
	}

	var getArcs = function(){
	    var drawArc = function(startAngle, endAngle, color, index){
		    var describeArc = function(x, y, radius, startAngle, endAngle){
    			var start = polarToCartesian(x, y, radius, endAngle);
    			var end = polarToCartesian(x, y, radius, startAngle);
    
    			var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    			
    			var d = [
    				"M", start.x, start.y, 
    				"A", radius, radius, 0, arcSweep, 0, end.x, end.y
    			].join(" ");
    
    			return d;       
    		}

        return React.createElement('path', {
            key: index,
            fill: "none", 
            stroke: color, 
            strokeWidth: 
            gaugeArcStrokeWidth, 
            d: describeArc(center.x, center.y, gaugeRadius, startAngle, endAngle) 
        });
	}

	    var arcs = []
	    
	    ranges.forEach(function(range, i){
	        arcs.push(
	            drawArc(gaugeStart + range.start * gaugeLength, gaugeStart + range.end * gaugeLength, range.color, i)
	        )
		});
		return arcs;
	}
	

	
	var getTicks = function(){
        var result = [];
	    
	    var indexValue = 0;
	    
		marks.forEach(function(mark, index, array){

			if(index !== 0){
				
				// рисуем минитики 

				var miniGaugeLength = gaugeLength / (array.length - 1 ) / gaugeScaleDivisionNumber;

				for(var i = 1; i < gaugeScaleDivisionNumber; i++){
					var startPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * gaugeTickOffset, gaugeStart + index * gaugeLength / (array.length - 1 ) - miniGaugeLength * i ) ;
					var endPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeMiniTickLength), gaugeStart + index * gaugeLength / (array.length - 1 ) - miniGaugeLength * i);

					result.push(React.createElement('line', {
					    key: indexValue++,
                        stroke: "#b5b5b5", 
                        x1: startPoint.x, 
                        y1: startPoint.y, 
                        
                        x2: endPoint.x, 
                        y2: endPoint.y, 
                        
                        strokeWidth: gaugeMiniTickStrokeWidth 
                    }))
				}
			}
		});
		
        marks.forEach(function(mark, index, array){
			var startPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * gaugeTickOffset, gaugeStart + index * gaugeLength / (array.length - 1 ) );
			var endPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength), gaugeStart + index * gaugeLength / (array.length - 1 ));

			result.push(React.createElement('line', {
	            key: indexValue++,
                stroke: "#b5b5b5", 
                x1: startPoint.x, 
                y1: startPoint.y, 
                
                x2: endPoint.x, 
                y2: endPoint.y, 
                
                strokeWidth: gaugeTickStrokeWidth 
            }))
		});
		
	    return result;
	}
	
	
	var getLabels = function(){
	    var result = [];
	    
	    var indexValue = 0;
	    marks.forEach(function(mark, index, array){
			var labelCoords = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * ( gaugeTickOffset + gaugeTickLength + gaugeTickLabelOffset), gaugeStart + index * gaugeLength / (array.length - 1 ));

			result.push(React.createElement('text', {
	            key: indexValue++,
                fill: "#666666", 
                x: labelCoords.x, 
                y: labelCoords.y, 
                alignmentBaseline: "middle", 
                textAnchor: "middle", 
                strokeWidth: gaugeTickStrokeWidth 
            }, mark))
		});
		
		return result;
	}
	

	
	
	
	var getArrow = function(){
		// рисуем треугольник
		var result = [];

	    var indexValue = 0;
		
		var point1 = polarToCartesian(center.x, center.y, gaugeCentralCircleRadius / 2, gaugeStart + gaugeLength * arrowValue - 90);
		var point2 = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength / 2), gaugeStart + gaugeLength * arrowValue);
		var point3 = polarToCartesian(center.x, center.y, gaugeCentralCircleRadius / 2, gaugeStart + gaugeLength * arrowValue + 90);

		var describe = [
			"M", point1.x, point1.y, 
			"L", point2.x, point2.y, 
			"L", point3.x, point3.y, 
			"Z"
		].join(" ");

        result.push(React.createElement('path', {
            key: indexValue++,
            fill: "#1e98e4", 
            d: describe 
        }))

		// рисуем кружок 
        result.push(React.createElement('circle', {
            key: indexValue++,
            fill: "#1e98e4", 
            cx: center.x,
            cy: center.y,
            r: gaugeCentralCircleRadius
        }))

		return result;
	};
	
	
	
	
	
	
	
	
	this.Draw = function(){
		 var svg = React.createElement('svg', {width: width, height: height, shapeRendering: "geometricPrecision" },
		    getArcs(),
		    
		    getTicks(),
		    
		    getLabels(),
		    
		    getArrow()
		 );


		return svg;
	}
}



    var g = new Gauge([
				{
					'start': 0,
					'end': 4.5 / 6,
					'color': "#666"
				},
				{
					'start': 4.5 / 6,
					'end': 5.5 / 6,
					'color': "#ffa500"
				},
				{
					'start': 5.5 / 6,
					'end': 1,
					'color': "#ff0000"
				}
			],
			[0,1,2,3,4,5,6],
			2/6);
			

    return (
        g.Draw()

    )

  }
})


//module.exports = ReactGauge















