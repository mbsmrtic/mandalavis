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