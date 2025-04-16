import { CompositeShape, MandalaShape } from "/static/js/shapes/mandalashape.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";


export class Snowflake extends CompositeShape {
    constructor(shapeArgs, svgElementAttributes){
        super(shapeArgs, svgElementAttributes);
        this.shapeArgs = {...shapeArgs};
    }
    getShapes() {
        // If we haven't yet added the shapes, do it now
        if (this.shapes.length == 0) {
            this.addShape(new CurvyDroplets({
                 offset: 72,
                 width: 25,
                 length: 25,
                 howMany: 10,
                 toolTipText: 'outer curvy droplets'
            }));
        
            this.addShape(new DotShape({
                offset: 68,
                angleStart: 6,
                width: 3,
                howMany: 30,
                color: '#999'
            }));
        
            this.addShape(new ArcShape({
                offset: 63,
                width: 24,
                length: 13,
                howMany: 10,
                angleStart: 18,
            }, {fill: 'white'}));
        
        //     mandala.addShape(new CurlyBracket({
        //         offset: 55,
        //         width: 20,
        //         howMany: 10,
        //         toolTipText: 'curlybracket'
        //     }));
        
        //     mandala.addShape(new SpiralShape({
        //         offset: 54,
        //         angleStart:17,
        //         howMany: 10,
        //         toolTipText: 'spiral'
        //     }));
        
        //     mandala.addShape(new DottedArcShape({
        //         //color: '#666',
        //         offset: 48,
        //         width: 30,
        //         length: 10,
        //         howMany: 10,
        //         toolTipText: 'dotted arc',
        //     }, {fill: 'white'}));
        
        
        //     mandala.addShape(new TiltedCurvyDroplet({
        //         offset: 27,
        //         width: 30,
        //         length: 30,
        //         angleStart: 21,
        //         howMany: 10,
        //         toolTipText: 'tilted right',
        //     }, {}, false));
        
        //     mandala.addShape(new TiltedCurvyDroplet({
        //         offset: 18,
        //         width: 30,
        //         length: 30,
        //         angleStart: 19.5,
        //         howMany: 10,
        //         toolTipText: 'tilted left',
        //     }));
        //     mandala.addShape(new CurvyDroplets({offset: mandala.innerR, howMany: 10}));            
        }
        return this.shapes;
    }
}