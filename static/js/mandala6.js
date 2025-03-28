import { ArcShape } from "/static/js/mandala.js";
import { SShape } from "/static/js/mandala.js";
import { DropletShape } from "/static/js/mandala.js";
import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/mandala.js";
import { DotShape } from "/static/js/mandala.js";
import { SpiralShape } from "/static/js/mandala.js";

const mandala = new Mandala("mandala6", 115, 105);


// mandala.addShape(new SpiralShape({
//     x: mandala.centerX, 
//     y: mandala.centerY - mandala.outerR + 1.4,
//     width: 25, 
//     toolTipText: 'A spiral',
//     color: 'red'
// }));

var colors = ['#3674B5', '#A1E3F9', '#D1F8EF', '#578FCA']

for (var layer=5; layer >= 0; layer--) {
    colors.forEach((color, i) => {
        mandala.addShape(new CurlyBracket({
            x: mandala.centerX + mandala.outerR + layer * 8,
            y: mandala.centerY,
            width: 30,
            length: 34 - i * 5,
            howMany: 8,
            angleStart: (layer % 2) == 0 ? 0 : 22.5,
            toolTipText: 'Layer: ' + layer + ' Color: ' + color,
        }, { fill: color, stroke: color}));
    });     
}

mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR - 11,
    width: 2,
    howMany: 8,
}));

mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR - 19,
    width: 2,
    howMany: 8,
    angleStart: 22.5,
}));


const howMany = 8;
mandala.addCenteredCircle(mandala.outerR, '#A1E3F9', '#A1E3F9');
var cb = new CurlyBracket({
    x: mandala.centerX + mandala.innerR - 1,
    y: mandala.centerY,
    length: mandala.innerR + 8,
    width: 10,
    howMany: howMany,
    toolTipText: 'A dark blue curly bracket',
}, { fill: '#3674B5', stroke: '#3674B5'});

mandala.addShape(cb);

mandala.addShape(new CurlyBracket({
    x: mandala.centerX + mandala.innerR - 2,
    y: mandala.centerY,
    length: mandala.innerR + 5,
    width: 10,
    howMany: howMany,
    toolTipText: 'A light blue curly bracket',
}, { fill: '#A1E3F9', stroke: '#A1E3F9'}));
mandala.addShape(new CurlyBracket({
    x: mandala.centerX + mandala.innerR - 2,
    y: mandala.centerY,
    length: mandala.innerR + 1,
    width: 10,
    howMany: howMany,
    toolTipText: 'A light green curly bracket',
}, { fill: '#D1F8EF', stroke: '#D1F8EF'}));

mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR + 4,
    width: 3,
    color: "#3674B5",
    howMany: howMany,
    angleStart: 22.5
}))
mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.innerR - 4,
    width: 1,
    howMany: 8,
}));


mandala.addCenteredCircle(mandala.innerR, '#3674B5', '#3674B5');

