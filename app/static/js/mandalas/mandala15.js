import { Mandala } from "/static/js/mandala.js";
import { Peapod } from "/static/js/shapes/peapod.js";
import { initInteractions } from "/static/js/svg-interactions.js";
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { CurvyDroplet, CurvyDroplets } from "/static/js/shapes/droplet.js";
import { DottedArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { ArcShape } from "/static/js/shapes/arc.js";

var mandalaNum = '15';
var mandalaId = "mandala" + mandalaNum;
const mandalaElementId = mandalaId; // `${mandalaId}-main`;

initInteractions(mandalaNum);

var mandala = new Mandala(mandalaElementId, 200, 200);
var cd = new CurvyDroplet({
    offset: 40,
    width: 60,
    length: 60,
    howMany: 15
});
mandala.addShape(cd);
// mandala.showControlPoint(cd.pt1);
// mandala.showControlPoint(cd.pt2);
// mandala.showControlPoint(cd.pt3);
// mandala.showControlPoint(cd.pt4);
mandala.addShape(new CurvyDroplet({
    offset: 65,
    width: 60,
    length: 60,
    howMany: 15,
    angleStart: 12
}));
mandala.addShape(new CurvyDroplets({
    offset: 105,
    width: 80,
    length: 80,
    howMany: 15,
}));
mandala.addShape(new CurlyBracket({
    offset: 20,
    width: 25,
    length: 35,
    howMany: 6,
    // angleStart: 11
}, { stroke: '#666', 'stroke-width': 2}));
mandala.addCenteredCircle(15);
// mandala.addShape(new DottedArcShape({
//     offset: 240,
//     width: 100,
//     length: 35,
//     howMany: 15,
//     angleStart: 11
// }, { stroke: '#666', 'stroke-width': 2}));
mandala.addShape(new SpiralShape({
    offset: 200,
    width: 50,
    length: 50,
    howMany: 15,
    angleStart: 10
}));
mandala.addShape(new DottedArcShape({
    offset: 175,
    width: 75,
    length: 35,
    howMany: 15,
}, { stroke: '#666', 'stroke-width': 2}));
var ds = new DotShape({
    offset: 210,
    width: 20,
    length: 20,
    howMany: 15,
    angleStart: 23
});
mandala.addShape(ds);
// mandala.addShape(new BetweenDotsDotShape(ds));

// mandala.addShape(new Peapod({
//     offset: 60,
//     width: 85,
//     length: 85,
//     howMany: 1,
//     toolTipText: 'peapod'
// }));

// mandala.addDot(20, 60);
// mandala.addDot(100, 10);
// mandala.addDot(180, 60);
// mandala.addDot(100, 110);

// mandala.addShape(new DotShape({
//     offset: 90,
//     width: 22,
//     length: 22,
//     howMany: 1,
// }));
