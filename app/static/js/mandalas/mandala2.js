import { SwirlShape } from "/static/js/shapes/swirl.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { DropletShape } from "/static/js/shapes/droplet.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { SCurve } from "/static/js/shapes/scurve.js";

const mandala = new Mandala("mandala2");

var curlyBracket = new CurlyBracket({
    offset: mandala.outerR,
    length: 30,
    width: 20,
    howMany: 8,
    color: 'black'
});
mandala.addShape(curlyBracket);

// Dots
var dotShape = new DotShape({
    x: curlyBracket.bracketStartX,
    y: curlyBracket.curveOutY + 2.5,
    howMany: 8,
    width: 2.5,
    color: 'black'
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.x,
    y: curlyBracket.curveInY + 2.5,
    howMany: 8,
    width: 2.5,
    color: 'black'
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.bracketEndX,
    y: curlyBracket.curveOutY + 2.5,
    howMany: 8,
    width: 2.5,
    color: 'black'
});
mandala.addShape(dotShape);

// Droplets
var dropletShape = new DropletShape({
    offset: mandala.outerR,
    length: 26,
    width: 10,
    angleStart: 22.5,
    howMany: 8,
    color: 'black'
});
mandala.addShape(dropletShape);

const swirlY = mandala.centerY - mandala.innerR;
var swirlShape = new SwirlShape({
    offset: mandala.innerR,
    color: 'black',
    howMany: 8
});
mandala.addShape(swirlShape);
mandala.addShape(new DotShape({
    x: mandala.centerX + 2.5, //y: swirlY,
    offset: mandala.innerR,
    width: 2.5,
    howMany: 8,
    color: 'black'
}));


//circle 
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR + 7,
    'stroke-width': .3,
    stroke: "black"
})

var p = new PalmTreeShape({
    offset: 54,
    howMany: 8,
    color: 'black'
    }, {'stroke-width': 5}
);
mandala.addShape(p);

// Create inner circle
mandala.makeGradient("white", "black");
mandala.addCenteredCircle(mandala.innerR, 'none', 'url(#myGradient)');


// Outer circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    'stroke-width': 2,
    stroke: "black"
});
