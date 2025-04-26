import { Mandala } from "/static/js/mandala.js";
import { SnowflakeMandala } from "/static/js/mandalas/sfmandala.js";
import { ImageShape } from "/static/js/shapes/imageshape.js";

var mandalaId = "mandala15";

var sf = new SnowflakeMandala(mandalaId);
sf.addShapes();
// var imageUrl = sf.drawToImage();

// var mandala = new Mandala(mandalaId, 150, 150);
// mandala.addShape(new ImageShape({
//         offset: 0,
//         width: 75,
//         length: 75,
//         howMany: 1,
//         toolTipText: 'image shape'
//     }, imageUrl));

//get the viewbox dimensions and draw a rect
//then draw a circle around the mandala on hover?
