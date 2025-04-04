import { MandalaShape } from "/static/js/shapes/mandalashape.js";
import { GroupedShape } from "/static/js/shapes/mandalashape.js";
import { DotShape } from "/static/js/shapes/dot.js"

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

// I think that this doesn't extend MandalaShape - it's a collection of MandalaShapes
// It should be added to the SVG surrounded by a 'g' element
export class DottedArcShape extends GroupedShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        this.addShape(new ArcShape(shapeArgs, svgElementAttributes));

        // Dots inside the arcs
        // Calculate total arc length using elliptic integral approximation
        const dotSize = 2; 
        const dotSpacing = 8;
        const radius = this.width / 2 - 3.2;
        const height = this.length - dotSize * 2;
        const h = Math.pow((radius - height), 2) / Math.pow((radius + height), 2);
        const arcLength = Math.PI * (radius + height) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

        // Calculate number of dots based on spacing
        const totalDots = Math.floor(arcLength / dotSpacing);
        const angleStep = Math.PI / totalDots;
        var xStart = this.x; // - radius;
        var yStart = this.y + dotSize;

        for (let i = 0; i <= totalDots; i++) {
            const parametricAngle = (i * Math.PI) / totalDots;
            const dotX = xStart + radius * Math.cos(parametricAngle);
            const dotY = yStart - height * Math.sin(parametricAngle);
    


        // // Dots inside the arcs
        // let angleStep = (180 / (radius * Math.PI * this.length)) + .2; // / (dotSize + dotSpacing));
        // angleStep = Math.PI / 12;

        // let i = 0;
        // for (let angle = .27; angle < Math.PI; angle += angleStep) {
        //     const dotX = xStart + radius * Math.cos(angle);
        //     const dotY = yStart - (this.length - 3) * Math.sin(angle);

            this.addShape(new DotShape({
                x: dotX,
                y: dotY,
                color: "black",
                width: 2,
                }));
        }


        // let w = this.width * 2;
        // for (let i=10; i < 180; i+=20) {
        //     let angle = ((i * Math.PI) / 180);
        //     const dotY = this.y - .014 * this.length * w * Math.sin(angle);
        //     const dotX = xStart - .2 * w * Math.cos(angle) + (w/4);

        //     this.addShape(new DotShape({
        //         x: dotX,
        //         y: dotY + 1,
        //         color: "black",
        //         width: 1.25,
        //         }));
        // }
    }
}

