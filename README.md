# Gauge


[Live demo](https://baklya.github.io/react-gauge/).


## Installation

```
$ npm i --save react-gauge-test
```

## Example

```
$ cd node_modules/react-gauge-test/
$ npm i
$ npm run build-example

```
Then open `example/index.html`

```js
var React = require('react');
var ReactDOM = require('react-dom');
var ReactGauge = require('react-gauge-test');

ReactDOM.render(
    React.createElement(ReactGauge, options),
    document.querySelector('.container')  
);
```

# Options

| Param | Default | Description |
|---|---|---|
| `radius` | `175` | Main arc radius |
| `arcStrokeWidth` | `3` | Width of main arc |
| `tickOffset` | `7` | Offset between main arc and ticks |
| `tickStrokeWidth` | `2` | Width of big ticks |
| `tickLength` | `5` | Length of big ticks|
| `miniTickLength` | `1` | Length of mini ticks |
| `miniTickStrokeWidth` | `1` | Width of mini ticks |
| `scaleDivisionNumber` | `10` | Number of divisions between big ticks |
| `tickLabelOffset` | `10` | Offset between big tick and tick label |
| `centralCircleRadius` | `10` | Radius of central circle |
| `isInnerNumbers` | `false` | Tick labels position |
| `arrowValue` | `0` | Value of gauge |
| `marks` | `[0, 1, 2, 3, 4, 5, 6]` | Tick labels values |
| `ranges` | `[{ start: 0, end: 4.5/6, color: "#666" }, { start: 4.5/6, end: 5.5/6, color: "#ffa500" }, { start: 5.5/6, end: 1, color: "#ff0000" }]` | Array of color intervals |
| `aperture` | `80` | Gap on main arc |
| `contentWidth` | `450` | Width and height of inner image |
| `svgContainerWidth` | `450` |  Svg container width |
| `svgContainerHeight` | `450` | Svg container height |



[![NPM](https://nodei.co/npm/react-gauge-test.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-gauge-test/)
