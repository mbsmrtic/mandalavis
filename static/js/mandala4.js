import { Mandala } from "/static/js/mandala.js";

const mandala = new Mandala("mandala4", 95, 95);

// Create inner circle
mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r: mandala.innerR,
    stroke: "black",
    fill: "none"
});


for (var rotation=0; rotation < 360; rotation += 24) {
    mandala.spiral({rotation: rotation, x: mandala.outerR, width: 12});
}
for (var rotation=0; rotation < 360; rotation += 60) {
    mandala.spiral({rotation: rotation, x: mandala.innerR - 1.5, width: 15});
}
for (var rotation=0; rotation < 360; rotation += 36) {
    mandala.spiral({rotation: rotation, x: mandala.outerR + 10, width: 24});
}
for (var rotation=17; rotation < 360; rotation += 36) {
    mandala.spiral({rotation: rotation, x: mandala.outerR + 29, width: 15});
}

mandala.addElement("circle", {
    cx: mandala.centerX,
    cy: mandala.centerY,
    r:  mandala.outerR,     //64,
    stroke: "black",
    fill: "none"
});


for (var rotation = 20; rotation < 360; rotation += 36) {
    mandala.droplet({
        rotation: rotation,
        x: 39,
        length: 25,
        color: "black"
    });
}
