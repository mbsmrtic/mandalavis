import { DropletShape } from "/static/js/mandala.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala1");

// Create inner circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    fill: "black"
});


// Outer circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    stroke: "black"
});

// Curly bracket shape
var curlyBracket = new CurlyBracket({
    x: mandala.centerX + mandala.outerR,
    y: mandala.centerY,
    howMany: 8,
    length: 30,
    width: 20,
}, {stroke: 'black', 'stroke-width': 1});
mandala.addShape(curlyBracket);

// Dots
var dotShape = new DotShape({
    x: curlyBracket.curveOutX,
    y: curlyBracket.bracketStartY,
    howMany: 8,
    width: 2
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.curveInX,
    y: curlyBracket.y,
    howMany: 8,
    width: 2
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.curveOutX,
    y: curlyBracket.bracketEndY,
    howMany: 8,
    width: 2
});
mandala.addShape(dotShape );

var dropletShape = new DropletShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR,
    length: 30,
    width: 10,
    angleStart: 22.5,
    howMany: 8
});
mandala.addShape(dropletShape);
