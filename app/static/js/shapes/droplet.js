import { DotShape } from "/static/js/shapes/dot.js";
import { CompositeShape, MandalaShape } from "/static/js/shapes/mandalashape.js";

export class DropletShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const topY = this.y - this.length - 4;
        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(this.x - this.width, topY, //initialCurve
                this.x + this.width, topY,  //nextCurve
                this.x, this.y);            //end
        return({fill: this.color, d: pathD});
    }
}

export class TiltedDropletShape extends DropletShape {
    constructor(shapeArgs, svgElementAttributes, tiltLeft=true) {
        super(shapeArgs, svgElementAttributes);
        this.tiltLeft = tiltLeft;
        this.length *= .8;
    }
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        var elemAttributes = super.shapeElementAttributes();
        const angle = this.tiltLeft ? 320 : 40;
        elemAttributes['transform'] = `rotate(${angle} ${this.x} ${this.y})`;
        return elemAttributes;
    }
}

export class PottedPlant extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        var dropletArgs = {...shapeArgs};
        dropletArgs['y'] -= 4;
        dropletArgs['width'] /= 3;
        dropletArgs['length'] /= 2;
        if (! dropletArgs.color) {
            dropletArgs.color = 'none';
        }
        if (! svgElementAttributes['stroke']) {
            svgElementAttributes['stroke'] = '#666';
        }
        this.addShape(new DropletShape(dropletArgs, svgElementAttributes));
        this.addShape(new TiltedDropletShape(dropletArgs, svgElementAttributes, true)); //tiltLeft
        this.addShape(new TiltedDropletShape(dropletArgs, svgElementAttributes, false));//tiltRight
        var dotArgs = shapeArgs;
        dotArgs['width'] = dropletArgs['width'] * .5;
        dotArgs['color'] = '#666';
        this.addShape(new DotShape(dotArgs, svgElementAttributes));
    }
}

// <path mandalaid="mandala10" 
//      fill="#333" d=
//  "M 80,80 
//      A 20, 20  0 1 1 120, 80 
//      S 100 90, 100 110  
//      Q 100, 90  100, 70 ">
// a curvy droplet</path>
export class CurvyDroplet extends MandalaShape {
    shapeElementTag() {return 'path'};
    shapeElementAttributes() {
        this.width *= .9;
        const rx = this.width/2 - 1;
        const pt1 = {x: this.x - rx + 1, y: this.y - this.length + rx};
        this.pt1 = pt1;
        const pt2 = {x: this.x + rx - 1, y: this.y - this.length + rx};
        this.pt2 = pt2;
        // pt3 needs to be below (or on) the circle
        const pt3 = {x: this.x, y: this.y - this.length + rx * 2};
        this.pt3 = pt3;
        const pt4 = {x: this.x, y: this.y};
        this.pt4 = pt4;
        const pathD = this.moveToString(pt1.x, pt1.y) +
            this.arcString(rx, rx, 0, 1, 1, pt2.x, pt2.y) +
            this.smoothCurveString(pt3.x, pt3.y, pt4.x, pt4.y) + 
            this.qCurveString(pt3.x, pt3.y, pt1.x, pt1.y);
        return({fill: this.color, d: pathD});
    }
}

export class TiltedCurvyDroplet extends MandalaShape {
    constructor(shapeArgs, svgElementAttributes, tiltLeft=true) {
        super(shapeArgs, svgElementAttributes);
        this.tiltLeft = tiltLeft;
        this.length *= .8;
        this.width *= .9;
    }
    shapeElementTag() {return 'path'};
    shapeElementAttributes() {
        const rx = this.width/2 - 2;

        var xOffset = 2;
        if (this.tiltLeft) xOffset *= -1;
        const pt1 = {x: this.x + xOffset, y: this.y};
        this.pt1 = pt1;

        const pt2 = {x: this.x, y: this.y - this.length/2 + 1};
        this.pt2 = pt2;

        xOffset = rx;
        if (this.tiltLeft) xOffset *= -1;
        const pt3 = {x: this.x + xOffset, y: this.y - this.length + rx * .75};
        this.pt3 = pt3;

        xOffset = rx * 2;
        if (this.tiltLeft) xOffset *= -1;
        const pt4 = {x: this.x + xOffset, y: pt3.y + rx * 1.25};//rx + 2.5};    //pt2.y + 1};
        this.pt4 = pt4;
        const clockwise = this.tiltLeft? 0 : 1;
        const pathD = this.moveToString(pt1.x, pt1.y) +
            this.smoothCurveString(pt2.x, pt2.y, pt3.x, pt3.y) +
            this.arcString(rx , rx, 0, 1, clockwise, pt4.x, pt4.y) +
            this.smoothCurveString(pt2.x, pt2.y, pt1.x, pt1.y); 
        return({fill: this.color, d: pathD});
    };
}