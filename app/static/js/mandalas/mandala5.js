import { ArcShape } from "/static/js/shapes/arc.js";
import { SShape } from "/static/js/shapes/s.js";
import { DropletShape } from "/static/js/shapes/droplet.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { DotShape } from "/static/js/shapes/dot.js";

const mandala = new Mandala("mandala5", 70, 95);

// layered CurlyBrackets
for (var i = 0; i < 4; i++) {
    mandala.addShape(new CurlyBracket({
        x: mandala.centerX,
        y: mandala.centerY - mandala.outerR - 16,
        length: 26 - (i * 4),
        width: 28,
        howMany: 6,
        toolTipText: 'Layer curly bracket ' + i
    }, {'stroke-width': .7}));    
}

// layered CurlyBrackets
for (var i = 0; i < 4; i++) {
    mandala.addShape(new CurlyBracket({
        x: mandala.centerX ,
        y: mandala.centerY - mandala.outerR + 2,
        length: 35 - (i * 5),
        width: 28,
        angleStart: 30,
        howMany: 6,
    }, {'stroke-width': .7}));    
}

// dots over those Curly Brackets
mandala.addShape(new DotShape({
    x: mandala.centerX + mandala.outerR + 3,
    y: mandala.centerY + 2,
    width: 2,
    howMany: 18
}));



// Arcs 
var w = 18;
var l = 18;
var xStart = mandala.centerX; //- w;
var yStart = mandala.centerY - mandala.outerR - 26;
mandala.addShape(new ArcShape({
    x: xStart,
    y: yStart,
    width: w * 2,
    length: l,
    howMany: 6,
    angleStart: 30
}, {'stroke-width': .7}));

// Dots inside the arcs
xStart -= w;
let currentX = xStart;
let currentY = yStart;
w = w * 4;
for (let i=10; i < 180; i+=20) {
    let angle = ((i * Math.PI) / 180);
    currentY = yStart - .2 * w * Math.sin(angle);
    currentX = xStart - .2 * w * Math.cos(angle) + (w/4);

    mandala.addShape(new DotShape({
        x: currentX,
        y: currentY + 1,
        width: 1.25,
        howMany: 6,
        angleStart: 30
        }));
}

mandala.addShape(new DropletShape({
    x: mandala.centerX, // + mandala.innerR,
    y: mandala.centerY - mandala.innerR,
    length: mandala.outerR - mandala.innerR + 1,
    width: 10,
    angleStart: 0,
    howMany: 18
}, { fill: "none", stroke: "#666", 'stroke-width': .5}));

mandala.addShape(new DropletShape({
    x: mandala.centerX, 
    y: mandala.centerY - mandala.outerR - 4,
    width: 20,
    length: 16,
    howMany: 6
}, { fill: "#666", stroke: "#666", 'stroke-width': .5}));
mandala.addShape(new DotShape({
    x: mandala.centerX + mandala.outerR + 14,
    y: mandala.centerY + 2,
    width: 1.9,
    color: "white",
    angleStart: 30,
    howMany: 6
}, { fill: "white", stroke: "#666", 'stroke-width': .5}));

mandala.addCenteredCircle(mandala.innerR);
mandala.addCenteredCircle(mandala.outerR);

