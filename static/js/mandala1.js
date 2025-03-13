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
    xStart: mandala.centerX + mandala.outerR,
    yStart: mandala.centerY,
    howMany: 8,
    width: 30
});
mandala.addShape({ shape: curlyBracket});

// Dots
var dotShape = new DotShape({
    xStart: curlyBracket.curveOutX,
    yStart: curlyBracket.bracketStartY,
    howMany: 8,
    width: 2
});
mandala.addShape({ shape: dotShape });

dotShape = new DotShape({
    xStart: curlyBracket.curveInX,
    yStart: curlyBracket.yStart,
    howMany: 8,
    width: 2
});
mandala.addShape({ shape: dotShape });

dotShape = new DotShape({
    xStart: curlyBracket.curveOutX,
    yStart: curlyBracket.bracketEndY,
    howMany: 8,
    width: 2
});
mandala.addShape({ shape: dotShape });

var dropletShape = new DropletShape({
    xStart: mandala.centerX + mandala.outerR,
    yStart: mandala.centerY,
    length: 30,
    width: 10,
    angleStart: 22.5,
    howMany: 8
});
mandala.addShape({ shape: dropletShape });
