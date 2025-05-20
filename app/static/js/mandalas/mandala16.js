import { Mandala } from "/static/js/mandala.js";
import { Peapod } from "/static/js/shapes/peapod.js";
import { MandalaInteractions } from "/static/js/svg-interactions.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { CurvyDroplet, CurvyDroplets, DropletShape, TiltedCurvyDroplet } from "/static/js/shapes/droplet.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";

var mandalaNum = '16';
var mandalaId = "mandala" + mandalaNum;
const mandalaElementId = mandalaId; 
var mandala = new Mandala(mandalaElementId, 300, 300);
var interactions = new MandalaInteractions(mandalaNum);

const myData = mandala.getMandalaDataFromDOM();

// const dataElement = document.getElementById('mandala-' + mandalaNum + '-data');
// const str = dataElement.dataset.mandala;
// const validJson = str.replace(/'/g, '"');
// var myData = JSON.parse(validJson);
// myData = myData["clusters"];

const shapeConstructors = {
    ArcShape: (shapeArgs, svgAttrs) => new ArcShape(shapeArgs, svgAttrs),
    DotShape: (shapeArgs, svgAttrs) => new DotShape(shapeArgs, svgAttrs),
    SpiralShape: (shapeArgs, svgAttrs) => new SpiralShape(shapeArgs, svgAttrs),
    DottedArcShape: (shapeArgs, svgAttrs) => new DottedArcShape(shapeArgs, svgAttrs),
    CurvyDroplets: (shapeArgs, svgAttrs) => new CurvyDroplets(shapeArgs, svgAttrs),
    CurvyDroplet: (shapeArgs, svgAttrs) => new CurvyDroplet(shapeArgs, svgAttrs),
    CurlyBracket: (shapeArgs, svgAttrs) => new CurlyBracket(shapeArgs, svgAttrs),
    DropletShape:  (shapeArgs, svgAttrs) => new DropletShape(shapeArgs, svgAttrs),
    TiltedCurvyDroplet: (shapeArgs, svgAttrs) => new TiltedCurvyDroplet(shapeArgs, svgAttrs),
    default: () => { throw new Error('Unknown shape type'); }
}

if (myData && myData.length > 0){
    myData.forEach(cluster => {
        var newShape = (shapeConstructors[cluster.shape] || shapeConstructors.default)({
            offset: cluster.offset,
            width: cluster.width,
            length: cluster.length,
            howMany: cluster.data.length,
            angleStart: (cluster['angleStart'] || 0),
            toolTipText: cluster.data,
        }, (cluster['svgAttrs'] || {}));
        mandala.addShape(newShape);
    });    
}

mandala.addCenteredCircle(30, '#666', 'white'); 
