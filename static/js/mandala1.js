import { Mandala } from "/static/js/mandala.js";
const mandala = new Mandala("mandala1");

// Create inner circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    fill: "black"
});


// Outer circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.outerR,
    stroke: "black"
});

// Curly bracket shape
for (var rotation = 0; rotation < 360; rotation += 45) {
    mandala.curlyBracket({
        rotation: rotation, 
        attributes: {'stroke-width': 1}, 
        x: mandala.outerR, 
        length: 30});
}

for (rotation = 22.5; rotation < 360; rotation += 45) {
    mandala.droplet({rotation: rotation});
}
