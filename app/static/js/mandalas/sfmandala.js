import { Mandala } from "/static/js/mandala.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js";
import { TiltedCurvyDroplet, CurvyDroplets, DropletShape, CurvyDroplet, PottedPlant } from "/static/js/shapes/droplet.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js"
import { DotShape, BetweenDotsDotShape } from "/static/js/shapes/dot.js";
import { PalmTreeShape } from "/static/js/shapes/palmtree.js";
import { WaveShape } from "/static/js/shapes/wave.js";
import { SnowflakeShape } from "/static/js/shapes/snowflake.js";

export class SnowflakeMandala extends Mandala {
    drawToImage() {
        //get the svg
        var svgElement = document.getElementById(this.elementId);
        const svgString = new XMLSerializer().serializeToString(svgElement);

        const canvas = new OffscreenCanvas(300, 300);
        const ctx = canvas.getContext('2d');
        
        const blob = new Blob([svgString], {type: "image/svg+xml"});
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;
        // remove the svg from the dom
        document.querySelectorAll(`[mandalaid="${this.elementId}"`).forEach(el => el.remove());
        return url;
    }
    addShapes() {
        this.addShape(new CurvyDroplets({
            offset: 72,
            width: 25,
            length: 25,
            howMany: 10,
            toolTipText: 'outer curvy droplets'
        }))
    
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
    
        this.addShape(new CurlyBracket({
            offset: 55,
            width: 20,
            howMany: 10,
            toolTipText: 'curlybracket'
        }));
    
        this.addShape(new SpiralShape({
            offset: 54,
            angleStart:17,
            howMany: 10,
            toolTipText: 'spiral'
        }));
    
        this.addShape(new DottedArcShape({
            //color: '#666',
            offset: 48,
            width: 30,
            length: 10,
            howMany: 10,
            toolTipText: 'dotted arc',
        }, {fill: 'white'}));
    
    
        this.addShape(new TiltedCurvyDroplet({
            offset: 27,
            width: 30,
            length: 30,
            angleStart: 21,
            howMany: 10,
            toolTipText: 'tilted right',
        }, {}, false));
    
        this.addShape(new TiltedCurvyDroplet({
            offset: 18,
            width: 30,
            length: 30,
            angleStart: 19.5,
            howMany: 10,
            toolTipText: 'tilted left',
        }));
        this.addShape(new CurvyDroplets({offset: this.innerR, howMany: 10}));        
    }
}