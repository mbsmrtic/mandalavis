import { MandalaShape } from "./mandalashape.js";

export class DropletShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const topY = this.y - this.length - 4;
        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(this.x - this.width, topY, //initialCurve
                this.x + this.width, topY,  //nextCurve
                this.x, this.y);            //end
        return({fill: this.color, d: pathD});
    }
}
