import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";

let mandala = new Mandala("mandala11", 150, 135);

let shapeArgs = {
    x: mandala.centerX,
    y: mandala.centerY - 35,
    width: 25,
    length: 25,
    howMany: 15,
    toolTipText: " ",
    angleStart: 12,
}
mandala.addShape(new CurvyDroplet(shapeArgs));

shapeArgs = {
    x: mandala.centerX,
    y: mandala.centerY - 30,
    width: 13,
    length: 20,
    howMany: 15,
    toolTipText: " "
}
// mandala.addShape(new CurlyBracket(shapeArgs));
// mandala.addCenteredCircle(30, "black", "white");
