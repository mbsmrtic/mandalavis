import { Mandala } from "/static/js/mandala.js";
import { Peapod } from "/static/js/shapes/peapod.js";
import { MandalaInteractions } from "/static/js/svg-interactions.js";
import { DotShape } from "/static/js/shapes/dot.js";
import { CurvyDroplet, CurvyDroplets } from "/static/js/shapes/droplet.js";
import { DottedArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";

var mandalaNum = '15';
var mandalaId = "mandala" + mandalaNum;
const mandalaElementId = mandalaId; 
var mandala = new Mandala(mandalaElementId, 300, 300);
var interactions = new MandalaInteractions(mandalaNum);

var myData = 
    [
        {   "clustername": "cluster 0", 
            "shape": "CurlyBracket",
            "offset": 240.5,
            width: 60,
            length: 60,
            angleStart: 23,
            svgAttrs: {stroke: '#666', 'stroke-width': 2},
            "data": [
                { "desc": "curly bracket first data item in cluster 0" },
                { "desc": "curly bracket second data item in cluster 0" },
                { "desc": "curly bracket third data item in cluster 0" },
                { "desc": "curly bracket fourth data item in cluster 0" },
                { "desc": "curly bracket fifth data item in cluster 0" },
                { "desc": "curly bracket sixth data item in cluster 0" },
                { "desc": "curly bracket seventh data item in cluster 0" },
                { "desc": "curly bracket eighth data item in cluster 0" },
                { "desc": "curly bracket ninth data item in cluster 0" },
                { "desc": "curly bracket tenth data item in cluster 0" },
                { "desc": "curly bracket eleventh data item in cluster 0" },
                { "desc": "curly bracket twelfth data item in cluster 0" },
                { "desc": "curly bracket thirteenth data item in cluster 0" },
                { "desc": "curly bracket fourteenth data item in cluster 0" },
                { "desc": "curly bracket fifteenth data item in cluster 0" },
            ]
        },
        {   "clustername": "cluster 7", //dots
            "shape": "DotShape",
            "offset": 255,
            width: 16,
            length: 16,
            angleStart: 11,
            "data": [
                { "desc": "dot first data item in cluster 7" },
                { "desc": "dot second data item in cluster 7" },
                { "desc": "dot third data item in cluster 7" },
                { "desc": "dot fourth data item in cluster 7" },
                { "desc": "dot fifth data item in cluster 7" },
                { "desc": "dot sixth data item in cluster 7" },
                { "desc": "dot seventh data item in cluster 7" },
                { "desc": "dot eighth data item in cluster 7" },
                { "desc": "dot ninth data item in cluster 7" },
                { "desc": "dot tenth data item in cluster 7" },
                { "desc": "dot eleventh data item in cluster 7" },
                { "desc": "dot twelfth data item in cluster 7" },
                { "desc": "dot thirteenth data item in cluster 7" },
                { "desc": "dot fourteenth data item in cluster 7" },
                { "desc": "dot fifteenth data item in cluster 7" },
                { "desc": "dot sixteenth data item in cluster 7" },
                { "desc": "dot seventeenth data item in cluster 7" },
                { "desc": "dot eightteenth data item in cluster 7" },
                { "desc": "dot nineteenth data item in cluster 7" },
                { "desc": "dot twentieth data item in cluster 7" },
                { "desc": "dot twentyfirst data item in cluster 7" },
                { "desc": "dot twentysecond data item in cluster 7" },
                { "desc": "dot twentythird data item in cluster 7" },
                { "desc": "dot twentyfourth data item in cluster 7" },
                { "desc": "dot twentyfifth data item in cluster 7" },
                { "desc": "dot twentysixth data item in cluster 7" },
                { "desc": "dot twentyseventh data item in cluster 7" },
                { "desc": "dot twentyeighth data item in cluster 7" },
                { "desc": "dot twentyninth data item in cluster 7" },
                { "desc": "dot thirtyeth data item in cluster 7" },
            ]
        },
        {   "clustername": "cluster 1", //dots
            "shape": "DotShape",
            "offset": 214,
            width: 32,
            length: 32,
            angleStart: 23,
            "data": [
                { "desc": "dot first data item in cluster 1" },
                { "desc": "dot second data item in cluster 1" },
                { "desc": "dot third data item in cluster 1" },
                { "desc": "dot fourth data item in cluster 1" },
                { "desc": "dot fifth data item in cluster 1" },
                { "desc": "dot sixth data item in cluster 1" },
                { "desc": "dot seventh data item in cluster 1" },
                { "desc": "dot eighth data item in cluster 1" },
                { "desc": "dot ninth data item in cluster 1" },
                { "desc": "dot tenth data item in cluster 1" },
                { "desc": "dot eleventh data item in cluster 1" },
                { "desc": "dot twelfth data item in cluster 1" },
                { "desc": "dot thirteenth data item in cluster 1" },
                { "desc": "dot fourteenth data item in cluster 1" },
                { "desc": "dot fifteenth data item in cluster 1" },
            ]
        },
        { "clustername": "cluster 2 ",  //spiral
            "shape": "SpiralShape",
            "offset": 200,
            width: 50,
            length: 50,
            angleStart: 10,
            svgAttrs: { stroke: '#666', 'stroke-width': 2, 'fill': 'white'},
            "data": [
                { "desc": "spiral first data item in cluster 2" },
                { "desc": "spiral second data item in cluster 2" },
                { "desc": "spiral third data item in cluster 2" },
                { "desc": "spiral fourth data item in cluster 2" },
                { "desc": "spiral fifth data item in cluster 2" },
                { "desc": "spiral sixth data item in cluster 2" },
                { "desc": "spiral seventh data item in cluster 2" },
                { "desc": "spiral eighth data item in cluster 2" },
                { "desc": "spiral ninth data item in cluster 2" },
                { "desc": "spiral tenth data item in cluster 2" },
                { "desc": "spiral eleventh data item in cluster 2" },
                { "desc": "spiral twelfth data item in cluster 2" },
                { "desc": "spiral thirteenth data item in cluster 2" },
                { "desc": "spiral fourteenth data item in cluster 2" },
                { "desc": "spiral fifteenth data item in cluster 2" },
            ]
        }, {"clustername": "cluster 3",  //dotted arc
            "shape": "DottedArcShape",
            "offset": 175,
            width: 75,
            length: 35,
            svgAttrs: {stroke: '#666', 'stroke-width': 2},
            "stroke-width": 2,
            "data": [
                { "desc": "dotted arc first data item in cluster 3" },
                { "desc": "dotted arc second data item in cluster 3" },
                { "desc": "dotted arc third data item in cluster 3" },
                { "desc": "dotted arc fourth data item in cluster 3" },
                { "desc": "dotted arc fifth data item in cluster 3" },
                { "desc": "dotted arc sixth data item in cluster 3" },
                { "desc": "dotted arc seventh data item in cluster 3" },
                { "desc": "dotted arc eighth data item in cluster 3" },
                { "desc": "dotted arc ninth data item in cluster 3" },
                { "desc": "dotted arc tenth data item in cluster 3" },
                { "desc": "dotted arc eleventh data item in cluster 3" },
                { "desc": "dotted arc twelfth data item in cluster 3" },
                { "desc": "dotted arc thirteenth data item in cluster 3" },
                { "desc": "dotted arc fourteenth data item in cluster 3" },
                { "desc": "dotted arc fifteenth data item in cluster 3" },
            ]
        }, {"clustername": "cluster 4",  //curvy droplets
            "shape": "CurvyDroplets",
            "offset": 105,
            width: 80,
            length: 80,
            "data": [
                { "desc": "curvy droplets first data item in cluster 4" },
                { "desc": "curvy droplets second data item in cluster 4" },
                { "desc": "curvy droplets third data item in cluster 4" },
                { "desc": "curvy droplets fourth data item in cluster 4" },
                { "desc": "curvy droplets fifth data item in cluster 4" },
                { "desc": "curvy droplets sixth data item in cluster 4" },
                { "desc": "curvy droplets seventh data item in cluster 4" },
                { "desc": "curvy droplets eighth data item in cluster 4" },
                { "desc": "curvy droplets ninth data item in cluster 4" },
                { "desc": "curvy droplets tenth data item in cluster 4" },
                { "desc": "curvy droplets eleventh data item in cluster 4" },
                { "desc": "curvy droplets twelfth data item in cluster 4" },
                { "desc": "curvy droplets thirteenth data item in cluster 4" },
                { "desc": "curvy droplets fourteenth data item in cluster 4" },
                { "desc": "curvy droplets fifteenth data item in cluster 4" },
            ]
        }, {"clustername": "cluster 5",  //curvy droplet
            "shape": "CurvyDroplet",
            "offset": 65,
            width: 60,
            length: 60,
            angleStart: 12,
            "data": [
                { "desc": "curvy droplet first data item in cluster 5" },
                { "desc": "curvy droplet second data item in cluster 5" },
                { "desc": "curvy droplet third data item in cluster 5" },
                { "desc": "curvy droplet fourth data item in cluster 5" },
                { "desc": "curvy droplet fifth data item in cluster 5" },
                { "desc": "curvy droplet sixth data item in cluster 5" },
                { "desc": "curvy droplet seventh data item in cluster 5" },
                { "desc": "curvy droplet eighth data item in cluster 5" },
                { "desc": "curvy droplet ninth data item in cluster 5" },
                { "desc": "curvy droplet tenth data item in cluster 5" },
                { "desc": "curvy droplet eleventh data item in cluster 5" },
                { "desc": "curvy droplet twelfth data item in cluster 5" },
                { "desc": "curvy droplet thirteenth data item in cluster 5" },
                { "desc": "curvy droplet fourteenth data item in cluster 5" },
                { "desc": "curvy droplet fifteenth data item in cluster 5" },
            ]
        }, {"clustername": "cluster 6",  //curvy droplet
            "shape": "CurvyDroplet",
            "offset": 40,
            width: 60,
            length: 60,
            "data": [
                { "desc": "curvy droplet first data item in cluster 6" },
                { "desc": "curvy droplet second data item in cluster 6" },
                { "desc": "curvy droplet third data item in cluster 6" },
                { "desc": "curvy droplet fourth data item in cluster 6" },
                { "desc": "curvy droplet fifth data item in cluster 6" },
                { "desc": "curvy droplet sixth data item in cluster 6" },
                { "desc": "curvy droplet seventh data item in cluster 6" },
                { "desc": "curvy droplet eighth data item in cluster 6" },
                { "desc": "curvy droplet ninth data item in cluster 6" },
                { "desc": "curvy droplet tenth data item in cluster 6" },
                { "desc": "curvy droplet eleventh data item in cluster 6" },
                { "desc": "curvy droplet twelfth data item in cluster 6" },
                { "desc": "curvy droplet thirteenth data item in cluster 6" },
                { "desc": "curvy droplet fourteenth data item in cluster 6" },
                { "desc": "curvy droplet fifteenth data item in cluster 6" },
            ]
        },
    ];

const shapeConstructors = {
    DotShape: (shapeArgs, svgAttrs) => new DotShape(shapeArgs, svgAttrs),
    SpiralShape: (shapeArgs, svgAttrs) => new SpiralShape(shapeArgs, svgAttrs),
    DottedArcShape: (shapeArgs, svgAttrs) => new DottedArcShape(shapeArgs, svgAttrs),
    CurvyDroplets: (shapeArgs, svgAttrs) => new CurvyDroplets(shapeArgs, svgAttrs),
    CurvyDroplet: (shapeArgs, svgAttrs) => new CurvyDroplet(shapeArgs, svgAttrs),
    CurlyBracket: (shapeArgs, svgAttrs) => new CurlyBracket(shapeArgs, svgAttrs),
    default: () => { throw new Error('Unknown shape type'); }
}

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

mandala.addCenteredCircle(40); 
