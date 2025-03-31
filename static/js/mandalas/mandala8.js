import { DropletShape } from "/static/js/shapes/droplet.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { SwirlShape } from "/static/js/shapes/swirl.js";
import { ArcShape } from "/static/js/shapes/arc.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { SCurve } from "/static/js/shapes/scurve.js";
import { SShape } from "/static/js/shapes/s.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { Mandala } from "/static/js/mandala.js";

let mandala = new Mandala("mandala8");

let makeShapFns = [
    function droplet(yOffset, width) {
        return new DropletShape({
            x: mandala.centerX,
            y: mandala.centerY - yOffset,
            length: 15,
            width: width,
            howMany: yOffset / 2
        })
    },
    // function palmTree() {

    // },
    function spiral(yOffset, width) {
        return new SpiralShape({
            x: mandala.centerX,
            y: mandala.centerY - yOffset,
            width: width,
            howMany: yOffset /3
        })
    },
    // function arc() {

    // },
    function dot(yOffset, width) {
        return new DotShape({
            x: mandala.centerX,
            y: mandala.centerY - yOffset,
            width: width / 2,
            howMany: yOffset / 3
        });
    },
    // function betweenDotsDot() {

    // },
    function wave(yOffset, width) {
        return (new WaveShape({
            x: mandala.centerX,
            y: mandala.centerY - yOffset,
            width: width,
            howMany: yOffset / 3
        }));
    }
];

mandala.addCenteredCircle(19);

for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * makeShapFns.length);
    let shape = makeShapFns[randomNumber](i * 12, i * 4);
    mandala.addShape(shape);
}



