import { DropletShape } from "/static/js/shapes/droplet.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { SwirlShape } from "/static/js/shapes/swirl.js";
import { ArcShape, DottedArcShape } from "/static/js/shapes/arc.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { SCurve } from "/static/js/shapes/scurve.js";
import { SShape } from "/static/js/shapes/s.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { Mandala } from "/static/js/mandala.js";

let mandala = new Mandala("mandalarandom", 110, 110);

function dot(shapeArgs) {
    shapeArgs['width'] = shapeArgs['width'] / 2;
    return new DotShape(shapeArgs);
}

function dottedArc(shapeArgs) {
    // r = 30;
    // shapeArgs['width'] = 30;
    // const circumference = 2 * Math.PI * r;
    // var c =  Math.floor(circumference / width);
    //shapeArgs['howMany'] = 10;
    return new DottedArcShape(shapeArgs);
}

function droplet(shapeArgs) {
    shapeArgs['length'] = 15;
    return new DropletShape(shapeArgs);
} 

function curlybracket(shapeArgs) {
    return new CurlyBracket(shapeArgs);
}
function spiral(shapeArgs) {
    return new SpiralShape(shapeArgs);
}
function betweenDotsDot(shapeArgs) {
    var dotShape = dot(shapeArgs);
    mandala.addShape(dotShape);
    return new BetweenDotsDotShape(dotShape);
}
function wave(shapeArgs) {
    shapeArgs['width'] = shapeArgs['width'] + 3;
    return (new WaveShape(shapeArgs));
}
function arc(shapeArgs) {
    return (new ArcShape(shapeArgs));
}
function palmtree(shapeArgs) {
    return (new PalmTreeShape(shapeArgs));
}

function s(shapeArgs) {
    return (new SShape(shapeArgs));
}

function scurve(shapeArgs) {
    return (new SCurve(shapeArgs));
}

function swirl(shapeArgs) {
    return (new SwirlShape(shapeArgs));
}

let makeShapFns = [
    droplet, dottedArc, curlybracket, spiral, dot, betweenDotsDot, wave, arc, palmtree, s, scurve, swirl
];

function howMany(r, width) {
    const circumference = 2 * Math.PI * r;
    var c =  Math.floor(circumference / width);
    console.log("howMany: " + c);
    return c;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

//outer circle
mandala.addCenteredCircle(109, '#666', 'white');

let yHeight = 18;
let y = 18;
for (let i = 5; i > 0; i--) {
    const randomShapeIndex = Math.floor(Math.random() * makeShapFns.length);
    let randomWidth = getRandomNumber(10, 20);      //10, 18);
    console.log(`Random width: ${randomWidth}`);

    //randomWidth = 12;
    let y =  i * yHeight;
    let shapeArgs = { 
        x: mandala.centerX, 
        y: mandala.centerY - y,
        width: randomWidth * (1),
        length: yHeight - 2,
        howMany: howMany(y, randomWidth),
    }
   let shape = makeShapFns[randomShapeIndex](shapeArgs);
    mandala.addShape(shape);
    mandala.addCenteredCircle(y, 'white', 'white');
}

mandala.addCenteredCircle(18, '#666', 'white');


