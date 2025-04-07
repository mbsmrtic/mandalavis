import { CompositeShape, MandalaShape } from "./mandalashape.js";

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
    constructor(shapeArgs, svgElementAttributes, curveLeft=true) {
        super(shapeArgs, svgElementAttributes);
        this.curveLeft = curveLeft;
        this.length *= .8;
    }
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        var elemAttributes = super.shapeElementAttributes();
        const angle = this.curveLeft ? 320 : 40;
        elemAttributes['transform'] = `rotate(${angle} ${this.x} ${this.y})`;
        return elemAttributes;
    }
    shapetiltedElementAttributes() {
        const topY = this.y - this.length * .8;
        var fooX = this.width * .4;
        if (this.curveLeft) {
            fooX *= -1;
        }
        const pathD = this.moveToString(this.x, this.y) +
            this.curveToString(this.x + fooX * 4, topY,  //initialCurve
                this.x + fooX, topY,    //nextCurve
                this.x, this.y                  //end  
            );
        return({fill: this.color, d: pathD});            
    }
    shapecurveElementAttributes() {
        var farXDist = this.width * 1.6; //16
        var midXDist = this.width; // 10  
        var shortXDist = this.width * .7;  //7
        var shortestXDist = this.width * .4;  //4
        if (this.curveLeft) {
            farXDist *= -1;
            midXDist *= -1;
            shortXDist *= -1;
            shortestXDist *= -1;
        }
        const leftX = this.x + farXDist;
        const midX = this.x + midXDist;
        const topY = this.y - this.length * .75; //.9;  //24
        const midY = this.y - this.length * .6; //21
        const lowY = this.y - this.length * .4;  //12
        const pathD = this.moveToString(this.x, this.y) +       //start at center bottom
            this.curveToString(this.x + shortestXDist, lowY,    // go up   (initialcurve)
                leftX, lowY,                                    // go left (nextCurve) 
                midX, midY) + //+ 7) +                                   // go up   (end)
            this.curveToString(this.x + shortestXDist, topY, //+ 4,       // go right (initialCurve)
                this.x + shortestXDist, lowY,                               // go down (nextCurve)
                this.x, this.y                                  // back to start (end)
            );
                

            // this.qCurveString(this.x, midY, 
            //     this.x + this.width, topY + 4
            // ) + this.qCurveString(this.x, topY,
            //     this.x - this.width, topY + 4,
            // )
            // this.curveToString(this.x, midY, //initialCurve
            //     this.x + this.width, midY,  //nextCurve
            //     this.x, topY);            //end
        return({fill: this.color, d: pathD});
    }
}

export class PottedPlant extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);

    }
}