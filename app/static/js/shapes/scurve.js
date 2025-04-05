import { MandalaShape } from "./mandalashape.js";

export class SCurve extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const startX = this.x;  
        const startY = this.y;
        const rightCurveX = startX + (this.width * 1); //.66);
        const rightCurveY = startY - (this.length * 0); //.11);
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
            this.qCurveString(startX - (this.width * .33), startY - (this.length * 1.2), //.77), 
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
