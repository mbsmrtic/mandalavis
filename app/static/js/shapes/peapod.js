import { MandalaShape } from "./mandalashape.js";

export class Peapod extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        // let pathD = this.moveToString(20, 60) +
        //     this.qCurveString()
        const pathD = "M20,60 Q100,10 180,60 Q100,110 20,60 Z";
        return ({
            fill: "#7AC74F",
            stroke: "#388E3C",
            d: pathD
        });
    }
}

//
