function Gauge(selector, ranges, marks, arrowValue){
	
	var svgNameSpace = "http://www.w3.org/2000/svg";

	var gaugeRadius = 175;

	var gaugeTickOffset = 7;

	var gaugeTickStrokeWidth = 2;
	
	var gaugeTickLength = 5;
	
	var gaugeMiniTickLength = 1;
	
	var gaugeMiniTickStrokeWidth = 1;

	
	var gaugeScaleDivisionNumber = 10;
	
	var gaugeTickLabelOffset = 10;

	var gaugeCentralCircle = 10;
	
	
	
	
	var gaugeInnerNumbers = false;
	
	
	var gaugeStrokeWidth = 3;
	
	
	var width = 450;
	var height = 450;
	
	var center ={
		x: width / 2,
		y: height / 2
	}

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

	
	
	var drawArc = function(svgContainer, startAngle, endAngle, color){
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

		var path = document.createElementNS(svgNameSpace, "path");

		path.setAttribute("fill", "none");
		path.setAttribute("stroke", color);
		path.setAttribute("stroke-width", gaugeStrokeWidth);

		path.setAttribute("d", describeArc(center.x, center.y, gaugeRadius, startAngle, endAngle));

		svgContainer.appendChild(path);
	}

	
	
	var drawMarks = function(svgContainer, marks){

	
	
	
		marks.forEach(function(mark, index, array){
		
		
			if(index !== 0){
				
				// рисуем минитики 
				

				var miniGaugeLength = gaugeLength / (array.length - 1 ) / gaugeScaleDivisionNumber;
				
				
				for(var i = 1; i < gaugeScaleDivisionNumber; i++){
				
					var miniTick = document.createElementNS(svgNameSpace, "line");
			
					var startPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * gaugeTickOffset, gaugeStart + index * gaugeLength / (array.length - 1 ) - miniGaugeLength * i ) ;
					var endPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeMiniTickLength), gaugeStart + index * gaugeLength / (array.length - 1 ) - miniGaugeLength * i);
					
					
					miniTick.setAttribute("stroke", "#b5b5b5");
					
					miniTick.setAttribute("x1", startPoint.x);
					miniTick.setAttribute("y1", startPoint.y);
					
					miniTick.setAttribute("x2", endPoint.x);
					miniTick.setAttribute("y2", endPoint.y);
					
					
					
					miniTick.setAttribute("stroke-width", gaugeMiniTickStrokeWidth);

					svgContainer.appendChild(miniTick);
				}
				
				
				
			}
		
		
		

			

		});
	
	
	
	
	
	
		marks.forEach(function(mark, index, array){
		
			var tick = document.createElementNS(svgNameSpace, "line");
			
			var startPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * gaugeTickOffset, gaugeStart + index * gaugeLength / (array.length - 1 ) );
			var endPoint = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength), gaugeStart + index * gaugeLength / (array.length - 1 ));
			
			
			tick.setAttribute("stroke", "#b5b5b5");
			
			tick.setAttribute("x1", startPoint.x);
			tick.setAttribute("y1", startPoint.y);
			
			tick.setAttribute("x2", endPoint.x);
			tick.setAttribute("y2", endPoint.y);
			
			
			
			tick.setAttribute("stroke-width", gaugeTickStrokeWidth);

			svgContainer.appendChild(tick);
			
			var label = document.createElementNS(svgNameSpace, "text");
			
			var labelCoords = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * ( gaugeTickOffset + gaugeTickLength + gaugeTickLabelOffset), gaugeStart + index * gaugeLength / (array.length - 1 ));

			label.setAttribute("fill", "#666666");
			
			label.setAttribute("x", labelCoords.x);
			label.setAttribute("y", labelCoords.y);
			
			label.setAttribute("alignment-baseline", "middle");
			label.setAttribute("text-anchor", "middle");
			
			label.textContent = mark;
			
			svgContainer.appendChild(label);

		});
	}
	
	
	
	var drawArrow = function(svgContainer, arrowValue){
		// рисуем треугольник
		var triangle = document.createElementNS(svgNameSpace, "path");
		
		var point1 = polarToCartesian(center.x, center.y, gaugeCentralCircle / 2, gaugeStart + gaugeLength * arrowValue - 90);
		var point2 = polarToCartesian(center.x, center.y, gaugeRadius + (gaugeInnerNumbers ? -1 : 1) * (gaugeTickOffset + gaugeTickLength / 2), gaugeStart + gaugeLength * arrowValue);
		var point3 = polarToCartesian(center.x, center.y, gaugeCentralCircle / 2, gaugeStart + gaugeLength * arrowValue + 90);

		var describe = [
			"M", point1.x, point1.y, 
			"L", point2.x, point2.y, 
			"L", point3.x, point3.y, 
			"Z"
		].join(" ");

		triangle.setAttribute("fill", "#1e98e4");
		triangle.setAttribute("d", describe);

		svgContainer.appendChild(triangle);
		
		
		// рисуем кружок 
		var circle = document.createElementNS(svgNameSpace, "circle");
		


		circle.setAttribute("fill", "#1e98e4");
		circle.setAttribute("cx", center.x);
		circle.setAttribute("cy", center.y);
		circle.setAttribute("r", gaugeCentralCircle);

		svgContainer.appendChild(circle);
		
		
	};
	
	
	
	
	
	
	
	
	this.Draw = function(){
		var svg = document.createElementNS(svgNameSpace, "svg");

		svg.setAttribute("width", width);
		svg.setAttribute("height", height);
		
		svg.setAttribute("shape-rendering", "geometricPrecision");

		//shape-rendering="optimizeSpeed"
		
		document.querySelector(selector).appendChild(svg);

		ranges.forEach(function(range){
			drawArc(svg, gaugeStart + range.start * gaugeLength, gaugeStart + range.end * gaugeLength, range.color);
		});

		drawMarks(svg, marks);
		
		drawArrow(svg, arrowValue);
	}
}

