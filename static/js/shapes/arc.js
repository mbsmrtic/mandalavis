import { MandalaShape } from "./mandalashape.js";

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

