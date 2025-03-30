import { MandalaShape } from "./mandalashape.js";

export class DotShape extends MandalaShape {
    shapeElementTag() { return "circle"; }
    shapeElementAttributes() {
        return {
            cx: this.x,
            cy: this.y,
            r: this.width,
            fill: this.color
        }
    }
}

export class BetweenDotsDotShape extends MandalaShape {
    constructor(biggerDot) {
        var littleR = biggerDot.width / 4;
        var shapeArgs = {
            x: biggerDot.x,
            y: biggerDot.y - biggerDot.width + littleR,
            width: littleR,
            color: biggerDot.color,
            howMany: biggerDot.howMany,
            angleStart: (360/biggerDot.howMany)/2
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
