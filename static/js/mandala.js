const svgUrl = "http://www.w3.org/2000/svg";
let tooltipJustOpened = false;

// Todo - test this and change the name of tooltipJustOpened
document.addEventListener('click', (event) => {
    // The first time we get this event after highlighting a shape, we leave
    //   it.  After that, it means this click was not in a shape, so 
    //   we close the tooltip.
    if (tooltipJustOpened) {
        tooltipJustOpened = false;
    } else {
        const tooltip = document.querySelector('.tooltip');
        tooltip.style.display = 'none';
        clearHighlights();
    }
});

function clearHighlights() {
    let elements = document.querySelectorAll('.tempMoveToFront');
    elements.forEach(element => element.parentNode.removeChild(element));
}

// The MandalaShape constructor takes some basic shape related args.
// The pattern is:
//   - create the shape object:   const dropletShape = new DropletShape({...})
//   - add it to the mandala      mandala.addShape({ shape: })
// It also takes svgElementAttributes. This object can take anything that 
//   you want applied to the svgElement that will draw the shape. 
//   If you want to alter things like stroke-width or color, look at the 
//   shape's shapeElementTag, then look up that tag here:
//      https://developer.mozilla.org/en-US/docs/Web/SVG 
//   to see what attributes can be set.  
export class MandalaShape {
    constructor(
        {x, y, length=20, width=15, howMany=1, angleStart=0, color="black", toolTipText=null},
        svgElementAttributes={}
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.angleStart = angleStart;
        this.angleStep = 360 / howMany;
        this.toolTipText = null;
        this._howMany = howMany;
        this.color = color;
        this.length = length;
        this.toolTipText = toolTipText;
        this.svgElementAttributes = svgElementAttributes;
    }

    /**
     * @param {number} value
     * We have this setter because the angleStep is calculated from _howMany.
     * So here if _howMany changes, we recalculate it.
     */
    set howMany(value) {
        this._howMany = value;
        this.angleStep = 360 / value;
    }

    get howMany() {
        return this._howMany;
    }

    shapeElementAttributes() {
        return this.svgElementAttributes;
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

    qCurveString(curveX, curveY, endX, endY, showCurveDots = false)
    {
        if (showCurveDots) {
            this.addDot(curveX, curveY, .5, "red");
        }
        return ` Q ${curveX}, ${curveY}  ${endX}, ${endY} `;
    }

    arcString(xRadius, yRadius, rot, isLargeArc, isClockwise, endX, endY) {
        return `A ${xRadius}, ${yRadius}  ${rot} ${isLargeArc} ${isClockwise} ${endX}, ${endY}`;
    }

}

export class DropletShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const topY = this.y - this.length;
        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(this.x - this.width, topY, //initialCurve
                this.x + this.width, topY,  //nextCurve
                this.x, this.y);            //end
        return({fill: this.color, d: pathD});
    }
}
export class PalmTreeShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        var foo = 5;
        const pathD = this.moveToString(this.x - foo, this.y - 4) + 
            this.curveToString(this.x - 2, this.y - 7, //initialCurve
                this.x, this.y - 4, //nextCurve
                this.x, this.y //end
                ) + 
            this.curveToString(this.x, this.y - 4, //initialCurve
                this.x + 2, this.y - 7, //nextCurve
                this.x + foo, this.y - 4 //end
                );
        var elementAttrs = {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        };
        return elementAttrs;
    }
}

export class SwirlShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(this.x - 4, this.y - 9,
                this.x + 9, this.y - 6,
                this.x + 3, this.y - 2
            );
        return {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        };
    }
}

export class ArcShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const pathD = this.moveToString(this.x, this.y) + 
            this.arcString(
                this.width, this.length,
                0,  //0 = centered, not skewed
                1,  // 0 = smaller arc
                1,  // 1 = clockwise
                this.x + this.width * 2, 
                this.y
            )
        return {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        }
    }
}

export class DotShape extends MandalaShape {
    shapeElementTag() { return "circle"; }
    shapeElementAttributes() {
        return {
            cx: this.x,
            cy: this.y,
            r: this.width,
            fill: this.color
        }
    }
}

export class BetweenDotsDotShape extends MandalaShape {
    constructor(biggerDot) {
        var littleR = biggerDot.width / 4;
        var shapeArgs = {
            x: biggerDot.x,
            y: biggerDot.y - biggerDot.width + littleR,
            width: littleR,
            color: biggerDot.color,
            howMany: biggerDot.howMany,
            angleStart: (360/biggerDot.howMany)/2
        };        
        super(shapeArgs, biggerDot.svgElementAttributes);
    }
    shapeElementTag() { return "circle"}
    shapeElementAttributes() {
        return {
            cx: this.x,
            cy: this.y,
            r: this.width,
            fill: this.color
        }
    }
}

export class SCurve extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const startX = this.x;  
        const startY = this.y;
        const rightCurveX = startX + (this.width * .66);
        const rightCurveY = startY - (this.length * .11);
        const leftCurveX = startX + (this.width * .44);
        const leftCurveY = startY - (this.length * .44);
        // We will make two s curves with some fill between them
        const pathD = this.moveToString(startX - 2, startY) + 
            //first, right s curve
                //right to startX + 6 then left 2 to startX + 4
            this.qCurveString(rightCurveX, rightCurveY, leftCurveX, leftCurveY) +
                //left to startX, then right 6 to startX + 6
            this.qCurveString(startX, startY - (this.length * .77), 
                startX + (this.width * .66), startY - (this.length)) +
            // second left s curve
            // second higher s curve
                //left to startX - 3, then right to startX + 1
            this.qCurveString(startX - (this.width * .33), startY - (this.length * .77), 
                startX + (this.width * .11), startY - (this.length * .44)) +  
                //right to startX + 3, then left to startX - 2
            this.qCurveString(startX + (this.width * .33), startY - (this.length * .11), 
                startX - (this.width * .22), startY);
       
        return ({
            fill: this.color,
            stroke: this.color,
            d: pathD
        });
    }
}

export class SShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const leftCurveX = this.x - (this.width * .5);
        const leftCurveY = this.y - (this.length * .25);
        const rightCurveX = this.x + (this.width * .5);
        const rightCurveY = this.y - (this.length * .75);

        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(leftCurveX, leftCurveY,   //initialCurve
                rightCurveX, rightCurveY,             //nextCurve
                this.x, this.y - this.length
            );
        return ({
            fill: "none",
            stroke: "black",
            d: pathD
        });
    }
}

export class WaveShape extends MandalaShape {    
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        // startX defines the center of the spiral, so we need to 
        //   move the center up depending on the width of the shape.
        let width = this.width;
        const startX = this.x - (width * .2);  
        const startY = this.y - (width * .19);

        var pathD = '';
        //We start on the left and create the inner loop
        //toward the center
        let turns = 1.3;        
        let radiusStep = this.width / 360;
        let currentX = 0;
        let currentY = 0;
        let istart = turns * 360;
        for (let i = istart; i > 0; i--) {
            let angle = ((i * Math.PI) / 180);
            let r = i * radiusStep;
            currentY = startY + .2 * r * Math.sin(angle);
            currentX = startX + .2 * r * Math.cos(angle);
            pathD += (i === istart ? "M" : " L ") + currentX + ' ' + currentY;           
        }

        // Here we are at the center and we make the outer loop toward the right
        turns = .9;
        radiusStep = this.width / 150;   //240; //.05;
        currentX = 0;
        currentY = 0;
        for (let i = 0; i < turns * 360; i++) {
            let angle = ((i * Math.PI) / 180);
            let r = i * radiusStep;
            currentY = startY + .2 * r * Math.sin(angle);
            currentX = startX + .2 * r * Math.cos(angle);
            pathD += " L " + currentX + ' ' + currentY + ' ';
            // pathD += (i === 0 ? "M" : " L ") + currentX + ' ' + currentY + ' ';
        }

        pathD += this.curveToString(
            currentX + (.15 * width), currentY + (.1 * width), 
            currentX + (.3 * width), currentY + (.35 * width), 
            currentX + (.4 * width), currentY + (.6 * width)); 


        // pathD += this.moveToString(startX + .2 * r * Math.cos(angle))
        return ({
            fill: "black",
            stroke: "black",
            'stroke-width': .7,
            d: pathD
        });
    }
}

export class SpiralShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        // startX defines the center of the spiral, so we need to 
        //   move the center up depending on the width of the shape.
        const startX = this.x;  
        const startY = this.y - (this.width / 2) + 1;

        //spiral
        const turns = 2.14;
        const radiusStep = this.width / 240; //.05;
        var pathD ='';
        let currentX = 0;
        let currentY = 0;
        for (let i = 0; i < turns * 360; i++) {
            let angle = ((i * Math.PI) / 180);
            let r = i * radiusStep;
            currentY = startY + .2 * r * Math.sin(angle);
            currentX = startX + .2 * r * Math.cos(angle);
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
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        const bracketLength = this.length;
        var startX = this.x - 1.5;  //heuristic to account for curve
        this.bracketStartX = startX;
        this.curveOutX = startX + (bracketLength * .9);    //+ 28;          //135
        this.curveInX = startX + (bracketLength * .4); // 13;           //120
        this.bracketEndX = startX + bracketLength + 1.5;   //140
        this.bracketStartY = this.y - (this.width/2);      //10;            //60
        this.bracketEndY = this.y + (this.width/2)        //10;              //80
    }
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const pathD = this.moveToString(this.bracketStartX, this.bracketStartY) + 
            this.curveToString(this.curveOutX, this.bracketStartY,  //initialCurve
                this.curveInX, this.y,           //nextCurve
                this.bracketEndX, this.y                   //end
             ) + 
             this.curveToString(this.curveInX, this.y, //initialCurve
                this.curveOutX, this.bracketEndY,              //nextCurve
                this.bracketStartX, this.bracketEndY
             )

        // We need a fill here so that the tooltip works correctly
        var elementAttrs = {
            fill: "white",
            stroke: this.color,
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

    addShape(shape) {
        var elementTag = shape.shapeElementTag();
        var attributes = shape.shapeElementAttributes();
        for (var attrKey in shape.svgElementAttributes) {
            attributes[attrKey] = shape.svgElementAttributes[attrKey];
        }

        // loop through the angles adding multiple copies of the shape
        for (var angle=shape.angleStart; angle < 360; angle += shape.angleStep){
            if (angle > 0)
                attributes['transform'] = `rotate(${angle} ${this.centerX} ${this.centerY})`;
            //create the DOM element
            const newEl = document.createElementNS(svgUrl, elementTag);
            newEl.setAttribute('mandalaid', this.elementId);
            for (const key in attributes) {
                newEl.setAttribute(key, attributes[key]);
            }

            function selectShape(element) {
                const tooltip = document.querySelector('.tooltip');
                if (element.textContent.length < 100) {
                    tooltip.textContent = element.textContent;
                    tooltip.style.display = 'block';    
                    // To highlight the element, we make a temporary copy 
                    //    and append it to the DOM, putting it over all existing
                    //    elements
                    let clonedNode = element.cloneNode(true);
                    clonedNode.classList.add('tempMoveToFront');
                    clonedNode.setAttribute('stroke', 'black');
                    clonedNode.setAttribute('stroke-width', 2);
                    // move the element to the front (end of the svg)
                    const mandalaId = element.getAttribute('mandalaid');
                    let svgEl = document.querySelector('#' + mandalaId);
                    svgEl.appendChild(clonedNode);
                }
                else {
                    console.log("tooltip text too long: " + element.textContent);
                }
            };
            // tooltip and shape highlight
            // todo - maybe move this code to the top
            //     maybe we don't need one event listener for each shape
            //     we could just capture them in one place at the top
            //     and use event.target to access the relevant element
            if (shape.toolTipText) {
                newEl.textContent = shape.toolTipText;
                newEl.addEventListener('mouseenter', (event) => {
                    selectShape(event.target);
                });
                newEl.addEventListener('mouseout', () => {
                    clearHighlights();
                });
                newEl.addEventListener('touchstart', (event) => {
                    clearHighlights();
                    selectShape(event.target);
                    tooltipJustOpened = true;
                    event.stopPropagation();
                    event.preventDefault();
            });    
                newEl.addEventListener('touchmove', (event) => {
                    console.log('touchmove');
                    const touch = event.touches[0]; // Get the first touch point
                    const x = touch.clientX;
                    const y = touch.clientY;
                    const elementUnderTouch = document.elementFromPoint(x, y);

                    // If the new element is in the same mandala, we will handle it
                    var elementMandalaId = elementUnderTouch.getAttribute('mandalaid');
                    if (elementMandalaId && elementMandalaId == event.target.getAttribute('mandalaid')) {
                        clearHighlights();
                        selectShape(elementUnderTouch);
                        tooltipJustOpened = true;    
                        event.stopPropagation();
                        event.preventDefault();
                    }
                })
            }

            // add the new element to the DOM
            this.mandalaEl.appendChild(newEl);
        }
    }

    addCenteredCircle(r, stroke="black", fill="none") {
        this.addElement("circle", {
            cx: this.centerX,
            cy: this.centerY,
            r: r,
            stroke: stroke,
            fill: fill
        })
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

}
