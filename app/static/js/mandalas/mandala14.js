import { Mandala } from "/static/js/mandala.js";
import { SnowflakeMandala } from "/static/js/mandalas/sfmandala.js";
import { ImageShape } from "/static/js/shapes/imageshape.js";
import { initInteractions } from "/static/js/svg-interactions.js";

var mandalaNum = '14';
var mandalaId = "mandala" + mandalaNum;
const mandalaElementId = mandalaId;  // `${mandalaId}-main`;

initInteractions(mandalaNum);

//We build the snowflake mandala and draw it to an image
var sf = new SnowflakeMandala(mandalaElementId, 200, 200);
sf.addShapes();
var imageUrl = sf.drawToImage();

var mandala = new Mandala(mandalaElementId, 200, 200);
mandala.addShape(new ImageShape({
        offset: 60,
        width: 85,
        length: 85,
        howMany: 6,
        toolTipText: 'inner image shape'
    }, imageUrl));
    mandala.addShape(new ImageShape({
        offset: 120,
        width: 85,
        length: 85,
        howMany: 6,
        angleStart: 30,
        toolTipText: 'outer image shape'
    }, imageUrl));

mandala.addCenteredCircle(60);

