import { DropletShape } from "/static/js/shapes/droplet.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";

let mandala = new Mandala("mandala8");
mandala.innerR = 12;

// outermost circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  62,
    stroke: "black",
    fill: "white"
});
// Outer waves
mandala.addShape(new WaveShape({
    x: mandala.centerX, 
    y: mandala.centerY - 43,
    width: 26, 
    howMany: 12,
    toolTipText: 'a wave'
}));
mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - 54,
    width: 4,// 2.5,
    angleStart: 12,
    howMany: 12,
}));

// circles
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  42,     //64,
    stroke: "black",
    fill: "white"
});

mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  40,     //64,
    stroke: "black",
    fill: "white"
});

mandala.addShape(new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - 26,
    width: 10,
    length: 14,
    angleStart: 18,
    howMany: 10,
}, { fill: 'white'}));
mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - 35,
    width: 2, // 1.25,
    angleStart: 10,
    howMany: 20,
}));

// circle around inner waves
mandala.addCenteredCircle(23);
mandala.addCenteredCircle(25);
//outer petals
mandala.addShape(new DropletShape({
    x: mandala.centerX,
    y:mandala.centerY - 37,
    length: -19, width: 10,
    howMany: 10,
}));

// inner waves
mandala.addShape(new WaveShape({
    x: mandala.centerX - 1, 
    y: mandala.centerY - mandala.innerR,
    width: 15, 
    howMany: 6
}));


// Create inner circle
mandala.addCenteredCircle(mandala.innerR, 'black', 'white');
// flower shape in the center
mandala.addShape(new DotShape({width: 4, x: mandala.centerX, y: mandala.centerY + 2}));
mandala.addShape(new DropletShape({
    x: mandala.centerX, y: mandala.centerY - 9, 
    length: -13, width: 5,
    howMany: 8
}));

