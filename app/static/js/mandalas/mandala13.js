import { Mandala, CompositeMandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SnowflakeShape } from "/static/js/shapes/snowflake.js";

function scaleFn() {
    let svg = document.getElementById('mandala13');
    let viewBox = [0, 0, 1000, 1000]; // [x, y, width, height]
    function zoom(factor) {
      viewBox[2] /= factor;
      viewBox[3] /= factor;
      svg.setAttribute('viewBox', viewBox.join(' '));
    }
    document.getElementById('zoom-in-13').onclick = () => zoom(1.1);
    document.getElementById('zoom-out-13').onclick = () => zoom(1/1.1);
}

scaleFn();

function buildThisMandala(mandala) {
    mandala.addShape(new CurvyDroplets({
        offset: 72,
        width: 25,
        length: 25,
        howMany: 10,
        toolTipText: 'outer curvy droplets'
    }))

    mandala.addShape(new DotShape({
        offset: 68,
        angleStart: 6,
        width: 5,
        howMany: 30,
        color: '#999'
    }));

    mandala.addShape(new ArcShape({
        offset: 63,
        width: 24,
        length: 13,
        howMany: 10,
        angleStart: 18,
    }, {fill: 'white'}));

    mandala.addShape(new CurlyBracket({
        offset: 55,
        width: 20,
        howMany: 10,
        toolTipText: 'curlybracket'
    }));

    mandala.addShape(new SpiralShape({
        offset: 54,
        angleStart:17,
        howMany: 10,
        toolTipText: 'spiral'
    }));

    mandala.addShape(new DottedArcShape({
        //color: '#666',
        offset: 48,
        width: 30,
        length: 10,
        howMany: 10,
        toolTipText: 'dotted arc',
    }, {fill: 'white'}));


    mandala.addShape(new TiltedCurvyDroplet({
        offset: 27,
        width: 30,
        length: 30,
        angleStart: 21,
        howMany: 10,
        toolTipText: 'tilted right',
    }, {}, false));

    mandala.addShape(new TiltedCurvyDroplet({
        offset: 18,
        width: 30,
        length: 30,
        angleStart: 19.5,
        howMany: 10,
        toolTipText: 'tilted left',
    }));
    mandala.addShape(new CurvyDroplets({offset: mandala.innerR, howMany: 10}));
}

var mandalaId = "mandala13";
// For composite mandalas, we need to know how many before we can 
//  calculate how to lay them out
var cm = new CompositeMandala(mandalaId, 470, 480);

var countInEachLayer = 6;
for (var i=0; i < countInEachLayer; i++) {
    var newMandala = cm.addMandala(i, countInEachLayer, 250, .5);
    // var snowflake = new SnowflakeShape({x: newMandala.x, y: newMandala.y});
    // snowflake.buildThisMandala(newMandala);
    buildThisMandala(newMandala);
}

for (var i=6; i < 12; i++) {
    var newMandala = cm.addMandala(12-i, countInEachLayer, 375);
    buildThisMandala(newMandala);
}

cm.addCenteredCircle(150);


