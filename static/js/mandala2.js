import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";
import { DropletShape } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";
import { PalmTreeShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala2");

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

var curlyBracket = new CurlyBracket({
    x: mandala.centerX + mandala.outerR,
    y: mandala.centerY,
    length: 30,
    width: 20,
    howMany: 8
});
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
mandala.addShape(dotShape);

// Droplets
var dropletShape = new DropletShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR,
    length: 30,
    width: 10,
    angleStart: 22.5,
    howMany: 8
});
mandala.addShape(dropletShape);

// Swirls
for (var rotation = 0; rotation < 360; rotation += 45) {
    mandala.swirl(rotation);
}

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

//palmTrees
// for (var rotation = 0; rotation < 360; rotation += 45) {
//     mandala.palmTree(54, rotation, {'stroke-width': 5});
// //    mandala.palmTree(24, rotation);
// //    mandala.palmTree(14, rotation);
// }
