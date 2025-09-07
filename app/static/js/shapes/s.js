import { MandalaShape } from "./mandalashape.js";

export class SShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const leftCurveX = this.x - (this.width * .9);    //.5);
        const leftCurveY = this.y - (this.length * .25);
        const rightCurveX = this.x + (this.width * .9); //.5);
        const rightCurveY = this.y - (this.length * .75);

        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(leftCurveX, leftCurveY,   //initialCurve
                rightCurveX, rightCurveY,             //nextCurve
                this.x, this.y - this.length
            );
        return ({
            fill: "transparent",
            stroke: "#666",
            d: pathD
        });
    }
}
