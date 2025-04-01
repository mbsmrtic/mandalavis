import { MandalaShape } from "./mandalashape.js";

export class CurlyBracket extends MandalaShape {
    constructor(shapeArgs, svgElementAttributes = {}) {
        super(shapeArgs, svgElementAttributes);
        const bracketLength = this.length;
        var startY = this.y + 1.5; // Heuristic to account for curve
        this.bracketStartY = startY;
        this.curveOutY = startY - (bracketLength * 0.9); // Curve outward
        this.curveInY = startY - (bracketLength * 0.4);  // Curve inward
        this.bracketEndY = startY - bracketLength - 1.5; // End of the bracket
        this.bracketStartX = this.x - (this.width / 2);  // Start X position
        this.bracketEndX = this.x + (this.width / 2);    // End X position
    }

    shapeElementTag() {
        return "path";
    }

    shapeElementAttributes() {
        const pathD =
            this.moveToString(this.bracketStartX, this.bracketStartY) +
            this.curveToString(
                this.bracketStartX, this.curveOutY, // Initial curve outward
                this.x, this.curveInY,             // Curve inward toward center
                this.x, this.bracketEndY           // End at the top center
            ) +
            this.curveToString(
                this.x, this.curveInY,             // Curve inward from center
                this.bracketEndX, this.curveOutY,  // Curve outward again
                this.bracketEndX, this.bracketStartY // End back at start Y
            );

        // We need a fill here so that the tooltip works correctly
        var elementAttrs = {
            fill: "white",
            stroke: this.color,
            'stroke-width': 0.3,
            d: pathD,
        };
        return elementAttrs;
    }
};



