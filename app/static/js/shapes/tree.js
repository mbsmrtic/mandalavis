import { MandalaShape, CompositeShape } from "/static/js/shapes/mandalashape.js";
import { DropletShape, TiltedDropletShape, RightTiltedDroplet } from "/static/js/shapes/droplet.js"

export class TreeShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    branchesPath(w, startYHeight, endYHeight) {
        //Two lines, first the line that goes from the center and up (y - endYHeight) and to the right (x + w)
        //  then the line that goes from the center and up (y - endYHeight) and to the left (x - w)
        return `
            M ${this.x} ${this.y - startYHeight} L ${this.x + w} ${this.y - endYHeight}
            M ${this.x} ${this.y - startYHeight} L ${this.x - w} ${this.y - endYHeight}
            `
    }
    shapeElementAttributes() {
        const quarterHeight = this.length / 4;
        const branchLengthFactor = this.width / 6;
        var pathD = '';
        // vertical line - the trunk of the tree
        pathD += `M ${this.x} ${this.y} L ${this.x} ${this.y - this.length} `
        // top branches
        pathD += this.branchesPath(branchLengthFactor, quarterHeight * 3, quarterHeight * 3.5);
        // middle branches
        pathD += this.branchesPath(branchLengthFactor * 2, quarterHeight * 2, quarterHeight * 2.75);
        // bottom branches
        pathD += this.branchesPath(branchLengthFactor * 3, quarterHeight, quarterHeight * 2);
        return ({
            fill: "transparent",
            stroke: this.color,
            d: pathD
        })
    }
}

export class LeafyTreeBranches extends TreeShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const quarterHeight = this.length / 4;
        const branchLengthFactor = this.width / 20;
        var pathD = '';
        // vertical line - the trunk of the tree
        pathD += `M ${this.x} ${this.y} L ${this.x} ${this.y - this.length} `
        // top branches
        pathD += this.branchesPath(branchLengthFactor * .5, quarterHeight * 3, quarterHeight * 3.2);
        // middle branches
        pathD += this.branchesPath(branchLengthFactor * 2.25, quarterHeight * 1.9, quarterHeight * 2.4);
        // bottom branches
        pathD += this.branchesPath(branchLengthFactor * 4, quarterHeight * .8, quarterHeight * 1.55); //* 1.75);
        return ({
            fill: "transparent",
            stroke: this.color,
            d: pathD
        })
    }
}

export class LeafyTreeShape extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes={}) {
        super(shapeArgs, svgElementAttributes);
        this.shapeArgs = {...shapeArgs}
    }

    getShapes() {
        //If we've already added the shapes, just return them
        if (this.shapes.length > 0)
            return this.shapes;

        //Add base tree
        this.addShape(new LeafyTreeBranches(this.shapeArgs, this.svgElementAttributes));
        var leafAttributes = {...this.svgElementAttributes};
        const quarterHeight = this.length / 4;
        const branchLengthFactor = this.width / 20;

        //top leaf
        const leafWidth = 10;
        const leafHeight = 21;
        this.addShape(new DropletShape({
            x: this.x,
            y: this.y - this.length + 1,
            width: leafWidth,
            length: 12
            }, leafAttributes));
        //top left leaf
        this.addShape(new TiltedDropletShape({
            x: this.x - branchLengthFactor * .5, //foobar /2 + 1,
            y: this.y - quarterHeight * 3.2, //this.length + quarterHeight /2, // + 3,
            width: leafWidth * .8,
            length: leafHeight * .8
            }, leafAttributes));
        //top right leaf
        this.addShape(new RightTiltedDroplet({
            x: this.x + branchLengthFactor * .5,
            y: this.y - quarterHeight * 3.2, //this.length + quarterHeight /2,
            width: leafWidth * .8,
            length: leafHeight * .8
            }, leafAttributes));
        //mid left leaf
        this.addShape(new TiltedDropletShape({
            x: this.x - branchLengthFactor * 2.25 + 1,
            y: this.y - quarterHeight * 2.4 + 1,
            width: leafWidth * .95,
            length: leafHeight * .95
            }, leafAttributes));
        //mid right leaf
        this.addShape(new RightTiltedDroplet({
            x: this.x + branchLengthFactor * 2.25 - 1,
            y: this.y - quarterHeight * 2.4 + 1,
            width: leafWidth * .95,
            length: leafHeight * .95
            }, leafAttributes));
        //bottom left leaf
        this.addShape(new TiltedDropletShape({
            x: this.x - branchLengthFactor * 4 + 1,
            y: this.y - quarterHeight * 1.55 + 1, //1.75,
            width: leafWidth,
            length: leafHeight
            }, leafAttributes));
        this.addShape(new RightTiltedDroplet({
            x: this.x + branchLengthFactor * 4 - 1,
            y: this.y - quarterHeight * 1.55 + 1, //1.75,
            width: leafWidth,
            length: leafHeight
            }, leafAttributes));
        return this.shapes;
    }
}
