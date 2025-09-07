import { MandalaShape } from "/static/js/shapes/mandalashape.js";
import { CompositeShape } from "/static/js/shapes/mandalashape.js";
import { DotShape } from "/static/js/shapes/dot.js";

export class ArcShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const radius = this.width / 2;
        const clockwise = this.length < 0 ? 0 : 1;
        const pathD = this.moveToString(this.x - radius, this.y) + 
            this.arcString(
                radius, this.length,
                0,  //0 = centered, not skewed
                0,  // 0 = smaller arc
                clockwise, //1,  // 1 = clockwise
                this.x + radius,  //x end
                this.y  //y end
            );

        return {
            fill: "transparent",
            stroke: this.color,
            'stroke-width': .3,
            d: pathD
        }
    }
}

export class DottedArcShape extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        this.shapeArgs = {...shapeArgs}
    }

    getShapes() {
        // If we haven't yet added the shapes, do it now
        if (this.shapes.length == 0) {
            this.addShape(new ArcShape(this.shapeArgs, this.svgElementAttributes));
            const dotSize = 1.6;
            this.y += dotSize;
            // make dots 
            const turns = 1;
            //const radiusStep = this.width / 240; //.05;
            const rx = this.width * 2;
            const ry = this.length * 4;
            var startX = this.x;
            var startY = this.y;
            var dotAttributes = {...this.svgElementAttributes};
            dotAttributes['fill'] = '#333';
            for (let i = 0; i <= 180; i+= 12) {
                let angle = ((i * Math.PI) / 180);
                //let r = i * radiusStep;
                let currentY = startY - .2 * ry * Math.sin(angle);
                let currentX = startX + .2 * rx * Math.cos(angle);
                currentY = currentY.toFixed(4);
                currentX = currentX.toFixed(4);
                this.addShape(new DotShape({
                    x: currentX,
                    y: currentY,
                    width: dotSize
                }, dotAttributes))
            }    
        }
        return this.shapes;
    }
}

