import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";
import { DropletShape } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";

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
    xStart: mandala.centerX + mandala.outerR,
    yStart: mandala.centerY,
    width: 30,
    howMany: 8
});
mandala.addShape(curlyBracket);

// Dots
var dotShape = new DotShape({
    xStart: curlyBracket.curveOutX,
    yStart: curlyBracket.bracketStartY,
    howMany: 8,
    width: 2
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    xStart: curlyBracket.curveInX,
    yStart: curlyBracket.y,
    howMany: 8,
    width: 2
});
mandala.addShape(dotShape);

dotShape = new DotShape({
    xStart: curlyBracket.curveOutX,
    yStart: curlyBracket.bracketEndY,
    howMany: 8,
    width: 2
});
mandala.addShape(dotShape);

var dropletShape = new DropletShape({
    xStart: mandala.centerX + mandala.outerR,
    yStart: mandala.centerY,
    length: 30,
    width: 10,
    angleStart: 22.5,
    howMany: 8
});
mandala.addShape(dropletShape);


// Dropets
var dropletShape = new DropletShape({
    xStart: mandala.centerX + mandala.outerR,
    yStart: mandala.centerY,
    width: 10,
    length: 30,
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

//palmTrees
for (var rotation = 0; rotation < 360; rotation += 45) {
    mandala.palmTree(54, rotation, {'stroke-width': 5});
//    mandala.palmTree(24, rotation);
//    mandala.palmTree(14, rotation);
}