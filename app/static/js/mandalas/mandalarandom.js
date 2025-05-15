import { DropletShape, TiltedCurvyDroplet, PottedPlant, CurvyDroplet, CurvyDroplets } from "/static/js/shapes/droplet.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { ArcShape, DottedArcShape } from "/static/js/shapes/arc.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { SCurve } from "/static/js/shapes/scurve.js";
import { SShape } from "/static/js/shapes/s.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { Mandala } from "/static/js/mandala.js";
import { shapeClasses } from "/static/js/shapes/shapefactory.js"

let mandala = new Mandala("mandalarandom", 240, 230);

function howMany(r, width) {
    const circumference = 2 * Math.PI * r;
    var c =  Math.ceil(circumference / width);
    if (c < 5) { c+=1; }
    console.log("howMany: " + c);
    return c;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

//loop through getting random sizes
let sizes = [];
var y = 18;
var randomWidth;
for (let i = 0; i <= 6; i++) {
    randomWidth = getRandomNumber(15, 40);      //10, 18);
    sizes.push(randomWidth);
    y += randomWidth;
}

//outer circle
mandala.addCenteredCircle(y, '#666', 'white');

// We put the shapes into an array so that we can use a random number
//  to access random shapes.
let shapeClassArray = Object.values(shapeClasses);


//We start at the outer loop because we add a white circle at each layer
let yHeight = 34;
for (let i = 6; i >= 0; i--) {
    const randomShapeIndex = Math.floor(Math.random() * shapeClassArray.length);
    let randomWidth = sizes[i];
    y -= randomWidth;
    yHeight = randomWidth;
    console.log(`Random width: ${randomWidth}`);
    console.log('y: ' + y);

    let shapeClass = shapeClassArray[randomShapeIndex];
    let shapeArgs = { 
        x: mandala.centerX, 
        y: mandala.centerY - y,
        width: randomWidth * (1),
        length: yHeight - 2,
        howMany: howMany(y, randomWidth),
        toolTipText: shapeClass.name,
    }
    let shape = new shapeClass(shapeArgs);
    console.log("shape: -----------" + shapeClass.name + '------');
    // console.log("shape: -----------" + makeShapFns[randomShapeIndex].name + '------');
    // let shape = makeShapFns[randomShapeIndex](shapeArgs);
    mandala.addShape(shape);
    mandala.addCenteredCircle(y, 'white', 'white');
}

mandala.addCenteredCircle(18, '#666', 'white');


