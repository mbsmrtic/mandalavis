const svgUrl = "http://www.w3.org/2000/svg";

export class MandalaShape {
    constructor({xStart, yStart, length=20, width=15, howMany=1, angleStart=0, color="black"}) {
        this.xStart = xStart;
        this.yStart = yStart;
        this.width = width;
        this.angleStart = angleStart;
        this.angleStep = 360 / howMany;
        this.toolTipText = null;
        this._howMany = howMany;
        this.color = color;
        this.length = length;
    }

    set howMany(value) {
        this._howMany = value;
        this.angleStep = 360 / value;
    }

    shapeElementAttributes() {
        return {};
    }

    shapeElementTag() {
        return "path";
    }

    moveToString(startX, startY) {
        return `M ${startX},${startY} `;
    }
    
    curveToString(initialCurveX, initialCurveY, nextCurveX, nextCurveY, endX, endY) {
        return `C ${initialCurveX}, ${initialCurveY}
            ${nextCurveX}, ${nextCurveY}, 
            ${endX}, ${endY}
        `
    }

}

export class DropletShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const endX = this.xStart + this.length;
        const pathD = this.moveToString(this.xStart, this.yStart) + 
            this.curveToString(endX, this.yStart - this.width, //initialCurve
                endX, this.yStart + this.width,
                this.xStart, this.yStart);
            console.log("droplet shape Path: ", pathD);
        return({fill: this.color, d: pathD});
    }
}

export class DotShape extends MandalaShape {
    shapeElementTag() { return "circle"; }
    shapeElementAttributes() {
        return {
            cx: this.xStart,
            cy: this.yStart,
            r: this.width,
            fill: this.color
        }
    }
}

export class SpiralShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        // startX defines the center of the spiral, so we need to 
        //   move the center over depending on the width.
        const startX = this.xStart + (this.width / 2);  
        const startY = this.yStart;            //60

        //spiral
        const turns = 2.14;
        const radiusStep = this.width / 240; //.05;
        var pathD ='';
        let currentX = 0;
        let currentY = 0;
        for (let i = 0; i < turns * 360; i++) {
            let angle = ((i * Math.PI) / 180);
            let r = i * radiusStep;
            currentY = startY + .2 * r * Math.cos(angle);
            currentX = startX - .2 * r * Math.sin(angle);
            pathD += (i === 0 ? "M" : "L") + currentX + ' ' + currentY;
        }
        return ({
            fill: "white",
            stroke: "black",
            'stroke-width': .7,
            d: pathD
        });
    }
};

export class CurlyBracket extends MandalaShape {
    constructor(shapeArgs) {
        super(shapeArgs);
        const bracketWidth = this.width;
        var startX = this.xStart - 1.5;  //heuristic to account for curve
        this.bracketStartX = startX;
        this.curveOutX = startX + (bracketWidth * .9);    //+ 28;          //135
        this.curveInX = startX + (bracketWidth * .4); // 13;           //120
        this.bracketEndX = startX + bracketWidth + 1.5;   //140
        this.bracketStartY = this.yStart - 10;            //60
        this.bracketEndY = this.yStart + 10;              //80
    }
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const pathD = this.moveToString(this.bracketStartX, this.bracketStartY) + 
            this.curveToString(this.curveOutX, this.bracketStartY,  //initialCurve
                this.curveInX, this.yStart,           //nextCurve
                this.bracketEndX, this.yStart                   //end
             ) + 
             this.curveToString(this.curveInX, this.yStart, //initialCurve
                this.curveOutX, this.bracketEndY,              //nextCurve
                this.bracketStartX, this.bracketEndY
             )
        console.log(pathD);


        var elementAttrs = {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        };
        return elementAttrs;
    }
};


export class Mandala {
    constructor(elementId, centerX=70, centerY=68) {
        this.elementId = elementId;
        this.centerX = centerX;
        this.centerY = centerY;
        this.innerR = 10;
        this.outerR = 27;
        this.defaultColor = "black";
        this.mandalaEl = document.getElementById(elementId);
    }

    makeGradient(centerColor='white', outerColor='black', name="myGradient") {
        const defs = document.createElementNS(svgUrl, "defs");  
        this.mandalaEl.appendChild(defs);  
        const gradient = document.createElementNS(svgUrl, "radialGradient");  
        gradient.setAttribute("id", name);  
        // gradient.setAttribute("cx", "50%"); // Center X  
        // gradient.setAttribute("cy", "50%"); // Center Y  
        // gradient.setAttribute("r", "50%");  // End circle radius  
        // gradient.setAttribute("fx", "50%"); // Start circle X  
        // gradient.setAttribute("fy", "50%"); // Start circle Y  
        
        // Add color stops  
        const stop1 = document.createElementNS(svgUrl, "stop");  
        stop1.setAttribute("offset", "0%");  
        stop1.setAttribute("stop-color", centerColor);  
        gradient.appendChild(stop1);  
        
        const stop2 = document.createElementNS(svgUrl, "stop");  
        stop2.setAttribute("offset", "100%");  
        stop2.setAttribute("stop-color", outerColor);  
        gradient.appendChild(stop2);  
        
        defs.appendChild(gradient);  
        this.defaultColor = "url(#myGradient)";
        return this.defaultColor;
    }

    addShape({shape: shape}) {
        var attributes = shape.shapeElementAttributes();
        var elementTag = shape.shapeElementTag();

        for (var angle=shape.angleStart; angle < 360; angle += shape.angleStep){
            if (angle > 0)
                attributes['transform'] = `rotate(${angle} ${this.centerX} ${this.centerY})`;
            //create the DOM element
            const newEl = document.createElementNS(svgUrl, elementTag);
            for (const key in attributes) {
                newEl.setAttribute(key, attributes[key]);
            }
            // return Object.assign(document.createElement(tag), attributes);
            if (shape.toolTipText) {
            // tooltip
                const title = document.createElementNS(svgUrl, 'title');
                title.textContent = shape.toolTipText;
                newEl.appendChild(title);
            }

            // add the new element to the DOM
            this.mandalaEl.appendChild(newEl);
        }
    }

   
    addElement(tag, attributes, toolTipText = '', shapeRotation=null) {

        const newEl = document.createElementNS(svgUrl, tag);
        for (const key in attributes) {
            newEl.setAttribute(key, attributes[key]);
        }
        // return Object.assign(document.createElement(tag), attributes);
        // tooltip
        const title = document.createElementNS(svgUrl, 'title');
        title.textContent = toolTipText;
        newEl.appendChild(title);

        // add the new element to the dom
        this.mandalaEl.appendChild(newEl);
        return newEl;
    }
    moveToString(startX, startY) {
        return `M ${startX},${startY} `;
    }
    
    curveToString(initialCurveX, initialCurveY, nextCurveX, nextCurveY, endX, endY) {
        return `C ${initialCurveX}, ${initialCurveY}
            ${nextCurveX}, ${nextCurveY}, 
            ${endX}, ${endY}
        `
    }

    qCurveString(curveX, curveY, endX, endY, showCurveDots = false)
    {
        if (showCurveDots) {
            this.addDot(curveX, curveY, .5, "red");
        }
        return ` Q ${curveX}, ${curveY}  ${endX}, ${endY} `;
    }
    
    addDot(x, y, r = 2, color = "black", rotation = 0) {
        this.addElement("circle", {
            cx: x,
            cy: y,
            r: r,
            fill: color,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        })
    }
    
    // a circle with multiple droplets coming out of it
    pottedPlant({rotation, length}) {

    }

    // fswirl({rotation, x, width}) {
    // spiral({rotation, x, width}) {
    //     // startX defines the center of the spiral, so we need to 
    //     //   move the center over depending on the width.
    //     const startX = this.centerX + x + (width / 2);  
    //     const startY = this.centerY;            //60

    //     //spiral
    //     const turns = 2.14;
    //     const radiusStep = width / 240; //.05;
    //     var pathD ='';
    //     let currentX = 0;
    //     let currentY = 0;
    //     for (let i = 0; i < turns * 360; i++) {
    //         let angle = ((i * Math.PI) / 180);
    //         let r = i * radiusStep;
    //         currentY = startY + .2 * r * Math.cos(angle);
    //         currentX = startX - .2 * r * Math.sin(angle);
    //         pathD += (i === 0 ? "M" : "L") + currentX + ' ' + currentY;
    //     }




    //     // const pathD = this.moveToString(startX, startY) + 
    //     //     this.curveToString(startX + 9, startY - 4,  //initialCurve
    //     //         startX + 6, startY + 9,           //nextCurve
    //     //         startX + 1, startY + 3             //end
    //     //      );
        
    //     //'swirl' - looks like a crooked droplet
    //     //const pathD = "M10 5 C 15 5, 15 10, 10 10 S 5 15, 5 10 S 10 5, 10 5";

    //     // const pathD = this.moveToString(startX, startY) + 
    //     //      this.curveToString(startX + (length * .4), startY + 6,  //initialCurve
    //     //          startX + (length * .6), startY - 6,           //nextCurve
    //     //          startX + (length * .8), startY + 1               //end
    //     //       ) + 
    //     //       this.curveToString(startX + (length * .8), startY + 5,
    //     //         startX + (length * .5), startY + 4,
    //     //         startX + length * .6, startY + 1)
    //     //       ;
    //     // this.addDot(startX + length * .66, startY + 2, 1.3, "black", rotation);
    
    //     // this.addDot(startX + (length * .4), startY + 6, 1, 'green');
    //     // this.addDot(startX + (length * .6), startY - 6, 1, 'blue');
    //     // this.addDot(startX + (length * .8), startY + 1, 1, 'red')

    //     // this.addDot(startX + (length * .8), startY + 5, 1, 'purple');
    //     // this.addDot(startX + (length * .5), startY + 4, 1, 'orange')
    //     // this.addDot(startX + (length * .6), startY + 1, 1, 'orange')

    //     this.addElement("path", {
    //         fill: "white",
    //         stroke: "black",
    //         'stroke-width': .7,
    //         d: pathD,
    //         transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
    //     }, rotation);    
    // }

    swirl(rotation) {
        const startX = this.centerX + this.innerR;  //107
        const startY = this.centerY;            //60
        const pathD = this.moveToString(startX, startY) + 
            this.curveToString(startX + 9, startY - 4,  //initialCurve
                startX + 6, startY + 9,           //nextCurve
                startX + 1, startY + 3             //end
             );
        this.addDot(startX + 2.5, startY + 2.5, 2, "black", rotation);
    
        this.addElement("path", {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        });    
    }

    // this isn't working - maybe use circles instead
    dotCluster(c, rotation) {
        var startX = this.centerX + this.outerR + 4;
        var startY = this.centerY - 1;
        //for first half put more in each row
        var cPerRow = 2;
        var x = startX;
        var y = startY;
        var iInRow = 0;
        for (var i = 0; i < c/2; i++)
        {
            this.addDot(x, y, .5, 'red');
            iInRow += 1;
            //If we're at the end of the row start a new one.
            if (iInRow >= cPerRow) {
                cPerRow += 1;
                iInRow = 0;
                y += 1.5;
                x = x - (cPerRow);
            }
            else {
                x += 1;
            }
        }
        //for second half put less in each row
        cPerRow -= 1;
        for (; i < c; i++) {
            this.addDot(x, y, .5);
            iInRow += 1;
            //If we're at the end of the row start a new one.
            if (iInRow >= cPerRow) {
                cPerRow -= 1;
                iInRow = 0;
                y += 1.5;
                x = x - cPerRow;
            }
            else {
                x += 1;
            }
        }
    }

    sCurve(rotation) {
        const startX = this.centerX + this.innerR + 7;  //107
        const startY = this.centerY;            //60
        // We will make two s curves with some fill between them
        const pathD = this.moveToString(startX, startY) + 
            //first, lower s curve
                //down to startY + 6 then up 2 to startY + 4
            this.qCurveString(startX + 1, startY + 6, startX + 4, startY + 4) +
                //up to startY, then down 6 to startY + 6  
            this.qCurveString(startX + 7, startY, startX + 9, startY + 6) +
            // second higher s curve
                //up to startY - 3, then down to startY + 1 
            this.qCurveString(startX + 7, startY - 3, startX + 4, startY + 1) +  
                //down to startY + 3 then up to startY - 2
            this.qCurveString(startX + 1, startY + 3, startX, startY - 2);
    
        this.addElement("path", {
            fill: "black",
            stroke: "black",
            'stroke-width': .3,
            d: pathD,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        });    
    }

    rotatedCircles(r, xFromOuter, countOfCircles, color="black") {
        const rotationIncrement = 360 / countOfCircles;
        // Larger circles
        for (var rotation = 0; rotation < 360; rotation += rotationIncrement) {
            this.circles(rotation, r, xFromOuter + r, 0, color);
        }
        // Smaller filler circles
        const littleR = r/4;
        for (var rotation = (360/countOfCircles)/2; rotation < 360; rotation += rotationIncrement) {
            this.circles(rotation, littleR, xFromOuter + (2 * r) - littleR, 0, color);
        }
    }

    circles(rotation, r, x, y = this.centerY, color="black") {
        //big circle
        const centerX = this.centerX + this.outerR + x;
        const centerY = this.centerY + y;
        this.addElement("circle", {
            cx: centerX,
            cy: centerY,
            r: r,
            fill: color,      //"url(#myGradient)",
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        }, `${centerX}, ${centerY} ${rotation}`);
    }


    palmTree(x, rotation, attributes = {}) {
        const startX = this.centerX + this.innerR + x;
        const pathD = this.moveToString(startX - 3, this.centerY - 5) + 
            this.curveToString(startX - .5, this.centerY - 2, //initialCurve
                startX - 2, this.centerY, //nextCurve
                 startX - 7, this.centerY //end
                ) + 
            this.curveToString(startX - 2, this.centerY, //initialCurve
                startX - .5, this.centerY + 2, //nextCurve
                startX - 3, this.centerY + 5 //end
                 );
        var elementAttrs = {
            fill: "none",
            stroke: "black", 
            'stroke-width': .3,
            d: pathD,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        };
        for (const key in attributes) {
            elementAttrs[key] = attributes[key];
        }
        this.addElement("path", elementAttrs);
    }
    
    curlyBracket({attributes = {}, x=0, length=30, dotSize=2, fill='none', shapeRotation=null}) {
        const bracketWidth = length;
        const startX = this.centerX + x - 1.5;  //heuristic to account for curve //107
        const curveOutX = startX + (bracketWidth * .9);    //+ 28;          //135
        const curveInX = startX + (bracketWidth * .4); // 13;           //120
        // const endX = this.centerX + this.outerR + 31.5 + endXOffset;   //140
        // const endX = startX + 30 + endXOffset;   //140
        const endX = startX + bracketWidth + 1.5;   //140
        const startY = this.centerY - 10;            //60
        const endY = this.centerY + 10;              //80
        const pathD = this.moveToString(startX, startY) + 
            this.curveToString(curveOutX, startY,  //initialCurve
                curveInX, this.centerY,           //nextCurve
                endX, this.centerY                   //end
             ) + 
             this.curveToString(curveInX, this.centerY, //initialCurve
                curveOutX, endY,              //nextCurve
                startX, endY
             )
        console.log(pathD);


        var elementAttrs = {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            fill: fill,
            d: pathD
        };
        for (const key in attributes) {
            elementAttrs[key] = attributes[key];
        }
        if (shapeRotation) {
            shapeRotation.addRotatedShapes({mandala: this, elementName: "path", elementAttrs: elementAttrs});
        } else {
            this.addElement("path", elementAttrs);
        }
        for (var rotation=shapeRotation.angleStart; rotation < 360; rotation+=shapeRotation.angleStep) {
            // elementAttrs['transform'] = `rotate(${rotation} ${this.centerX} ${this.centerY})`;
            // this.addElement("path", elementAttrs, `curlyBracket ${x}, ${length} `);
            this.addDot(curveOutX, startY, dotSize, "black", rotation);
            this.addDot(curveInX, this.centerY, dotSize, "black", rotation);
            this.addDot(curveOutX, endY, dotSize, "black", rotation);
        }
    }
}
