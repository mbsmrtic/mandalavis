import { Mandala } from "/static/js/mandala.js";
import { SpiralShape } from "/static/js/mandala.js";
import { DropletShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala4", 95, 95);

// Create inner circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    stroke: "black",
    fill: "none "
});

var s = new SpiralShape({
    xStart: mandala.centerX + mandala.outerR, 
    yStart: mandala.centerY,
    width: 12, 
    howMany: 15,
    angleStart: 0
});
mandala.addShape({ shape: s});

s.xStart = mandala.centerX + mandala.innerR - 1.5;
s.width = 15;
s.howMany = 6;
mandala.addShape({ shape: s});

s.xStart = mandala.centerX + mandala.outerR + 11;
s.width = 24;
s.howMany = 10;
mandala.addShape({ shape: s});

s.xStart = mandala.centerX + mandala.outerR + 29;
s.width = 15;
s.howMany = 10;
s.angleStart = 17;
mandala.addShape({ shape: s});


mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  mandala.outerR,     //64,
    stroke: "black",
    fill: "none"
});

const dropletShape = new DropletShape({
    xStart: mandala.centerX + 39,
    yStart: mandala.centerY,
    length: 25,
    width: 10,
    howMany: 10,
    angleStart: 20
});
mandala.addShape({shape: dropletShape});
