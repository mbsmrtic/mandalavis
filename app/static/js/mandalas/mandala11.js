import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";

let mandala = new Mandala("mandala11", 150, 135);

mandala.addShape(new CurvyDroplets({howMany: 10}));
mandala.addShape(new CurlyBracket({
    offset: 64,
    width: 30,
    length: 20,
    color: 'black',
    howMany: 15,
}));

mandala.addShape(new DottedArcShape({
    //color: '#666',
    offset: 18,
    width: 20,
    length: 10,
    howMany: 10
}));
mandala.addShape(new TiltedCurvyDroplet({
    offset: 18,
    width: 30,
    length: 30,
    angleStart: 18,
    howMany: 10,
}));
mandala.addShape(new DotShape({
    offset: 30,
    width: 4,
    angleStart: 26,
    howMany: 10
}));
mandala.addCenteredCircle(53);
var shapeArgs = {
    width: 30,
    length: 30,
    howMany: 15,
    angleStart: 0,
    offset: 41    
};
mandala.addShape(new TiltedCurvyDroplet(shapeArgs, {}, true));
mandala.addShape(new TiltedCurvyDroplet(shapeArgs, {}, false));
shapeArgs.offset = 46;
shapeArgs.width = 5;
shapeArgs.length = 5;
shapeArgs.angleStart = 12;
shapeArgs.color = 'none'
// shapeArgs.howMany = 1;
var ds = new DotShape({
    offset: 46,
    width: 5,
    length: 5,
    angleStart: 12,
    color: 'none',
    howMany: 15,
}, { stroke: '#666'});
mandala.addShape(ds);
ds.color = 'black';
var bds = new BetweenDotsDotShape(ds);
mandala.addShape(bds);

