import { DropletShape } from "/static/js/shapes/droplet.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { SwirlShape } from "/static/js/shapes/swirl.js";
import { ArcShape } from "/static/js/shapes/arc.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { SCurve } from "/static/js/shapes/scurve.js";
import { SShape } from "/static/js/shapes/s.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { Mandala } from "/static/js/mandala.js";

let mandala = new Mandala("mandalarandom");

let makeShapFns = [
    function droplet(shapeArgs) {
        shapeArgs['length'] = 15;
        return new DropletShape(shapeArgs);
    },
    function curlybracket(shapeArgs) {
        return new CurlyBracket(shapeArgs);
    },
    function spiral(shapeArgs) {
        return new SpiralShape(shapeArgs);
    },
    // function arc() {

    // },
    function dot(shapeArgs) {
        shapeArgs['width'] = shapeArgs['width'] / 2;
        return new DotShape(shapeArgs);
    },
    // function betweenDotsDot() {

    // },
    function wave(shapeArgs) {
        return (new WaveShape(shapeArgs));
    }
];

function howMany(r, width) {
    const circumference = 2 * Math.PI * r;
    return Math.floor(circumference / width);
}

mandala.addCenteredCircle(10);
const yHeight = 12;
// If each shape were actually it's proper width we could calculate howMany
for (let i = 5; i > 0; i--) {
    const randomShapeIndex = Math.floor(Math.random() * makeShapFns.length);
    let randomWidth = Math.floor(Math.random() * 30);
    randomWidth = 12;
    let y = i * yHeight;
    let shapeArgs = { 
        x: mandala.centerX, 
        y: mandala.centerY - y,
        width: randomWidth,
        howMany: howMany(y, randomWidth)
    }
   let shape = makeShapFns[randomShapeIndex](shapeArgs);
    mandala.addShape(shape);
    mandala.addCenteredCircle(y, 'black', 'white');
}



