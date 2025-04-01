import { MandalaShape } from "./mandalashape.js";

export class ArcShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const radius = this.width / 2;
        const pathD = this.moveToString(this.x - radius, this.y) + 
            this.arcString(
                radius, this.length,
                0,  //0 = centered, not skewed
                1,  // 0 = smaller arc
                1,  // 1 = clockwise
                this.x + radius,  //x end
                this.y  //y end
            )
        return {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        }
    }
}

