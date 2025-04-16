import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { Snowflake } from "/static/js/shapes/snowflake.js";

function scaleFn() {
    let svg = document.getElementById('mandala11');
    let viewBox = [0, 0, 1000, 1000]; // [x, y, width, height]
    function zoom(factor) {
      viewBox[2] /= factor;
      viewBox[3] /= factor;
      svg.setAttribute('viewBox', viewBox.join(' '));
    }
    document.getElementById('zoom-in').onclick = () => zoom(1.1);
    document.getElementById('zoom-out').onclick = () => zoom(1/1.1);
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
        width: 3,
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
for (var xIndex=1; xIndex < 10; xIndex++) {
    for (var yIndex=1; yIndex < 10; yIndex++) {
        buildThisMandala(new Mandala("mandala11", xIndex*200, yIndex* 200));
    }
}
// buildThisMandala(new Mandala("mandala11", 290, 100));
// buildThisMandala(new Mandala("mandala11", 500, 190));
// buildThisMandala(new Mandala("mandala11", 290, 320));    
// buildThisMandala(new Mandala("mandala11", 85, 340));
// buildThisMandala(new Mandala("mandala11", 170, 550));
// buildThisMandala(new Mandala("mandala11", 290, 680));
// buildThisMandala(new Mandala("mandala11", 290, 100));

// let mandala3 = new Mandala("mandala11", 100, 100);
// mandala3.addCenteredCircle(mandala3.innerR);
// mandala3.addShape(new Snowflake({ howMany: 4}));


