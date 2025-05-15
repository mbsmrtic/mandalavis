import { DropletShape } from "/static/js/shapes/droplet.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { DotShape } from "/static/js/shapes/dot.js";

const mandala = new Mandala("mandala2");


// Curly bracket shape
var curlyBracket = new CurlyBracket({
    // x: mandala.centerX,
    // y: mandala.centerY - mandala.outerR,
    offset: mandala.outerR,
    howMany: 8,
    length: 30,
    width: 20,
}, {stroke: 'black', 'stroke-width': 1});
mandala.addShape(curlyBracket);

// Dots
var dotShape = new DotShape({
    x: curlyBracket.bracketStartX,
    y: curlyBracket.curveOutY + 2.5,
    howMany: 8,
    width: 4,
    color: 'black'
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.x,
    y: curlyBracket.curveInY + 2.5,
    howMany: 8,
    width: 4,
    color: 'black'
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.bracketEndX,
    y: curlyBracket.curveOutY + 2.5,
    howMany: 8,
    width: 4,
    color: 'black'
});
mandala.addShape(dotShape );

var dropletShape = new DropletShape({
    // x: mandala.centerX,
    // y: mandala.centerY - mandala.outerR,
    offset: mandala.outerR,
    length: 26,
    width: 10,
    angleStart: 22.5,
    howMany: 8,
    color: 'black'
});
mandala.addShape(dropletShape);

// Create inner circle
mandala.addCenteredCircle(mandala.innerR, 'black', 'black');

// Outer circle
mandala.addCenteredCircle(mandala.outerR);
