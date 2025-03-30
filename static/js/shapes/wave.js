import { MandalaShape } from "./mandalashape.js";

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
