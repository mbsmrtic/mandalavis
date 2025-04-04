import { Mandala } from "/static/js/mandala.js";
import { DotShape } from "/static/js/shapes/dot.js"
import { DottedArcShape } from "/static/js/shapes/arc.js";
import { ArcShape } from "/static/js/shapes/arc.js";

let mandala = new Mandala("mandala8", 180, 150);

//Add a grouped shape
// var grouping = new GroupedShape({
//     x: mandala.centerX + 7, 
//     y: mandala.centerY - 20,
//     toolTipText: "This is a grouped shape",
//     howMany: 7,
// });

//     const adot = new DotShape({
//         x: mandala.centerX, 
//         y: mandala.centerY - 30, 
//         width: 5,
//         color: '#111',
//     });
//     grouping.addShape(adot);

//     const anotherDot = new DotShape({
//         x: mandala.centerX, 
//         y: mandala.centerY - 40, 
//         width: 5, 
//         color: '#111',
//     });
//     grouping.addShape(anotherDot);

// mandala.addGroupedShape(grouping);
// mandala.addElement("ellipse", {
//     cx: mandala.centerX,
//     cy: mandala.centerY - 48,
//     rx:  15,
//     ry: 30,
//     stroke: "black",
//     fill: "white"
// });

//Add an arc lined with circles?
mandala.addShape(new DottedArcShape({
    x: mandala.centerX, 
    y: mandala.centerY - 44,
    width: 50,
    length: 25, // 15,
    howMany: 10,
    toolTipText: 'woobly'
}));

// inner circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  50,
    stroke: "black",
    fill: "white"
});

