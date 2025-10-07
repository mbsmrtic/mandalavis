import { DotShape } from "/static/js/shapes/dot.js";
import { CompositeShape, MandalaShape } from "/static/js/shapes/mandalashape.js";

export class DropletShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const topY = this.y - this.length - 4;
        let width = Number(this.width);
        const pathD = this.moveToString(this.x, this.y) + 
            this.curveToString(this.x - width, topY, //initialCurve
                this.x + width, topY,  //nextCurve
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

export class RightTiltedDroplet extends TiltedDropletShape {
    constructor(shapeArgs, svgElementAttributes){
        super(shapeArgs, svgElementAttributes, false);
    }
}

export class PottedPlant extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        this.shapeArgs = {...shapeArgs};
        if (! shapeArgs.color) {
            this.shapeArgs.color = 'none';
        }
        if (! this.svgElementAttributes['stroke']) {
            this.svgElementAttributes['stroke'] = '#666';
        }
    }

    getShapes() {
        if (this.shapes.length == 0){
            var dotArgs = {...this.shapeArgs};
            if (this.shapeArgs['y']) {
                this.shapeArgs['y'] -= 4;
                dotArgs['y'] += dotArgs['width']/2;
            }
            else {
                this.shapeArgs['offset'] -= 4;
                dotArgs['offset'] -= dotArgs['width']/2;
            }
            this.addShape(new DropletShape(this.shapeArgs, this.svgElementAttributes));
            this.addShape(new TiltedDropletShape(this.shapeArgs, this.svgElementAttributes, true)); //tiltLeft
            this.addShape(new TiltedDropletShape(this.shapeArgs, this.svgElementAttributes, false));//tiltRight
            dotArgs['width'] = this.shapeArgs['width'] * .5, //.3;
            dotArgs['color'] = '#666';
            this.addShape(new DotShape(dotArgs, this.svgElementAttributes));
        }
        return this.shapes;
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
    constructor(shapeArgs, svgElementAttributes) {
        super(shapeArgs, svgElementAttributes);
        //enforce a length to width ratio of 2 - using the larger one
        if (this.length > this.width * 2) {  //if it's too fat we make it taller
            this.length = this.width * 2;
        }
        else { //if it's too skinny then we make it wider
            this.width = this.length / 2;
        }
    }
    shapeElementTag() {return 'path'};
    shapeElementAttributes() {
        //this.width = this.width * .9;
        const rx = this.width/2 - 1;
        const pt1 = {x: this.x - rx + 1, y: this.y - this.length + rx, name: 'pt1'};
        this.pt1 = pt1;
        const pt2 = {x: this.x + rx - 1, y: this.y - this.length + rx, name: 'pt2'};
        this.pt2 = pt2;
        // pt3 needs to be below (or on) the circle
        const pt3 = {x: this.x, y: this.y - this.length + rx * 2.2, name: 'pt3'};
        this.pt3 = pt3;
        const pt4 = {x: this.x, y: this.y, name: 'pt4'};
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
        //enforce a length to width ratio of 2 - using the smaller one
        if (this.length > this.width * 2) {  //if it's too tall we make it shorter
            this.length = this.width * 2;
        }
        else { //if it's too fat then we make it thinner
            this.width = this.length / 2;
        }
        this.length *= .8;
        this.width *= .9;
    }
    shapeElementTag() {return 'path'};
    shapeElementAttributes() {
        const rx = this.width/2 - 2;

        var xOffset = 0; // 2;
        if (this.tiltLeft) xOffset *= -1;
        const pt1 = {x: this.x + xOffset, y: this.y};
        this.pt1 = pt1;

        const pt2 = {x: this.x, y: this.y - this.length * .5}; // + 1};
        this.pt2 = pt2;

        xOffset = rx * 1.1;
        if (this.tiltLeft) xOffset *= -1;
        const pt3 = {x: this.x + xOffset, y: this.y - this.length + rx * .5};// * .75};
        this.pt3 = pt3;

        xOffset = rx * 2.1;
        if (this.tiltLeft) xOffset *= -1;
        const pt4 = {x: this.x + xOffset, y: pt3.y + rx * 1.5};//rx + 2.5};    //pt2.y + 1};
        this.pt4 = pt4;
        const clockwise = this.tiltLeft? 0 : 1;
        const pathD = this.moveToString(pt1.x, pt1.y) +
            this.smoothCurveString(pt2.x, pt2.y, pt3.x, pt3.y) +
            this.arcString(rx , rx, 0, 1, clockwise, pt4.x, pt4.y) +
            this.smoothCurveString(pt2.x, pt2.y, pt1.x, pt1.y); 
        return({fill: this.color, d: pathD});
    };
}
export class RightTiltedCurvyDroplet extends TiltedCurvyDroplet {
    constructor(shapeArgs, svgElementAttributes) {
        super(shapeArgs, svgElementAttributes, false);
    }
}

export class CurvyDroplets extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes){
        super(shapeArgs, svgElementAttributes);
        this.shapeArgs = {...shapeArgs};
        // //enforce a length to width ratio of 2 - using the larger one
        // if (this.shapeArgs['length'] > this.shapeArgs['width'] * 2) {  //if it's too fat we make it taller
        //     this.shapeArgs['length'] = this.shapeArgs['width'] * 2;
        // }
        // else { //if it's too skinny then we make it wider
        //     this.shapeArgs['width'] = this.shapeArgs['length'] / 2;
        // }
    }

    getShapes() {
        // If we haven't yet added the shapes, do it now
        if (this.shapes.length == 0) {
            this.addShape(new CurvyDroplet(this.shapeArgs, this.svgElementAttributes));
            var dropletArgs = {...this.shapeArgs};
            // dropletArgs['width'] = this.shapeArgs['width'] * .8;
            this.addShape(new TiltedCurvyDroplet(dropletArgs, this.svgElementAttributes, true)); //tiltLeft
            this.addShape(new TiltedCurvyDroplet(dropletArgs, this.svgElementAttributes, false)); //tiltRight
        }
        return this.shapes;
    }
}