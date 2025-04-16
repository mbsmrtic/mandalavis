import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { Mandala } from "/static/js/mandala.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { BetweenDotsDotShape } from "/static/js/shapes/dot.js";

const mandala = new Mandala("mandala3", 70, 95);

mandala.addCenteredCircle(65, 'black', 'black');

// Create inner circle
mandala.makeGradient("purple", "black", "m3Gradient");
mandala.addCenteredCircle(mandala.outerR, 'none', 'url(#m3Gradient)');

function addRowOfCircles(yStartOffset, r, color, count) {
    //Bigger circles
    var dotShape = new DotShape({
        offset: mandala.outerR + yStartOffset,
        width: r,
        color: color,
        howMany: count
    });
    mandala.addShape(dotShape);
    //smaller ones
    var betweenDotShape = new BetweenDotsDotShape(dotShape);
    mandala.addShape(betweenDotShape);    
}


var r = 2.5;
const countOfCircles = 35;
// green shapes
addRowOfCircles(r - 3, r, "#37653A", countOfCircles);
r = 3;
// yellow shapes
addRowOfCircles(1.5 * r, r, "#FDCC0D", countOfCircles);
// blue shapes
addRowOfCircles(3.5 * r, r, "#2E2B89", countOfCircles + 2);
// bright green
addRowOfCircles(5.5 * r, r, "rgb(98, 180, 103", countOfCircles - 5);

// #ced7d8 
// #ff6b6b 
// #118ab2 
r = 4 //3.5
// purple
addRowOfCircles(7 * r, r, "#69359C", countOfCircles + 7);

// #006B3C green
// #69359C purple
// #FDCC0D yellow
//rgb(98, 180, 103) green
//  69359C  purple

//palmTrees
var shape = new PalmTreeShape({
    offset: 65,
    howMany: 45
});
mandala.addShape(shape);
