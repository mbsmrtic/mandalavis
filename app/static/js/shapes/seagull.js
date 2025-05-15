import { MandalaShape } from "./mandalashape.js";

export class Seagull extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const leftCurvePt = { x: this.x - (this.width/4), y: this.y - (this.length) };
        const rightCurvePt = { x: this.x + (this.width/4), y: this.y - (this.length) };
        const xPtOffset = this.width/8;
        const yPtOffset = this.length/4;
        const pathD = this.moveToString(this.x - (this.width/2), this.y - yPtOffset) +
            this.curveToString(leftCurvePt.x - xPtOffset, leftCurvePt.y, //initialCurve 
                leftCurvePt.x + xPtOffset, leftCurvePt.y, //nextCurve 
                this.x, this.y - yPtOffset) + //end
            this.curveToString(rightCurvePt.x - xPtOffset, rightCurvePt.y, //initialCurve 
                rightCurvePt.x + xPtOffset, rightCurvePt.y, //nextCurve 
                this.x + this.width/2, this.y - yPtOffset); //end
        var elementAttrs = {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        };
        return elementAttrs;
    }
}

