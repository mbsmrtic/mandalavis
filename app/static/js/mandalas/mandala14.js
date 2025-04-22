import { Mandala, CompositeMandala } from "/static/js/mandala.js";
import { SnowflakeMandala } from "/static/js/mandalas/sfmandala.js";
import { ImageShape } from "/static/js/shapes/imageshape.js";

var mandalaId = "mandala14";

function setSvgViewBox(svg, viewBox) {
    if (
      svg instanceof SVGElement &&
      viewBox &&
      ['x', 'y', 'width', 'height'].every(key => typeof viewBox[key] === 'number')
    ) {
      svg.setAttribute('viewBox', [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(' '));
    } else {
      console.error('Invalid arguments for setSvgViewBox');
    }
  }
  
function scaleFn() {
    let svg = document.getElementById(mandalaId);
    let viewBox = [0, 0, 1000, 1000]; // [x, y, width, height]
    viewBox = svg.viewBox.baseVal;
    function zoom(factor) {
        var newWidth = viewBox.width / factor;
        var widthDiff = viewBox.width - newWidth;
        viewBox.x += widthDiff/2; //x
        viewBox.width = newWidth;
        var newHeight = viewBox.height / factor;
        var heightDiff = viewBox.height - newHeight;
        viewBox.y += heightDiff/2; //y
        viewBox.height = newHeight;
        setSvgViewBox(svg, viewBox);
    }
    document.getElementById('zoom-in').onclick = () => zoom(1.1);
    document.getElementById('zoom-out').onclick = () => zoom(1/1.1);
}

scaleFn();

//We build the snowflake mandala and draw it to an image
var sf = new SnowflakeMandala(mandalaId, 150, 150);
sf.addShapes();
var imageUrl = sf.drawToImage();

var mandala = new Mandala(mandalaId, 150, 150);
mandala.addShape(new ImageShape({
        offset: 30,
        width: 75,
        length: 75,
        howMany: 8,
        toolTipText: 'inner image shape'
    }, imageUrl));
    mandala.addShape(new ImageShape({
        offset: 60,
        width: 85,
        length: 85,
        howMany: 8,
        angleStart: 30,
        toolTipText: 'outer image shape'
    }, imageUrl));

mandala.addCenteredCircle(50);


