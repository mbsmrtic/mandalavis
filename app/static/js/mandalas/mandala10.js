import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";

let mandala = new Mandala("mandala10", 150, 135);


const length = 30;
var width = 15;
const howMany = 10;
mandala.addShape(new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - 70,
    width: 30,
    length: 23,
    howMany: howMany,
}));
mandala.addShape(new DotShape({ 
    x: mandala.centerX, 
    y: mandala.centerY - 95, 
    width: 4,
    howMany: howMany
}));

mandala.addShape(new DottedArcShape({
    x: mandala.centerX,
    y: mandala.centerY - 55,
    width: 40,
    howMany: howMany,
}, { fill: 'none'}));
var curvyDroplet = new CurvyDroplets({
    x: mandala.centerX,
    y: mandala.centerY - 27,
    width: width,
    length: length,
    color: '#333',
    howMany: howMany,
});
mandala.addShape(curvyDroplet);


mandala.addShape(new CurvyDroplets({
    x: mandala.centerX,
    y: mandala.centerY - 62,
    width: 20,
    length: 42,
    howMany: howMany,
    angleStart: 18,
}));
mandala.addShape(new CurvyDroplets({
    x: mandala.centerX,
    y: mandala.centerY - 105,
    width: 20,
    length: 20,
    howMany: 50,
}));
mandala.addShape(new DropletShape({
    x: mandala.centerX,
    y: mandala.centerY - 122,
    width: 20,
    length: 20,
    howMany: 50,
    angleStart: 3.5
}))
mandala.addCenteredCircle(30, "black", "white");
