import { Mandala } from "/static/js/mandala.js";
import { Peapod } from "/static/js/shapes/peapod.js";
import { initInteractions } from "/static/js/svg-interactions.js";
import { DotShape } from "/static/js/shapes/dot.js";

const mandalaNum = '16';
var mandalaId = "mandala" + mandalaNum;
const mainElementId = mandalaId;      // `${mandalaId}-main`;

initInteractions(mandalaNum);

var mandala = new Mandala(mainElementId, 200, 200);
mandala.addShape(new Peapod({
    offset: 60,
    width: 85,
    length: 85,
    howMany: 1,
    toolTipText: 'peapod'
}));

mandala.addDot(20, 60);
mandala.addDot(100, 10);
mandala.addDot(180, 60);
mandala.addDot(100, 110);

mandala.addShape(new DotShape({
    offset: 90,
    width: 22,
    length: 22,
    howMany: 1,
}));
