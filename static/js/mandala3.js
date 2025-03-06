import { Mandala } from "/static/js/mandala.js";

const mandala = new Mandala("mandala3");

mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: 65,
    fill: "black",
    'stroke-width': .3,
    stroke: "black"
});



// Create inner circle
mandala.makeGradient("purple", "black", "m3Gradient");
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    fill: "url(#m3Gradient)"
});

// todo - look at the colors that I used in my icon 
//  maybe use those colors

// #ced7d8 
// #ff6b6b 
// #118ab2 
// circle of dots
var r = 2;
const xFromOuter = 0;
const countOfCircles = 35;
mandala.rotatedCircles(r, xFromOuter, countOfCircles, '#37653A');
r = 2.5;
mandala.rotatedCircles(r, xFromOuter + 2 * r, countOfCircles,  '#FDCC0D');
mandala.rotatedCircles(r, xFromOuter + 4.5 * r, countOfCircles + 2, '#2E2B89' );
mandala.rotatedCircles(r, xFromOuter + 7 * r, countOfCircles - 5, 'rgb(98, 180, 103)' );
r = 3
mandala.rotatedCircles(r, xFromOuter + 9.5 * r, countOfCircles + 7,  '#69359C' );

// #006B3C green
// #69359C purple
// #FDCC0D yellow
//rgb(98, 180, 103) green
//  69359C  purple

//palmTrees
for (var rotation = 0; rotation < 360; rotation += 8) {
    mandala.palmTree(62, rotation, {'stroke-width': .3});
 }
