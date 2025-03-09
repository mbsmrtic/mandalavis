import { Mandala } from "/static/js/mandala.js";

const mandala = new Mandala("mandala4", 95, 95);



// Create inner circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    stroke: "black",
    fill: "black"
});
// Create outer circle
// mandala.addElement("circle", {
//     cx: mandala.centerX,
//     cy: mandala.centerY,
//     r: 65,
//     stroke: "black",
//     'stroke-width': .3,
//     fill: "none"
// });

// todo - look at the colors that I used in my icon 
//  maybe use those colors

// #ced7d8 
// #ff6b6b 
// #118ab2 
// circle of dots
var r = 2;
const xFromOuter = 0;
const countOfCircles = 35;
 mandala.rotatedCircles(1, -5, 40);
//mandala.rotatedCircles(1, -8, 45);
mandala.rotatedCircles(r, xFromOuter, countOfCircles);
r = 2.5;
mandala.rotatedCircles(r, xFromOuter + 2 * r, countOfCircles);
mandala.rotatedCircles(r, xFromOuter + 4.5 * r, countOfCircles + 2);
mandala.rotatedCircles(r, xFromOuter + 7 * r, countOfCircles - 5 );
mandala.rotatedCircles(1, xFromOuter + 9.5 * r, 45);
r = 3
mandala.rotatedCircles(r, xFromOuter + 9.5 * r, countOfCircles + 7);

// #006B3C green
// #69359C purple
// #FDCC0D yellow
//rgb(98, 180, 103) green
//  69359C  purple

mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: 64,
    stroke: "black",
    fill: "none"
});

for (var rotation=0; rotation < 360; rotation += 36) {
    mandala.droplet(rotation, mandala.innerR, 14, "black", 30);
}

// curlybrackets
for (var rotation = 0; rotation < 360; rotation += 19) {
    mandala.curlyBracket(rotation, {
        'stroke-width': 1
    },65, 30, 0, "black");
}
