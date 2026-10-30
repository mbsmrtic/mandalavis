import { Mandala } from "/static/js/mandala.js";
import { readyShapeClasses } from "/static/js/shapes/shapefactory.js"

let mandala = new Mandala("mandalarandom", 240, 230);

function howMany(r, width) {
    const circumference = 2 * Math.PI * r;
    let c =  Math.ceil(circumference / width);
    if (c < 5) { c+=1; }
    console.log("howMany: " + c);
    return c;
}

const RING_COUNT = 7;
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

//loop through getting random sizes
let sizes = [];
let y = 18;
let randomWidth;
for (let i = 0; i < RING_COUNT; i++) {
    randomWidth = getRandomNumber(15, 40);      //10, 18);
    sizes.push(randomWidth);
    y += randomWidth;
}

//outer circle
mandala.addCenteredCircle(y, '#666', 'white');

//We start at the outer loop because we add a white circle at each layer
let yHeight = 34;
for (let i = RING_COUNT - 1; i >= 0; i--) {
    let randomShapeIndex = Math.floor(Math.random() * readyShapeClasses.length);
    let shapeClass = readyShapeClasses[randomShapeIndex];

    let randomWidth = sizes[i];
    y -= randomWidth;
    // yHeight = randomWidth;
    console.log(`Random width: ${randomWidth}`);
    console.log('y: ' + y);

    let shapeArgs = { 
        x: mandala.centerX, 
        y: mandala.centerY - y,
        width: randomWidth * (1),
        length: randomWidth - 2,
        howMany: howMany(y, randomWidth),
        toolTipText: shapeClass.name,
    }
    let shape = new shapeClass(shapeArgs);
    console.log("shape: -----------" + shapeClass.name + '------');
    // console.log("shape: -----------" + makeShapFns[randomShapeIndex].name + '------');
    // let shape = makeShapFns[randomShapeIndex](shapeArgs);
    mandala.addShape(shape);
    mandala.addCenteredCircle(y, 'white', 'white');
}

mandala.addCenteredCircle(18, '#666', 'white');


