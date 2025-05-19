//Goals for this mandala:  
//   use new shape factory
//   use a fake citation network - on highlight - show papers that cite the highlighted paper

import { Mandala } from "/static/js/mandala.js"
import { MandalaInteractions } from "/static/js/svg-interactions.js";
import { createShape } from "/static/js/shapes/shapefactory.js";

var mandalaNum = '17';
const mandalaElementId = "mandala" + mandalaNum; 
var mandala = new Mandala(mandalaElementId, 300, 300);
var interactions = new MandalaInteractions(mandalaNum);

const myData = mandala.getMandalaDataFromDOM();

if (myData && myData.length > 0){
    myData.forEach(cluster => {
        var svgAttrs = cluster['svgAttrs'] || null;
        var newShape = createShape(cluster.shape, {
            offset: cluster.offset,
            width: cluster.width,
            length: cluster.length,
            howMany: cluster.data.length,
            angleStart: (cluster['angleStart'] || 0),
            toolTipText: cluster.data,
        }, svgAttrs);
        mandala.addShape(newShape);
    });    
}
