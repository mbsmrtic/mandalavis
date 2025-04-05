import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { DropletShape } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";

let mandala = new Mandala("mandala8", 100, 150);

let yDotted = 30;
let dottedLength = 40;
let yArc = yDotted + dottedLength;

// // inner circle
// mandala.addElement("circle", {
//     cx: mandala.centerX,
//     cy: mandala.centerY,
//     r:  yDotted,
//     stroke: "black",
//     fill: "white"
// });

mandala.addShape(new PalmTreeShape({
    x: mandala.centerX, 
    y: mandala.centerY - 70,
    width: 42,
    length: 30, // 15,
    howMany: 9,
}));

mandala.addShape(new DottedArcShape({
    x: mandala.centerX, 
    y: mandala.centerY - 64,
    width: 42,
    length: 20, // 15,
    howMany: 9,
    // toolTipText: 'woobly',
    angleStart: 20
}));

mandala.addCenteredCircle(48, "none", "lightblue");
mandala.addShape(new DottedArcShape({
    x: mandala.centerX, 
    y: mandala.centerY - 46,
    width: 30,
    length: 20, // 15,
    howMany: 9,
    // toolTipText: 'woobly',
}, { fill: 'lightblue'}));

mandala.addCenteredCircle(34, "none", "white");
mandala.addShape(new CurlyBracket({
    x: mandala.centerX, 
    y: mandala.centerY - 34,
    width: 15,
    length: 23, // 15,
    howMany: 9,
    // toolTipText: 'woobly',
}));


mandala.addShape(new DropletShape({
    x: mandala.centerX, 
    y: mandala.centerY - 27,
    width: 20,
    length: 25, // 15,
    howMany: 9,
    // toolTipText: 'woobly',
    angleStart: 20,
}));


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
}));
mandala.addCenteredCircle(20);



