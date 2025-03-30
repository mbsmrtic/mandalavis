import { MandalaShape } from "./mandalashape.js";

export class CurlyBracket extends MandalaShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        const bracketLength = this.length;
        var startX = this.x - 1.5;  //heuristic to account for curve
        this.bracketStartX = startX;
        this.curveOutX = startX + (bracketLength * .9);    //+ 28;          //135
        this.curveInX = startX + (bracketLength * .4); // 13;           //120
        this.bracketEndX = startX + bracketLength + 1.5;   //140
        this.bracketStartY = this.y - (this.width/2);      //10;            //60
        this.bracketEndY = this.y + (this.width/2)        //10;              //80
    }
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const pathD = this.moveToString(this.bracketStartX, this.bracketStartY) + 
            this.curveToString(this.curveOutX, this.bracketStartY,  //initialCurve
                this.curveInX, this.y,           //nextCurve
                this.bracketEndX, this.y                   //end
             ) + 
             this.curveToString(this.curveInX, this.y, //initialCurve
                this.curveOutX, this.bracketEndY,              //nextCurve
                this.bracketStartX, this.bracketEndY
             )

        // We need a fill here so that the tooltip works correctly
        var elementAttrs = {
            fill: "white",
            stroke: this.color,
            'stroke-width': .3,
            d: pathD
        };
        return elementAttrs;
    }
};


