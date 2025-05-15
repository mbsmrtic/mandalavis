import { Mandala } from "/static/js/mandala.js";
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { DotShape } from "/static/js/shapes/dot.js";

const mandala = new Mandala("mandala7", 70, 100); //, 115, 105);

var colors = ['#3674B5', '#A1E3F9', '#D1F8EF', '#578FCA']

for (var layer=5; layer >= 0; layer--) {
    colors.forEach((color, i) => {
        mandala.addShape(new CurlyBracket({
            x: mandala.centerX ,
            y: mandala.centerY - mandala.outerR - layer * 8,
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
    y: mandala.centerY - mandala.outerR - 9, //8.5,
    width: 4, //3.5, //2.5,
    howMany: 8,
    color: 'black'
}));

mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR - 17,
    width: 4, // 3.5, //2.5,
    howMany: 8,
    angleStart: 22.5,
    color: 'black'
}));


const howMany = 8;
mandala.addCenteredCircle(mandala.outerR, '#A1E3F9', '#A1E3F9');
var cb = new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - mandala.innerR - 1,
    length: mandala.innerR + 8,
    width: 10,
    howMany: howMany,
    toolTipText: 'A dark blue curly bracket',
}, { fill: '#3674B5', stroke: '#3674B5'});

mandala.addShape(cb);

mandala.addShape(new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - mandala.innerR + 2,
    length: mandala.innerR + 5,
    width: 10,
    howMany: howMany,
    toolTipText: 'A light blue curly bracket',
}, { fill: '#A1E3F9', stroke: '#A1E3F9'}));
mandala.addShape(new CurlyBracket({
    x: mandala.centerX,
    y: mandala.centerY - mandala.innerR + 2,
    length: mandala.innerR + 1,
    width: 10,
    howMany: howMany,
    toolTipText: 'A light green curly bracket',
}, { fill: '#D1F8EF', stroke: '#D1F8EF'}));

mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.outerR + 7,
    width: 6, // 3.75,
    color: "#3674B5",
    howMany: howMany,
    angleStart: 22.5,
    color: 'black'
}))
mandala.addShape(new DotShape({
    x: mandala.centerX,
    y: mandala.centerY - mandala.innerR - 3,
    width: 1.8, //1.2,
    howMany: 8,
    color: 'black'
}));


mandala.addCenteredCircle(mandala.innerR, '#3674B5', '#3674B5');

