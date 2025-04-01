import { MandalaShape } from "./mandalashape.js";

export class PalmTreeShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        var foo = 5;
        const pathD = this.moveToString(this.x - foo, this.y - 4) + 
            this.curveToString(this.x - 2, this.y - 7, //initialCurve
                this.x, this.y - 4, //nextCurve
                this.x, this.y //end
                ) + 
            this.curveToString(this.x, this.y - 4, //initialCurve
                this.x + 2, this.y - 7, //nextCurve
                this.x + foo, this.y - 4 //end
                );
        var elementAttrs = {
            fill: "none",
            stroke: "black",
            'stroke-width': .3,
            d: pathD
        };
        return elementAttrs;
    }
}

