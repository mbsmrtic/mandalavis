
////////////////////////////////////////////////////////////////////////
// Dragging 
////////////////////////////////////////////////////////////////////////
let svg = null;
let mandalaNum;
let isDragging = false;
let viewBox = { x: 0, y: 0, width: 0, height: 0 };
let ratio = 1;
let canvas = {};
let mainElementId;

export function initInteractions(mandalaNumber) {
    mandalaNum = mandalaNumber;
    let svgId = 'mandala' + mandalaNumber;
    svg = document.getElementById(svgId); //querySelector(mandalaId);
    mainElementId = svgId + '-main';
    getViewBox(svg);
    updateRatio();
    // Event listeners
    svg.addEventListener('mousedown', startDrag);
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
  const matrix = document.getElementById(mainElementId).getAttribute('transform');
  return matrix.replace(/^matrix\(/, '').replace(/\)$/, '').split(' ').map(parseFloat);
}

function startDrag(e) {
  isDragging = true;
  const currentTransform = getTransform();
  const sctm = document.getElementById(mainElementId).getScreenCTM();
  const mouseStart = transformFromViewportToElement(e.clientX, e.clientY, sctm, currentTransform);

  canvas = {
    mouseStart,
    transform: currentTransform,
    sctm
  }
  svg.style.cursor = 'grabbing';

  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', endDrag);
}

function transformFromViewportToElement(x, y, sctm=null, elementTransform=null) {
  const p = new DOMPoint(x, y);

  let screenTransform;
  if (sctm === null) {
    screenTransform = document.getElementById(mainElementId).getScreenCTM();
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

function drag(e) {
  if (!isDragging) return;

  const client = transformFromViewportToElement(e.clientX, e.clientY, canvas.sctm, canvas.transform);
  const movement = {
    x: canvas.mouseStart.x - client.x,
    y: canvas.mouseStart.y - client.y
  };
  const startMatrix = [...canvas.transform];
  startMatrix[4] = startMatrix[4] - movement.x;
  startMatrix[5] = startMatrix[5] - movement.y;

  document.getElementById(mainElementId).setAttribute(
    'transform', `matrix(${startMatrix.join(', ')})`);
}

function endDrag() {
  isDragging = false;
  svg.style.cursor = 'grab';
  canvas = {};

  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', endDrag);
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

