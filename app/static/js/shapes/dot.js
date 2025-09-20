import { MandalaShape } from "./mandalashape.js";

export class DotShape extends MandalaShape {
    shapeElementTag() { return "circle"; }
    shapeElementAttributes() {
        let r = this.width /2;
        return {
            cx: this.x,
            cy: this.y - r, // - this.width,
            r: r,
            fill: this.color
        }
    }
}

export class BetweenDotsDotShape extends MandalaShape {
    static includeInControlPanel = false;
    constructor(biggerDot) {
        var littleR = biggerDot.width / 8;
        var shapeArgs = {
            x: biggerDot.x,
            y: biggerDot.y - biggerDot.width * .9, // + littleR * 2,
//            y: biggerDot.y - biggerDot.width * 2 + littleR * 2,
            width: littleR,
            color: biggerDot.color,
            howMany: biggerDot.howMany,
            angleStart: (360/biggerDot.howMany)/2 - biggerDot.angleStart
        };        
        super(shapeArgs, biggerDot.svgElementAttributes);
    }
    shapeElementTag() { return "circle"}
    shapeElementAttributes() {
        return {
            cx: this.x,
            cy: this.y,
            r: this.width,
            fill: this.color
        }
    }
}
