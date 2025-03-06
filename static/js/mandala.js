const svgUrl = "http://www.w3.org/2000/svg";
export class Mandala {
    constructor(elementId) {
        this.elementId = elementId;
        this.centerX = 70;
        this.centerY = 68;
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
    addElement(tag, attributes, toolTipText = '') {
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
    
     droplet(rotation, color="black", length) {
        const startX = this.centerX + this.outerR;            //99
        const endX = startX + length;                   //127
        const pathD = this.moveToString(startX, this.centerY) + 
            this.curveToString(endX, this.centerY - 10, //initialCurve
                endX, this.centerY + 10,
                startX, this.centerY                       //end
            );
        console.log("dropletPath: ", pathD)
        this.addElement("path", {
            fill: color,
            d: pathD,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        })
    }

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
        }, `${centerX}, ${centerY}`);
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
    
    curlyBracket(rotation, attributes = {}, dotSize=2, fill='none') {
        const startX = this.centerX + this.outerR - 1.5;  //107
        const curveOutX = startX + 28;          //135
        const curveInX = startX + 13;           //120
        const endX = this.centerX + this.outerR + 31.5;   //140
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
            d: pathD,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        };
        for (const key in attributes) {
            elementAttrs[key] = attributes[key];
        }
        this.addElement("path", elementAttrs);
        this.addDot(curveOutX, startY, dotSize, "black", rotation);
        this.addDot(curveInX, this.centerY, dotSize, "black", rotation);
        this.addDot(curveOutX, endY, dotSize, "black", rotation);
    }
}
