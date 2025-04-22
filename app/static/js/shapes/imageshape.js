import { MandalaShape } from "./mandalashape.js";

export class ImageShape extends MandalaShape {
    constructor(shapeArgs, imageUrl){
        super(shapeArgs, {});
        this.imageUrl = imageUrl;
    }
    shapeElementTag() { return "image"; }
    shapeElementAttributes() {
        return {
            href: this.imageUrl,
            width: this.width,
            height: this.length,
            x: this.x - this.width / 2,
            y: this.y - this.width,
            r: this.width * .8,
            fill: this.color
        }
    }
}
