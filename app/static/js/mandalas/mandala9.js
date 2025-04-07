import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { DropletShape, TiltedDropletShape, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";

let mandala = new Mandala("mandala9", 100, 120);

mandala.addShape(new WaveShape({
    x: mandala.centerX,
    y: mandala.centerY - 71,
    width: 40,
    length: 40,
    color: '#333',
    howMany: 12,
    toolTipText: 'a wave'
}));
mandala.addCenteredCircle(70, 'white', 'white');

let length = 30;
let width = 20;
mandala.addShape(new PottedPlant({
    x: mandala.centerX,
    y: mandala.centerY - 47,
    width: width,
    length: length,
    color: 'none',
    howMany: 8,
    toolTipText: 'outer potted plant'
}, {stroke: '#666'}));

    
mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - 41,
    width: 2,
    howMany: 8,
}));

mandala.addShape(new DottedArcShape({
    x: mandala.centerX,
    y: mandala.centerY - 43,
    width: 31,
    angleStart: 22,
    howMany: 8,
    toolTipText: 'dotted arc'
}));

// mandala.addShape(new SpiralShape({
//     x: mandala.centerX - 1,
//     y: mandala.centerY - 35,
//     angleStart: 22,
//     howMany: 8
// }));

mandala.addShape(new PottedPlant({
    x: mandala.centerX,
    y: mandala.centerY - 20,
    width: width - 4,
    length: length - 7,
    color: 'none',
    howMany: 8,
    angleStart: 22,
    toolTipText: 'inner potted plant'
}, {stroke: '#666'}));

mandala.addShape(new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - 20,
    howMany:8,
    toolTipText: 'curly bracket'
}));


mandala.addCenteredCircle(20);
