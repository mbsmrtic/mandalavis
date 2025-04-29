
////////////////////////////////////////////////////////////////////////
// Dragging 
////////////////////////////////////////////////////////////////////////
let svg = null;
let mandalaNum;
let isDragging = false;
let viewBox = { x: 0, y: 0, width: 0, height: 0 };
let ratio = 1;
let canvas = {};
let mandalaElementId;

export function initInteractions(mandalaNumber) {
    mandalaNum = mandalaNumber;
    let svgId = 'mandala' + mandalaNumber + 'svg';
    svg = document.getElementById(svgId); //querySelector(mandalaId);
    mandalaElementId = 'mandala' + mandalaNum;  // svgId + '-main';
    getViewBox(svg);
    updateRatio();
    // Event listeners
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('touchstart', startDrag);
    window.addEventListener('resize', updateRatio);
    scaleFn();
}

// Initialize viewBox from SVG attribute
function getViewBox(svg) {
  const vb = svg.getAttribute('viewBox').split(' ').map(Number);
  if (vb.length === 4) {
    [viewBox.x, viewBox.y, viewBox.width, viewBox.height] = vb;
  }  
}

// Calculate initial ratio
function updateRatio() {
  console.log('updateratio');
  const rect = svg.getBoundingClientRect();
  ratio = viewBox.width / rect.width;
}

function getTransform() {
  const matrix = document.getElementById(mandalaElementId).getAttribute('transform');
  return matrix.replace(/^matrix\(/, '').replace(/\)$/, '').split(' ').map(parseFloat);
}

function startDrag(e) {
  isDragging = true;
  const currentTransform = getTransform();
  const sctm = document.getElementById(mandalaElementId).getScreenCTM();
  var clientPoint = getPoint(e);
  const mouseStart = transformFromViewportToElement(clientPoint.x, clientPoint.y, sctm, currentTransform);

  canvas = {
    mouseStart,
    transform: currentTransform,
    sctm
  }
  svg.style.cursor = 'grabbing';

  window.addEventListener('mousemove', drag);
  window.addEventListener('touchmove', drag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
}

function transformFromViewportToElement(x, y, sctm=null, elementTransform=null) {
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

function drag(e) {
  if (!isDragging) return;

  var clientPoint = getPoint(e);
  const client = transformFromViewportToElement(clientPoint.x, clientPoint.y, canvas.sctm, canvas.transform);
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

function endDrag() {
  isDragging = false;
  svg.style.cursor = 'grab';
  canvas = {};

  window.removeEventListener('mousemove', drag);
  window.removeEventListener('touchmove', drag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
}

/// Zooming
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
    document.getElementById('zoom-in-' + mandalaNum).onclick = () => zoom(1.1);
    document.getElementById('zoom-out-' + mandalaNum).onclick = () => zoom(1/1.1);
}

