import { Mandala } from "/static/js/mandala.js";

const mandala = new Mandala("mandala2");

// Create inner circle
mandala.makeGradient();
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    fill: "url(#myGradient)"
});


// Outer circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    'stroke-width': 2,
    stroke: "black"
});

// Curly bracket shape
for (var rotation = 0; rotation < 360; rotation += 45) {
    mandala.curlyBracket(rotation, {'stroke-width': .3});
}

// Dropets
for (rotation = 22.5; rotation < 360; rotation += 45) {
    mandala.droplet(rotation, "black");
}

// Swirls
for (var rotation = 0; rotation < 360; rotation += 45) {
    mandala.swirl(rotation);
}

//circle 
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR + 7,
    'stroke-width': .3,
    stroke: "black"
})

//palmTrees
for (var rotation = 0; rotation < 360; rotation += 45) {
    mandala.palmTree(54, rotation, {'stroke-width': 4});
//    mandala.palmTree(24, rotation);
//    mandala.palmTree(14, rotation);
}