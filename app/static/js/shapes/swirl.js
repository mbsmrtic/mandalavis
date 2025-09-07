import { MandalaShape } from "./mandalashape.js";

export class SwirlShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(this.x - 4, this.y - 9,
                this.x + 9, this.y - 6,
                this.x + 3, this.y - 2
            );
        return {
            fill: "transparent",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        };
    }
}
