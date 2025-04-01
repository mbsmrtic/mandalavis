import { SwirlShape } from "/static/js/shapes/swirl.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { DropletShape } from "/static/js/shapes/droplet.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { SCurve } from "/static/js/shapes/scurve.js";

const mandala = new Mandala("mandala2");


var curlyBracket = new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR,
    length: 30,
    width: 20,
    howMany: 8
});
mandala.addShape(curlyBracket);

// Dots
var dotShape = new DotShape({
    x: curlyBracket.bracketStartX,
    y: curlyBracket.curveOutY + 2.5,
    howMany: 8,
    width: 2.5
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.x,
    y: curlyBracket.curveInY + 2.5,
    howMany: 8,
    width: 2.5
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    x: curlyBracket.bracketEndX,
    y: curlyBracket.curveOutY + 2.5,
    howMany: 8,
    width: 2.5
});
mandala.addShape(dotShape);

// Droplets
var dropletShape = new DropletShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR,
    length: 26,
    width: 10,
    angleStart: 22.5,
    howMany: 8
});
mandala.addShape(dropletShape);

const swirlY = mandala.centerY - mandala.innerR;
var swirlShape = new SwirlShape({
    x: mandala.centerX,
    y: swirlY,
    // length: 30,
    // width: 10,
    color: 'black',
    howMany: 8
});
mandala.addShape(swirlShape);
mandala.addShape(new DotShape({
    x: mandala.centerX + 2.5, y: swirlY,
    width: 2.5,
    howMany: 8
}));

// mandala.addShape(new SCurve({
//     x: mandala.centerX, 
//     y: mandala.centerY - mandala.innerR - 7,
//     width: 5,
//     length: 9,
//     color: 'black',
//     howMany: 25
// }, {'stroke-width': .2}));

//circle 
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR + 7,
    'stroke-width': .3,
    stroke: "black"
})

var p = new PalmTreeShape({
    x: mandala.centerX, 
    y: mandala.centerY - 54,
    howMany: 8
    }
    , { 'stroke-width': 5}
);
mandala.addShape(p);

// Create inner circle
mandala.makeGradient("white", "black");
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    fill: "url(#myGradient)"
});


// Outer circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    'stroke-width': 2,
    stroke: "black"
});
