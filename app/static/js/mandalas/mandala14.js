import { Mandala, CompositeMandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { Snowflake } from "/static/js/shapes/snowflake.js";

//Our center mandala starts life as an image we'll draw it on zoom
var isImage = true; 
function scaleFn() {
    let svg = document.getElementById('mandala14');
    let viewBox = [0, 0, 1000, 1000]; // [x, y, width, height]
    function zoom(factor) {
        var newWidth = viewBox[2] / factor;
        var widthDiff = viewBox[2] - newWidth;
        viewBox[0] += widthDiff/2; //x
        viewBox[2] = newWidth;
        var newHeight = viewBox[3] / factor;
        var heightDiff = viewBox[3] - newHeight;
        viewBox[1] += heightDiff/2; //y
        viewBox[3] = newHeight;
        svg.setAttribute('viewBox', viewBox.join(' '));
        if (isImage && newWidth < 200) {
            centerSnowflake.buildThisMandala(mandala);
            isImage = false;
        }
    }
    document.getElementById('zoom-in').onclick = () => zoom(1.1);
    document.getElementById('zoom-out').onclick = () => zoom(1/1.1);
}

scaleFn();

// const zoom = d3.zoom().on("zoom", (event) => {
//     d3.select("svg").attr("transform", event.transform);
//   });
//   d3.select("svg").call(zoom);
  
//   document.getElementById('zoom-in').onclick = () => {
//     d3.select("svg").transition().call(zoom.scaleBy, 1.2);
//   };
//   document.getElementById('zoom-out').onclick = () => {
//     d3.select("svg").transition().call(zoom.scaleBy, 1/1.2);
//   };
  


var mandalaId = "mandala14";
let mandala = new Mandala(mandalaId, 470, 480);
mandala.addShape(new Snowflake({
    offset: 360,
    howMany: 6,
    angleStart: 31,
}));
mandala.addShape(new Snowflake({
    offset: 210,
    howMany: 6
}));
mandala.addCenteredCircle(120, "black", "white");
var centerSnowflake = new Snowflake({
    offset: 0,
    width: 100,
    length: 100
});
mandala.addShape(centerSnowflake);
