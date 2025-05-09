import { MandalaShape } from "./mandalashape.js";

export class Peapod extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        let halfWidth = this.width/2;
        let halfHeight = this.length/2;
        let halfX = this.x - halfWidth;
        let halfY = this.y - halfHeight;
        let fullY = this.y - this.length;
        let pt1 = {x: halfX, y: halfY, name: 'pt1'};
        let pt2 = {x: halfX, y: fullY, name: 'pt2'};
        let pt3 = {x: this.x, y: halfY};
        this.controlPoints.push(pt1, pt2, pt3);
        let pathD = this.moveToString(this.x, this.y) + 
            this.qCurveString(pt1.x, pt1.y, 
                pt2.x, pt2.y) + 
            this.qCurveString(pt3.x, pt3.y, this.x, this.y);

        // right hand pod
        halfX = this.x + halfWidth;
        let pt4 = {x: halfX, y: halfY};
        let pt5 = {x: halfX, y: fullY};
        let pt6 = {x: this.x, y: halfY};
        this.controlPoints.push(pt4, pt5, pt6);
        pathD += this.qCurveString(pt4.x, pt4.y,
            pt5.x, pt5.y) + 
            this.qCurveString(pt6.x, pt6.y, this.x, this.y);

        // let pathD = this.moveToString(20, 60) +
        //     this.qCurveString()
        // const pathD = "M20,60 Q100,10 180,60 Q100,110 20,60 Z";
        return ({
            fill: "#666",  //"#7AC74F",
            stroke: "#666", //"#388E3C",
            d: pathD
        });
    }
}

//
