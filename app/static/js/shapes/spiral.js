import { MandalaShape } from "./mandalashape.js";

export class SpiralShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        // startX defines the center of the spiral, so we need to 
        //   move the center up depending on the width of the shape.
        const startX = this.x;  
        const startY = this.y - (this.width / 2) + 1;

        this.controlPoints = [
            {x: 150, y: 150, name: 'start'},
            {x: 170, y: 130, name: '1'}, {x: 200, y: 130, name: '2'}, {x: 210, y: 150, name: '3'},
            {x: 220, y: 170, name: '4'}, {x: 200, y: 200, name: '5'}, {x: 180, y: 210, name: '6'},
            {x: 160, y: 220, name: '7'}, {x: 130, y:200, name: '8'}, {x:120, y:180, name: '9'},
            {x: 110, y: 160, name: '10'}, {x: 130, y: 130, name: '11'}, {x:150, y:150, name: '12'}];

        //spiral
        const turns = 2.16;
        const radiusStep = this.width / 240; //.05;
        var pathD ='';
        let currentX = 0;
        let currentY = 0;
        for (let i = 0; i < turns * 360; i+=9) {
            let angle = ((i * Math.PI) / 180);
            let r = i * radiusStep;
            currentY = startY + .2 * r * Math.sin(angle);
            currentX = startX + .2 * r * Math.cos(angle);
            currentY = currentY.toFixed(2);
            currentX = currentX.toFixed(2);
            pathD += (i === 0 ? "M" : " L") + currentX + ' ' + currentY;
        }

        // var pathD = this.moveToString(this.controlPoints[0].x, this.controlPoints[0].y);
        // for (let i = 1; i < this.controlPoints.length; i++) {
        //     let pt = this.controlPoints[i++];
        //     let nextPt = this.controlPoints[i++];
        //     let endPt = this.controlPoints[i];
        //     pathD += this.curveToString(pt.x, pt.y, nextPt.x, nextPt.y, endPt.x, endPt.y);
        // }

        // pathD = "M100,100 " +
        //    "C120,100 140,120 140,140 " +
        //    "C140,160 120,180 100,180 " +
        //    "C80,180 60,160 60,140 " +
        //    "C60,120 80,100 100,100";
        return ({
            fill: "none",
            stroke: "black",
            'stroke-width': .7,
            d: pathD
        });
    }
};
