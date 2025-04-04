import { MandalaShape } from "/static/js/shapes/mandalashape.js";
import { CompositeShape } from "/static/js/shapes/mandalashape.js";

export class ArcShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const radius = this.width / 2;
        const pathD = this.moveToString(this.x - radius, this.y) + 
            this.arcString(
                radius, this.length,
                0,  //0 = centered, not skewed
                0,  // 0 = smaller arc
                1,  // 1 = clockwise
                this.x + radius,  //x end
                this.y  //y end
            )
        return {
            fill: "none",
            stroke: this.color,
            'stroke-width': .3,
            d: pathD
        }
    }
}

export class DottedArcShape extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        this.addShape(new ArcShape(shapeArgs, svgElementAttributes));
        this.addShape(new ArcShape({
                x: this.x,
                y: this.y,
                width: this.width - 5,
                length: this.length - 3,
            }, 
            {'stroke-dasharray': 2, 'stroke-width': 2}));
        }
}

