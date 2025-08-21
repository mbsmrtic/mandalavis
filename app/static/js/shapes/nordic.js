import { MandalaShape } from "/static/js/shapes/mandalashape.js";
export class NordicShape extends MandalaShape {
    includeInControlPanel() {
        return false; // This shape needs some work to be functional for selection in the control panel.
    }
    shapeElementTag() { return "rect"; }
    shapeElementAttributes() {
        const pathD = '';
        return {
            x: this.x - this.width/2,
            y: this.y,
            width: this.width,
            height: this.length,
            rx: 3,
            stroke: this.color
        }
    }
}
