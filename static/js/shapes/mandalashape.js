// The MandalaShape constructor takes some basic shape related args.
// The pattern is:
//   - create the shape object:   const dropletShape = new DropletShape({...})
//   - add it to the mandala      mandala.addShape({ shape: })
// It also takes svgElementAttributes. This object can take anything that 
//   you want applied to the svgElement that will draw the shape. 
//   If you want to alter things like stroke-width or color, look at the 
//   shape's shapeElementTag, then look up that tag here:
//      https://developer.mozilla.org/en-US/docs/Web/SVG 
//   to see what attributes can be set.  
export class MandalaShape {
    constructor(
        {x, y, length=20, width=15, howMany=1, angleStart=0, color="black", toolTipText=null},
        svgElementAttributes={}
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.angleStart = angleStart;
        this.angleStep = 360 / howMany;
        this.toolTipText = null;
        this._howMany = howMany;
        this.color = color;
        this.length = length;
        this.toolTipText = toolTipText;
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

}

