// The MandalaShape constructor takes some basic shape related args.
// The pattern is:
//   - create the shape object:   const dropletShape = new DropletShape({...})
//   - add it to the mandala      mandala.addShape({ shape: })
// It also takes svgElementAttributes. svgElementAttributes can take anything that 
//   you want applied to the svgElement that will draw the shape. 
//   If you want to alter things like stroke-width or color, look at the 
//   shape's shapeElementTag, then look up that tag here:
//      https://developer.mozilla.org/en-US/docs/Web/SVG 
//   to see what attributes can be set.  
export class MandalaShape {
    constructor(
        {x, y, length=20, width=15, howMany=1, angleStart=0, color="#666", toolTipText=null, offset=0, clusterid=0},
        svgElementAttributes={}
    ) {
        this.clusterid = clusterid;
        this.x = x;
        this.y = y;
        this.offset = offset;
        this.width = width;
        this.angleStart = angleStart;
        this.angleStep = 360 / howMany;
        this._howMany = howMany;
        this.color = color;
        this.length = length;
        this.toolTipText = toolTipText;
        this.controlPoints = [];
        this.svgElementAttributes = svgElementAttributes;
    }

    /**
     * @param {number} value
     * We have this setter because the angleStep is calculated from _howMany.
     * So here if _howMany changes, we recalculate it.
     */
    set howMany(value) {
        this._howMany = value;
        this.angleStep = 360 / value;
    }

    get howMany() {
        return this._howMany;
    }

    // This is here because some shapes are not (yet?) functional enough to be selected in the control panel.
    includeInControlPanel() {
        return true; // By default, all shapes are included in the control panel.
    }

    shapeElementAttributes() {
        return this.svgElementAttributes;
    }

    shapeElementTag() {
        return "path";
    }

    moveToString(startX, startY) {
        return `M ${startX},${startY} `;
    }
    
    curveToString(initialCurveX, initialCurveY, nextCurveX, nextCurveY, endX, endY) {
        return `C ${initialCurveX}, ${initialCurveY}
            ${nextCurveX}, ${nextCurveY}, 
            ${endX}, ${endY}
        `
    }

    qCurveString(curveX, curveY, endX, endY, showCurveDots = false)
    {
        if (showCurveDots) {
            this.addDot(curveX, curveY, .5, "red");
        }
        return ` Q ${curveX}, ${curveY}  ${endX}, ${endY} `;
    }

    arcString(xRadius, yRadius, rot, isLargeArc, isClockwise, endX, endY) {
        return `A ${xRadius}, ${yRadius}  ${rot} ${isLargeArc} ${isClockwise} ${endX}, ${endY}`;
    }

    smoothCurveString(curveX, curveY, endX, endY)
    {
        return ` S ${curveX} ${curveY}, ${endX} ${endY} `;
    }

}

// A CompositeShape is a shape that is made up of other shapes. 
// It has all the properties of a shape, but it contains multiple shapes. 
// An example of this is a dotted arc. It has an arc and bunch of dots. 
// But when it is selected, the whole thing gets selected, not it's individual
// parts. 
export class CompositeShape extends MandalaShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        this.shapes = [];
    }
    //The group howMany and angleStart override the shape's.
    addShape(shape) {
        shape.howMany = this.howMany;
        shape.angleStart = this.angleStart;
        this.shapes.push(shape);
    }
    getShapes() {
        return this.shapes;
    }
}

