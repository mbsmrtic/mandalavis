import { DropletShape } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";
import { WaveShape } from "/static/js/mandala.js";
import { SpiralShape } from "/static/js/mandala.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";

let mandala = new Mandala("mandala7");
mandala.innerR = 12;

// outermost circles
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
}));
mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - 56,
    width: 2,
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
    x: mandala.centerX + 26,
    y: mandala.centerY,
    width: 10,
    length: 14,
    // angleStart: 20,
    howMany: 10,
}, { fill: 'white'}));
mandala.addShape(new DotShape({
    x: mandala.centerX + 36,
    y: mandala.centerY,
    width: 1,
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
    length: -15, width: 10,
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
mandala.addShape(new DotShape({width: 2, x: mandala.centerX, y: mandala.centerY}));
mandala.addShape(new DropletShape({
    x: mandala.centerX, y: mandala.centerY - 9, 
    length: -9, width: 5,
    howMany: 8
}));

