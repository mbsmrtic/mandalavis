import { MandalaShape } from "./mandalashape.js";

export class WaveShape extends MandalaShape {    
    constructor(shapeArgs, svgElementAttributes = {}) {
        super(shapeArgs, svgElementAttributes);
    }
    thisPoint(i, radiusStep) {
        let angle = ((i * Math.PI) / 180);
        let r = i * radiusStep;
        let y = this.startY + .2 * r * Math.sin(angle);
        let x = this.startX + .2 * r * Math.cos(angle);
        y = y.toFixed(4);
        x = x.toFixed(4);
        return { x, y };
    }
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        this.startX = this.x - (this.width * .2);  
        this.startY = this.y - (this.width * .19);
        // startX defines the center of the spiral, so we need to 
        //   move the center up depending on the width of the shape.
        let width = this.width;
        var pathD = '';
        //We start on the left and create the inner loop
        //toward the center
        let turns = 1.3;        
        let radiusStep = width / 360;
        let currentX = 0;
        let currentY = 0;
        let point = {currentX, currentY};
        let istart = turns * 360;
        for (let i = istart; i > 0; i--) {
            point = this.thisPoint(i, radiusStep);
            pathD += (i === istart ? "M" : " L ") + point.x + ' ' + point.y;           
        }

        // Here we are at the center and we make the outer loop toward the right
        turns = .9;
        radiusStep = this.width / 150;   //240; //.05;
        for (let i = 0; i < turns * 360; i++) {
            point = this.thisPoint(i, radiusStep);
            pathD += " L " + point.x + ' ' + point.y + ' ';
        }

        currentX = parseFloat(point.x);
        currentY = parseFloat(point.y);
        pathD += this.curveToString(
            currentX + (.15 * width), currentY + (.1 * width), 
            currentX + (.3 * width), currentY + (.35 * width), 
            currentX + (.4 * width), currentY + (.6 * width)); 


        // pathD += this.moveToString(startX + .2 * r * Math.cos(angle))
        return ({
            fill: "#666",
            stroke: "#666",
            'stroke-width': .7,
            d: pathD
        });
    }
}
