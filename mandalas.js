const mandalasEl = document.getElementById("mandalas");
const centerX = 69;
const centerY = 70;
const innerR = 10;
const outerR = 27;

function addElement(tag, attributes) {
    const svgNS = "http://www.w3.org/2000/svg";
    newEl = document.createElementNS(svgNS, tag);
    for (const key in attributes) {
        newEl.setAttribute(key, attributes[key]);
    }
    // return Object.assign(document.createElement(tag), attributes);
    mandalasEl.appendChild(newEl);
    return newEl;
}

function moveToString(startX, startY) {
    return `M ${startX},${startY} `;
}

function curveToString(initialCurveX, initialCurveY, nextCurveX, nextCurveY, endX, endY) {
    return `C ${initialCurveX}, ${initialCurveY}
        ${nextCurveX}, ${nextCurveY}, 
        ${endX}, ${endY}
    `
}

function addDot(x, y, color, rotation) {
    addElement("circle", {
        cx: x,
        cy: y,
        r: 2,
        fill: color,
        transform: `rotate(${rotation} ${centerX} ${centerY})`
    })
}

function droplet(rotation) {
    const startX = centerX + outerR;            //99
    const endX = startX + 28;                   //127
    const pathD = moveToString(startX, centerY) + 
        curveToString(endX, centerY - 10, //initialCurve
            endX, centerY + 10,
            startX, centerY                       //end
        );
    console.log("dropletPath: ", pathD)
    addElement("path", {
        fill: "black",
        d: pathD,
        transform: `rotate(${rotation} ${centerX} ${centerY})`
    })
}

function curlyBracket(rotation) {
    const startX = centerX + outerR - 1.5;  //107
    const curveOutX = startX + 28;          //135
    const curveInX = startX + 13;           //120
    const endX = centerX + outerR + 31.5;   //140
    const startY = centerY - 10;            //60
    const endY = centerY + 10;              //80
    const pathD = moveToString(startX, startY) + 
        curveToString(curveOutX, startY,  //initialCurve
            curveInX, centerY,           //nextCurve
            endX, centerY                   //end
         ) + 
         curveToString(curveInX, centerY, //initialCurve
            curveOutX, endY,              //nextCurve
            startX, endY
         )
    console.log(pathD);

    addElement("path", {
        fill: "none",
        stroke: "black",
        d: pathD,
        transform: `rotate(${rotation} ${centerX} ${centerY})`
    });    
    addDot(curveOutX, startY, "black", rotation);
    addDot(curveInX, centerY, "black", rotation);
    addDot(curveOutX, endY, "black", rotation);
}


// Create inner circle
addElement("circle", {
    cx: centerX,
    cy: centerY,
    r: innerR,
    fill: "black"
});

// add the svgElement to the mandalas element
// const el = document.getElementById("mandalas");
// el.appendChild(innerCircle)

// Outer circle
addElement("circle", {
    cx: centerX,
    cy: centerY,
    r: outerR,
    stroke: "black"
});

// Curly bracket shape
for (rotation = 0; rotation < 360; rotation += 45) {
    curlyBracket(rotation);
}

for (rotation = 22.5; rotation < 360; rotation += 45) {
    droplet(rotation);
}

console.log('done');
