
////////////////////////////////////////////////////////////////////////
// Dragging 
////////////////////////////////////////////////////////////////////////
let isDragging = false;
let canvas = {};
let mousemovehandler;
let mouseuphandler;

function startDrag(e, mandalaElementId) {
  isDragging = true;
  const currentTransform = getTransform(mandalaElementId);
  const sctm = document.getElementById(mandalaElementId).getScreenCTM();
  var clientPoint = getPoint(e);
  const mouseStart = transformFromViewportToElement(clientPoint.x, clientPoint.y, sctm, currentTransform);

  canvas = {
    mouseStart,
    transform: currentTransform,
    sctm
  }

  mousemovehandler = (e) => drag(e, mandalaElementId);
  window.addEventListener('mousemove', mousemovehandler);
  window.addEventListener('touchmove', mousemovehandler);
  mouseuphandler = (e) => {
    let svg = document.getElementById(mandalaElementId + 'svg');
    svg.style.cursor = 'grab';
    endDrag();
  };
  window.addEventListener('mouseup', mouseuphandler);
  window.addEventListener('touchend', mouseuphandler);
  e.stopPropagation();
  e.preventDefault();
}

function startZoom(e, mandalaElementId) {
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const currentDistance = getDistance(e.touches);
      const factor = currentDistance / initialDistance;
      zoom(factor);
    }
    e.preventDefault();  //prevent browser default zoom
  });
  window.addEventListener('touchend', (e) => {
    initialDistance = null;  //restart
    window.removeEventListener('touchmove', this);
  });
  e.stopPropagation();
  e.preventDefault();
}

function getTransform(mandalaElementId) {
  const matrix = document.getElementById(mandalaElementId).getAttribute('transform');
  return matrix.replace(/^matrix\(/, '').replace(/\)$/, '').split(' ').map(parseFloat);
}

function getPoint(e) {
  var clientX, clientY;
  if (e.type === 'mousedown' || e.type === 'mousemove') {
    clientX = e.clientX;
    clientY = e.clientY;
  } else if (e.type === 'touchstart' || e.type === 'touchmove') {
    var touch = e.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  }
  return {x: clientX, y: clientY}
}

function drag(e, mandalaElementId) {
  if (!isDragging) return;

  var clientPoint = getPoint(e);
  const client = transformFromViewportToElement(clientPoint.x, clientPoint.y, canvas.sctm, canvas.transform, mandalaElementId);
  const movement = {
    x: canvas.mouseStart.x - client.x,
    y: canvas.mouseStart.y - client.y
  };
  const startMatrix = [...canvas.transform];
  startMatrix[4] = startMatrix[4] - movement.x;
  startMatrix[5] = startMatrix[5] - movement.y;

  document.getElementById(mandalaElementId).setAttribute(
    'transform', `matrix(${startMatrix.join(', ')})`);
  e.stopPropagation();
}

function transformFromViewportToElement(x, y, sctm=null, elementTransform=null, mandalaElementId) {
  const p = new DOMPoint(x, y);

  let screenTransform;
  if (sctm === null) {
    screenTransform = document.getElementById(mandalaElementId).getScreenCTM();
  } else {
    screenTransform = sctm;
  }

  const inverseScreenTransform = screenTransform.inverse();
  const transformedPoint = p.matrixTransform(inverseScreenTransform);
  if (elementTransform !== null) {
    transformedPoint.x *= elementTransform[0]; 
    transformedPoint.y *= elementTransform[3];
  }

  return {x: transformedPoint.x, y: transformedPoint.y};
}


function endDrag() {
  isDragging = false;
  canvas = {};

  window.removeEventListener('mousemove', mousemovehandler);
  window.removeEventListener('touchmove', mousemovehandler);
  window.removeEventListener('mouseup', mouseuphandler);
  window.removeEventListener('touchend', mouseuphandler);
}

export function setSvgViewBox(svg, viewBox) {
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

let initialDistance = null;
function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export class MandalaInteractions {
  constructor(mandalaNum) {
    this.mandalaNum = mandalaNum;
    this.svg = document.getElementById('mandala' + mandalaNum + 'svg');
    this.isDragging = false;
    this.viewBox = { x: 0, y: 0, width: 0, height: 0 };
    this.ratio = 1;
    this.canvas = {};
    this.mandalaElementId = 'mandala' + mandalaNum;

  // function initInteractions(mandalaNumber) {
      // mandalaNum = mandalaNumber;
      // let svgId = 'mandala' + mandalaNumber + 'svg';
      // mandalaElementId = 'mandala' + mandalaNum;  // svgId + '-main';
      this.getViewBox(this.svg);
      this.updateRatio();
      // Event listeners
      let mei = this.mandalaElementId;
      this.svg.addEventListener('mousedown', function(e) {
        e.currentTarget.style.cursor = 'grabbing';
        startDrag(e, mei);
      });
      this.svg.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {  // only deal with one finger
          e.currentTarget.style.cursor = 'grabbing';
          startDrag(e, mei);
        } else {
          initialDistance = getDistance(e.touches);
          startZoom(e, mei);
        }
      });
      window.addEventListener('resize', this.updateRatio);
      this.scaleFn();
  }

  // Initialize viewBox from SVG attribute
  getViewBox(svg) {
    const vb = svg.getAttribute('viewBox').split(' ').map(Number);
    if (vb.length === 4) {
      [this.viewBox.x, this.viewBox.y, this.viewBox.width, this.viewBox.height] = vb;
    }  
    return this.viewBox;
  }

  // Calculate initial ratio
  updateRatio() {
    console.log('updateratio');
    if (this.svg) {
      const rect = this.svg.getBoundingClientRect();
      this.ratio = this.viewBox.width / rect.width;  
    }
  };


  /// Zooming

  zoom(factor) {
    let viewBox = this.svg.viewBox.baseVal;
    let svg = this.svg;
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

  scaleFn() {
      document.getElementById('zoom-in-' + this.mandalaNum).onclick = () => this.zoom(1.1);
      document.getElementById('zoom-out-' + this.mandalaNum).onclick = () => this.zoom(1/1.1);
  }

}
