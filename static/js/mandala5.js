import { ArcShape } from "/static/js/mandala.js";
import { SShape } from "/static/js/mandala.js";
import { DropletShape } from "/static/js/mandala.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala5", 95, 95);

mandala.addCenteredCircle(mandala.innerR);
mandala.addCenteredCircle(mandala.outerR);

// var s = new CurlyBracket({
//     x: mandala.centerX + mandala.innerR,
//     y: mandala.centerY,
//     length: 17,
//     width: 10,
//     howMany:6
// });
// mandala.addShape(s);
// mandala.addShape(new DotShape({
//     x: mandala.centerX + mandala.innerR + 2,
//     y: mandala.centerY,
//     width: 2,
//     howMany: 6
// }));

mandala.addShape(new DropletShape({
    x: mandala.centerX + mandala.innerR,
    y: mandala.centerY,
    length: mandala.outerR - mandala.innerR + 5,
    width: 10,
    angleStart: 0,
    howMany: 18
}, { fill: "none", stroke: "black", 'stroke-width': .5}));


// mandala.addShape(new SShape({
//     x: mandala.centerX + mandala.innerR, 
//     y: mandala.centerY,
//     width: 17,
//     length: 17,
//     angleStart: 0,
//     howMany: 12
// }));

mandala.addShape(new DropletShape({
    x: mandala.centerX + mandala.outerR + 4, 
    y: mandala.centerY,
    width: 20,
    length: 20,
    angleStart: 30,
    howMany: 6
}, { fill: "black", stroke: "black", 'stroke-width': .5}));


mandala.addShape(new DotShape({
    x: mandala.centerX + mandala.outerR + 14,
    y: mandala.centerY,
    width: 1.5,
    color: "white",
    angleStart: 30,
    howMany: 6
}, { fill: "white", stroke: "black", 'stroke-width': .5}));

mandala.addShape(new DotShape({
    x: mandala.centerX + mandala.outerR + 3,
    y: mandala.centerY,
    width: 1.5,
    color: "black",
    howMany: 18
}));


// layered CurlyBrackets
for (var i = 0; i < 4; i++) {
    mandala.addShape(new CurlyBracket({
        x: mandala.centerX + mandala.outerR - 3,
        y: mandala.centerY,
        length: 35 - (i * 5),
        width: 28,
        howMany: 6,
    }, {'stroke-width': .7}));    
}

// layered CurlyBrackets
for (var i = 0; i < 4; i++) {
    mandala.addShape(new CurlyBracket({
        x: mandala.centerX + mandala.outerR + 16,
        y: mandala.centerY,
        length: 26 - (i * 4),
        width: 28,
        howMany: 6,
        angleStart: 30
    }, {'stroke-width': .7}));    
}
// mandala.addShape(new DotShape({
//     x: mandala.centerX + mandala.outerR + 18,
//     y: mandala.centerY,
//     width: 1.5,
//     color: "black",
//     howMany: 24
// }));

// Arcs 
var w = 18;
var l = 18;
var xStart = mandala.centerX - w;
var yStart = mandala.centerY - mandala.outerR - 26;
mandala.addShape(new ArcShape({
    x: xStart,
    y: yStart,
    width: w,
    length: l,
    color: "black",
    howMany: 6,
    angleStart: 30
}, {'stroke': 'black', 'stroke-width': .7}));

// Dots inside the arcs
let currentX = xStart;
let currentY = yStart;
w = w * 4;
for (let i=10; i < 180; i+=20) {
    let angle = ((i * Math.PI) / 180);
    currentY = yStart - .2 * w * Math.sin(angle);
    currentX = xStart - .2 * w * Math.cos(angle) + (w/4);

    mandala.addShape(new DotShape({
        x: currentX,
        y: currentY,
        color: "black",
        width: 1,
        howMany: 6,
        angleStart: 30
        }));
}




// // layered CurlyBrackets
// for (var i = 0; i < 4; i++) {
//     mandala.addShape(new CurlyBracket({
//         x: mandala.centerX + mandala.outerR + 27,
//         y: mandala.centerY,
//         length: 25 - (i * 5),
//         width: 46,
//         howMany: 6,
//     }, {'stroke-width': .7}));    
// }

// mandala.addShape(new DotShape({
//     x: mandala.centerX + mandala.outerR + 29,
//     y: mandala.centerY,
//     width: 1.5,
//     color: "black",
//     howMany: 12,
//     angleStart: 15
// }));



// mandala.addShape(new CurlyBracket({
//     x: mandala.centerX + mandala.outerR - 3,
//     y: mandala.centerY,
//     length: 35,
//     width: 28,
//     howMany: 6,
// }, {'stroke-width': .7}));


// mandala.addShape(new CurlyBracket({
//     x: mandala.centerX + mandala.outerR - 3,
//     y: mandala.centerY,
//     length: 30,
//     width: 28,
//     howMany: 6,
// }, {'stroke-width': .7}));

// mandala.addShape(new CurlyBracket({
//     x: mandala.centerX + mandala.outerR - 3,
//     y: mandala.centerY,
//     length: 25,
//     width: 28,
//     howMany: 6,
// }, {'stroke-width': .7}));

// mandala.addShape(new CurlyBracket({
//     x: mandala.centerX + mandala.outerR - 3,
//     y: mandala.centerY,
//     length: 20,
//     width: 28,
//     howMany: 6,
// }, {'stroke-width': .7}));
