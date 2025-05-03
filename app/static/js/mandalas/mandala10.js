import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { DropletShape } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";

let mandala = new Mandala("mandala10", 100, 120);

const outerColor = "white"; //"66B592";
mandala.addCenteredCircle(95, "none", outerColor);
mandala.addShape(new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - 95,
    width: 30,
    length: 35,
    angleStart: 20,
    howMany: 9,
    toolTipText: "outer curly bracket"
}, {fill: outerColor, stroke: '#111', 'stroke-width': 1}))

mandala.addCenteredCircle(82, "none", "lightblue");
mandala.addShape(new DottedArcShape({
    x: mandala.centerX, 
    y: mandala.centerY - 80,
    width: 55,
    length: 20, // 15,
    howMany: 9,
    toolTipText: "outer blue dotted arc"
}, 
{ fill: 'lightblue'}
));


mandala.addShape(new PalmTreeShape({
    x: mandala.centerX, 
    y: mandala.centerY - 70,
    width: 42,
    length: 30, // 15,
    howMany: 9,
    toolTipText: "palm tree"
}));

mandala.addCenteredCircle(66, "none", "white");
mandala.addShape(new DottedArcShape({
    x: mandala.centerX, 
    y: mandala.centerY - 64,
    width: 42,
    length: 20, // 15,
    howMany: 9,
    toolTipText: 'middle dotted arc',
    angleStart: 20
}, { fill: "white"}));

mandala.addCenteredCircle(48, "none", "lightblue");
mandala.addShape(new DottedArcShape({
    x: mandala.centerX, 
    y: mandala.centerY - 46,
    width: 30,
    length: 20, // 15,
    howMany: 9,
    toolTipText: "light blue dotted arc"
}, { fill: 'lightblue'}));

mandala.addCenteredCircle(32, "none", "white");
mandala.addShape(new CurlyBracket({
    x: mandala.centerX, 
    y: mandala.centerY - 32,
    width: 15,
    length: 23, // 15,
    howMany: 9,
}, {fill: outerColor, stroke: '#666', 'stroke-width': 1}));

mandala.addShape(new DropletShape({
    x: mandala.centerX, 
    y: mandala.centerY - 30,
    width: 20,
    length: 25, // 15,
    howMany: 9,
    angleStart: 20,
}, {fill: '#666', stroke: '#666', 'stroke-width': 1}));


//Add an arc lined with circles

var dot = new DotShape({
    x: mandala.centerX, 
    y: mandala.centerY - 60, //52,
    width: 5,
    howMany: 9,
    angleStart: 20,    
});
var dotsBwn = new BetweenDotsDotShape(dot);
mandala.addShape(dot);
mandala.addShape(dotsBwn);


mandala.addShape(new SpiralShape({
    x: mandala.centerX,
    y: mandala.centerY - 20,
    howMany: 9,
    angleStart: 38,
}));
mandala.addCenteredCircle(20);



