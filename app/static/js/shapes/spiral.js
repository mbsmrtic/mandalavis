import { MandalaShape } from "./mandalashape.js";

export class SpiralShape extends MandalaShape {
    constructor(shapeArgs, svgElementAttributes, tiltLeft=true){
        super(shapeArgs, svgElementAttributes);
        this.tiltLeft = tiltLeft;
    }

    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        // startX defines the center of the spiral, so we need to 
        //   move the center up depending on the width of the shape.
        const startX = this.x;  
        const startY = this.y - (this.width / 2) + 1;

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
            if (this.tiltLeft) {
                currentX = startX + .2 * r * Math.cos(angle);
            }
            else {
                currentX = startX - .2 * r * Math.cos(angle);
            }
            currentY = currentY.toFixed(2);
            currentX = currentX.toFixed(2);
            pathD += (i === 0 ? "M" : " L") + currentX + ' ' + currentY;
        }

        return ({
            fill: "none",
            stroke: "black",
            'stroke-width': .7,
            d: pathD
        });
    }
};

export class RightSpiral extends SpiralShape {
    constructor(shapeArgs, svgElementAttributes) {
        super(shapeArgs, svgElementAttributes, false);
    }
}
