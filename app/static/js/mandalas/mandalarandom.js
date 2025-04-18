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

let mandala = new Mandala("mandalarandom", 240, 230);

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
    shapeArgs['length'] = shapeArgs['width'] * .5
    return new DottedArcShape(shapeArgs);
}

function droplet(shapeArgs) {
    //shapeArgs['length'] = 15;
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

function pottedPlant(shapeArgs) {
    shapeArgs['width'] = shapeArgs['length'] /2;
    return (new PottedPlant(shapeArgs));
}

function curvyDroplet(shapeArgs) {
    shapeArgs['width'] *= .7;
    shapeArgs['length'] *= .9;
    return (new CurvyDroplet(shapeArgs));
}

function curvyDroplets(shapeArgs) {

    return (new CurvyDroplets(shapeArgs));
}

function leftTiltedCurvyDroplet(shapeArgs) {
    shapeArgs['width'] = shapeArgs['length'] / 2;
    shapeArgs['howMany'] *= 2;
    return (new TiltedCurvyDroplet(shapeArgs));
}
function rightTiltedCurvyDroplet(shapeArgs) {
    shapeArgs['width'] = shapeArgs['length'] / 2;
    shapeArgs['howMany'] *= 2;
    return (new TiltedCurvyDroplet(shapeArgs, {}, false));
}

let makeShapFns = [
    droplet, leftTiltedCurvyDroplet, rightTiltedCurvyDroplet, curvyDroplet, curvyDroplets, pottedPlant, dottedArc, curlybracket, spiral, dot, betweenDotsDot, wave, arc, palmtree, s, scurve, 
];

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

//We start at the outer loop because we add a white circle at each layer
let yHeight = 34;
for (let i = 6; i >= 0; i--) {
    const randomShapeIndex = Math.floor(Math.random() * makeShapFns.length);
    let randomWidth = sizes[i];
    y -= randomWidth;
    yHeight = randomWidth;
    console.log(`Random width: ${randomWidth}`);
    console.log('y: ' + y);

    let shapeArgs = { 
        x: mandala.centerX, 
        y: mandala.centerY - y,
        width: randomWidth * (1),
        length: yHeight - 2,
        howMany: howMany(y, randomWidth),
    }
    console.log("shape: -----------" + makeShapFns[randomShapeIndex].name + '------');
    let shape = makeShapFns[randomShapeIndex](shapeArgs);
    mandala.addShape(shape);
    mandala.addCenteredCircle(y, 'white', 'white');
}

mandala.addCenteredCircle(18, '#666', 'white');


