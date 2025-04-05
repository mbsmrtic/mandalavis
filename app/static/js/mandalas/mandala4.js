import { Mandala } from "/static/js/mandala.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { DropletShape } from "/static/js/shapes/droplet.js";

const mandala = new Mandala("mandala4", 95, 95);

var s = new SpiralShape({
    x: mandala.centerX, 
    y: mandala.centerY - mandala.outerR - 29,
    width: 15, 
    howMany: 10,
    angleStart: 0
});
mandala.addShape(s);

s.y = mandala.centerY - mandala.outerR - 11;
s.width = 24;
s.howMany = 10;
s.angleStart = 18;
mandala.addShape(s);

s.y = mandala.centerY - mandala.outerR - 1;
s.width = 12;
s.howMany = 15;
s.angleStart = 17;
mandala.addShape(s);

s.y = mandala.centerY - mandala.innerR + .5;
s.width = 15;
s.howMany = 6;
s.angleStart = 30;
mandala.addShape(s);

// Create inner circle
mandala.addCenteredCircle(mandala.innerR);


mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  mandala.outerR,     //64,
    stroke: "black",
    fill: "none"
});

const dropletShape = new DropletShape({
    x: mandala.centerX + 2,
    y: mandala.centerY - 39,
    length: 21,
    width: 10,
    howMany: 10,
});
mandala.addShape(dropletShape);
