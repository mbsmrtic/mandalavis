import { PalmTreeShape } from "/static/js/mandala.js";
import { Mandala } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";
import { BetweenDotsDotShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala3");

mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: 65,
    fill: "black",
    'stroke-width': .3,
    stroke: "black"
});



// Create inner circle
mandala.makeGradient("purple", "black", "m3Gradient");
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    fill: "url(#m3Gradient)"
});


function addRowOfCircles(yStartOffset, r, color, count) {
    //Bigger circles
    var dotShape = new DotShape({
        x: mandala.centerX,
        y: mandala.centerY - mandala.outerR - yStartOffset, 
        width: r,
        color: color,
        // howMany: 22
        howMany: count
    });
    mandala.addShape(dotShape);
    //smaller ones
    var betweenDotShape = new BetweenDotsDotShape(dotShape);
    mandala.addShape(betweenDotShape);    
}


var r = 2;
const countOfCircles = 35;
// green shapes
addRowOfCircles(r, r, "#37653A", countOfCircles);
r = 2.5;
// yellow shapes
addRowOfCircles(3 * r, r, "#FDCC0D", countOfCircles);
// blue shapes
addRowOfCircles(5.5 * r, r, "#2E2B89", countOfCircles + 2);
// bright green
addRowOfCircles(8 * r, r, "rgb(98, 180, 103", countOfCircles - 5);

// #ced7d8 
// #ff6b6b 
// #118ab2 
r = 3
// purple
addRowOfCircles(10.5 * r, r, "#69359C", countOfCircles + 7);

// #006B3C green
// #69359C purple
// #FDCC0D yellow
//rgb(98, 180, 103) green
//  69359C  purple

//palmTrees
var shape = new PalmTreeShape({
    x: mandala.centerX, 
    y: mandala.centerY - 65,
    howMany: 45
});
mandala.addShape(shape);
