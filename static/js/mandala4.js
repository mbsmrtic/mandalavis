import { Mandala } from "/static/js/mandala.js";
import { SpiralShape } from "/static/js/mandala.js";
import { DropletShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala4", 95, 95);

// Create inner circle
mandala.addCenteredCircle(mandala.innerR);

var s = new SpiralShape({
    x: mandala.centerX + mandala.outerR, 
    y: mandala.centerY,
    width: 12, 
    howMany: 15,
    angleStart: 0
});
mandala.addShape(s);

s.x = mandala.centerX + mandala.innerR - 1.5;
s.width = 15;
s.howMany = 6;
mandala.addShape(s);

s.x = mandala.centerX + mandala.outerR + 11;
s.width = 24;
s.howMany = 10;
mandala.addShape(s);

s.x = mandala.centerX + mandala.outerR + 29;
s.width = 15;
s.howMany = 10;
s.angleStart = 17;
mandala.addShape(s);


mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  mandala.outerR,     //64,
    stroke: "black",
    fill: "none"
});

const dropletShape = new DropletShape({
    x: mandala.centerX + 39,
    y: mandala.centerY,
    length: 25,
    width: 10,
    howMany: 10,
    angleStart: 20
});
mandala.addShape(dropletShape);
