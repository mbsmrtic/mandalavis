const svgUrl = "http://www.w3.org/2000/svg";
export class Mandala {
    constructor(elementId) {
        this.elementId = elementId;
        this.centerX = 69;
        this.centerY = 70;
        this.innerR = 10;
        this.outerR = 27;
        this.defaultColor = "black";
        this.mandalaEl = document.getElementById(elementId);
    }
    makeGradient() {
        const defs = document.createElementNS(svgUrl, "defs");  
        this.mandalaEl.appendChild(defs);  
        const gradient = document.createElementNS(svgUrl, "radialGradient");  
        gradient.setAttribute("id", "myGradient");  
        // gradient.setAttribute("cx", "50%"); // Center X  
        // gradient.setAttribute("cy", "50%"); // Center Y  
        // gradient.setAttribute("r", "50%");  // End circle radius  
        // gradient.setAttribute("fx", "50%"); // Start circle X  
        // gradient.setAttribute("fy", "50%"); // Start circle Y  
        
        // Add color stops  
        const stop1 = document.createElementNS(svgUrl, "stop");  
        stop1.setAttribute("offset", "0%");  
        stop1.setAttribute("stop-color", "white");  
        gradient.appendChild(stop1);  
        
        const stop2 = document.createElementNS(svgUrl, "stop");  
        stop2.setAttribute("offset", "100%");  
        stop2.setAttribute("stop-color", "black");  
        gradient.appendChild(stop2);  
        
        defs.appendChild(gradient);  
        this.defaultColor = "url(#myGradient)";
        return this.defaultColor;
    }
    addElement(tag, attributes) {
        const newEl = document.createElementNS(svgUrl, tag);
        for (const key in attributes) {
            newEl.setAttribute(key, attributes[key]);
        }
        // newEl.style.setProperty('stroke-width', '8');
        // newEl.style.strokeWidth = 8;
        // newEl.setAttribute('stroke-width', '8');
        // return Object.assign(document.createElement(tag), attributes);
        if (! this.mandalaEl) {
            this.mandalaEl = document.getElementById(this.elementId);
        }
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
    
    addDot(x, y, r = 2, color = "black", rotation = 0) {
        this.addElement("circle", {
            cx: x,
            cy: y,
            r: r,
            fill: color,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        })
    }
    
     droplet(rotation, color="black") {
        const startX = this.centerX + this.outerR;            //99
        const endX = startX + 28;                   //127
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
            file: "none",
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
    
    curlyBracket(rotation, attributes = {}) {
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
            d: pathD,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        };
        for (const key in attributes) {
            elementAttrs[key] = attributes[key];
        }
        this.addElement("path", elementAttrs);
        this.addDot(curveOutX, startY, 2, "black", rotation);
        this.addDot(curveInX, this.centerY, 2, "black", rotation);
        this.addDot(curveOutX, endY, 2, "black", rotation);
    }
}
