import { DotShape } from "/static/js/shapes/dot.js";
import { CurvyDroplet, CurvyDroplets, DropletShape, TiltedCurvyDroplet, TiltedDropletShape, PottedPlant } from "/static/js/shapes/droplet.js";
import { DottedArcShape, ArcShape } from "/static/js/shapes/arc.js";
import { SpiralShape } from "/static/js/shapes/spiral.js"
import { CurlyBracket } from "/static/js/shapes/curlybracket.js";
import { Seagull } from "/static/js/shapes/seagull.js";
import { BetweenDotsDotShape } from "/static/js/shapes/dot.js"
import { ImageShape } from "/static/js/shapes/imageshape.js"
import { SShape } from "/static/js/shapes/s.js";
import { SCurve } from "/static/js/shapes/scurve.js"
import { WaveShape } from "/static/js/shapes/wave.js"

// shapeClasses is an object that maps shape types to their respective classes
// This allows for easy instantiation of different shapes based on their type
// without needing to use a switch statement or if-else chain
// Each shape class extends MandalaShape.
// Because we create our mandalas from the data created in python on the server,
// this object should contain the same shapes that are in /app/src/mandalas/mandaladata.py ShapeType.
const shapeClasses = {
    ArcShape,
    BetweenDotsDotShape,
    CurlyBracket,
    CurvyDroplets,
    CurvyDroplet,
    DottedArcShape,
    DotShape,
    DropletShape,
    ImageShape,
    SpiralShape,
    TiltedCurvyDroplet,
    TiltedDropletShape,
    PottedPlant,
    Seagull,
    SShape,
    SCurve,
    WaveShape,
  };
  
  export function createShape(type, ...args) {
    const ShapeClass = shapeClasses[type];
    if (!ShapeClass) {
      throw new Error('Unknown shape type');
    }
    return new ShapeClass(...args);
  }
  
  // Usage:
  // const shape = createShape('ArcShape', shapeArgs, svgAttrs);
  