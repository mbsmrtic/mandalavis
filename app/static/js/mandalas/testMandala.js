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

let mandala = new Mandala("testMandala", 200, 200);

mandala.addShape(new CurlyBracket({x: 70, width: 10, length:10}));

//outer circle
//mandala.addCenteredCircle(159, '#666', 'white');

//loop through getting random sizes
// let sizes = [];
// var y = 18;
// var randomWidth;
// for (let i = 0; i < 3; i++) {
//     randomWidth = getRandomNumber(15, 40);      //10, 18);
//     sizes.push(randomWidth);
//     y += randomWidth;
// }
// y -= randomWidth

// y = 18;
// for (let i = 0; i < 5; i++) {
//     let shapeArgs = {
//         x: mandala.centerX,
//         y: mandala.centerY - y,
//         width: 30,
//         length: 30,
//         howMany: howMany(y, 30)
//     };
//     mandala.addShape(dot(shapeArgs));
//     y += 30;
// }

let shapeArgs = {
    x: 200,
    y: 200 - 100,
    width: 36, //22, //30,
    length: 34, //44, //30
    // howMany: 15,
    // toolTipText: 'll'
    toolTipText: 'w: 15 l: 20'
}
// mandala.addShape(new CurvyDroplet(shapeArgs));
// shapeArgs['y'] = 200 - 60;
// mandala.addShape(new CurvyDroplets(shapeArgs));
// shapeArgs['y'] = 200 - 40;
// var tcd = new TiltedCurvyDroplet(shapeArgs);
// mandala.addShape(tcd);
// mandala.showControlPoint(tcd.pt1);
// mandala.showControlPoint(tcd.pt2);
// mandala.showControlPoint(tcd.pt3);
// mandala.showControlPoint(tcd.pt4);
// shapeArgs['y'] = 200;
// shapeArgs['width'] = 22;
// shapeArgs['length'] = 44;
// shapeArgs.toolTipText = "w: 22 l: 44";
// var tcdTall = new TiltedCurvyDroplet(shapeArgs, {stroke: 'black'})
// mandala.addShape(tcdTall);
// mandala.showControlPoint(tcdTall.pt1);
// mandala.showControlPoint(tcdTall.pt2);
// mandala.showControlPoint(tcdTall.pt3);
// mandala.showControlPoint(tcdTall.pt4);


var spiral = new SpiralShape({ x: 100, y: 180, width: 80 });
mandala.addShape(spiral);
for (let i = 0; i < spiral.controlPoints.length; i++) {
    mandala.showControlPoint(spiral.controlPoints[i]);
}


//We start at the outer loop because we add a white circle at each layer
// for (let i = 2; i >= 0; i--) {
//      const randomShapeIndex = Math.floor(Math.random() * makeShapFns.length);
//     let randomWidth = sizes[i];
//     y -= randomWidth;
//     console.log(`Random width: ${randomWidth}`);
//     console.log('y: ' + y);

//     let shapeArgs = { 
//         x: mandala.centerX, 
//         y: mandala.centerY - y,
//         width: randomWidth * (1),
//         length: randomWidth, 
//         howMany: howMany(y, randomWidth),
//     }
//     console.log("shape: -----------" + makeShapFns[randomShapeIndex].name + '------');
//     let shape = makeShapFns[randomShapeIndex](shapeArgs);
//     mandala.addShape(shape);
// }

mandala.addCenteredCircle(2, 'black');


