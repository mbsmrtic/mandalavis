import { DropletShape } from "/static/js/mandala.js";
import { PalmTreeShape } from "/static/js/mandala.js";
import { SwirlShape } from "/static/js/mandala.js";
import { ArcShape } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";
import { BetweenDotsDotShape } from "/static/js/mandala.js";
import { SCurve } from "/static/js/mandala.js";
import { SShape } from "/static/js/mandala.js";
import { WaveShape } from "/static/js/mandala.js";
import { SpiralShape } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";
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



