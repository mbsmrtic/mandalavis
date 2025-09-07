// CSS reminder (must be active for iOS pinch to work without page zoom):
// svg[id^="mandala"] { touch-action: none; cursor: grab; }

export class MandalaInteractions {
  constructor(mandalaNum, {minZoom=0.4, maxZoom=40} = {}) {
    this.mandalaNum = mandalaNum;
    this.svg = document.getElementById(`mandala${mandalaNum}svg`);
    this.g   = document.getElementById(`mandala${mandalaNum}`); // the <g> you pan
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;

    // ViewBox model
    this.viewBox = this._readViewBox(this.svg);
    this._writeViewBox();

    // Pan matrix for <g>
    this.pan = new DOMMatrix(); // translate only
    this._applyPan();

    // State
    this.panPtrId = null;           // pointerId used for panning
    this.dragStartElm = null;       // element-space start point
    this.panAtStart = this.pan;     // matrix snapshot (cloned per drag)
    this.abort = new AbortController();
    this.raf = null;

    // Multi-pointer (pinch) state
    this.activePtrs = new Map();    // pointerId -> {x,y} in SVG coords
    this.pinch = null;              // { startDist, startVB }

    // Bind
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp   = this._onPointerUp.bind(this);
    this._onWheel       = this._onWheel.bind(this);
    this._onResize      = this._onResize.bind(this);

    // Listeners
    const {signal} = this.abort;
    this.svg.addEventListener('pointerdown', this._onPointerDown, {signal});
    this.svg.addEventListener('wheel', this._onWheel, {passive:false, signal});
    window.addEventListener('resize', this._onResize, {signal});

    // Buttons
    const zIn  = document.getElementById(`zoom-in-${this.mandalaNum}`);
    const zOut = document.getElementById(`zoom-out-${this.mandalaNum}`);
    zIn && (zIn.onclick  = () => this.zoomAt(1.1));
    zOut && (zOut.onclick = () => this.zoomAt(1/1.1));
  }

  destroy() { this.abort.abort(); cancelAnimationFrame(this.raf); }

  // ---- ViewBox helpers ----
  _readViewBox(svg) {
    const vb = (svg.getAttribute('viewBox') || '').split(/[ ,]+/).map(Number);
    return vb.length === 4 ? {x:vb[0], y:vb[1], width:vb[2], height:vb[3]} :
                             {x:0, y:0, width:svg.clientWidth||600, height:svg.clientHeight||600};
  }
  _writeViewBox() {
    const {x,y,width,height} = this.viewBox;
    this.svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }
  _applyPan() { this.g && this.g.setAttribute('transform', this._matrixToAttr(this.pan)); }
  _matrixToAttr(m) { return `matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`; }

  // ---- Coordinates ----
  _screenToSvg(x, y) {
    const pt = new DOMPoint(x, y);
    const ctm = this.svg.getScreenCTM();
    if (!ctm) return {x, y};
    const p = pt.matrixTransform(ctm.inverse());
    return {x: p.x, y: p.y};
  }
  _screenToElementWithMatrix(x, y, matrix) {
    const svgPt = this._screenToSvg(x, y);
    const p = new DOMPoint(svgPt.x, svgPt.y).matrixTransform(matrix.inverse());
    return { x: p.x, y: p.y };
  }

  // ---- Geometry helpers ----
  _midpoint(p1, p2) { return { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 }; }
  _distance(p1, p2) { const dx=p1.x-p2.x, dy=p1.y-p2.y; return Math.hypot(dx,dy); }

  _applyZoomFromBase(factor, focus, baseVB) {
    // clamp against min/max
    const baseScale = 1 / (baseVB.width / this.svg.clientWidth);
    const nextScale = baseScale * factor;
    const clampedScale = Math.min(this.maxZoom, Math.max(this.minZoom, nextScale));
    const appliedFactor = clampedScale / baseScale;

    const newW = baseVB.width / appliedFactor;
    const newH = baseVB.height / appliedFactor;
    const fx = (focus.x - baseVB.x) / baseVB.width;
    const fy = (focus.y - baseVB.y) / baseVB.height;
    this.viewBox = {
      x: focus.x - newW * fx,
      y: focus.y - newH * fy,
      width: newW,
      height: newH
    };
    this._writeViewBox();
  }

  // ---- Pointer handlers ----
  _onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    this.svg.setPointerCapture(e.pointerId);
    this.svg.style.cursor = 'grabbing';

    // record/update this pointer in SVG coords
    const ptSvg = this._screenToSvg(e.clientX, e.clientY);
    this.activePtrs.set(e.pointerId, ptSvg);

    if (this.activePtrs.size === 1) {
      // start pan
      this.panPtrId = e.pointerId;
      this.panAtStart = this.pan.translate(0, 0); // clone
      this.dragStartElm = this._screenToElementWithMatrix(e.clientX, e.clientY, this.panAtStart);
      this._dragActive = true;
    } else if (this.activePtrs.size === 2) {
      // start pinch (freeze a base viewBox)
      const [p1, p2] = [...this.activePtrs.values()];
      this.pinch = {
        startDist: this._distance(p1, p2),
        startVB: { ...this.viewBox }
      };
      this._dragActive = false; // disable single-finger pan while pinching
    }

    // per-gesture listeners (single instance)
    this._pointerMoveHandler = this._pointerMoveHandler || ((evt) => this._onPointerMove(evt));
    this._pointerUpHandler   = this._pointerUpHandler   || ((evt) => this._onPointerUp(evt));
    this.svg.addEventListener('pointermove', this._pointerMoveHandler, {passive:false});
    this.svg.addEventListener('pointerup',   this._pointerUpHandler);
    this.svg.addEventListener('pointercancel', this._pointerUpHandler);
  }

  _onPointerMove(e) {
    // ignore stray mouse moves
    if (e.pointerType === 'mouse' && e.buttons === 0) return;

    // update this pointer's SVG position
    const ptSvg = this._screenToSvg(e.clientX, e.clientY);
    this.activePtrs.set(e.pointerId, ptSvg);
    e.preventDefault(); // prevent page scroll on touch

    // Pinch path
    if (this.pinch && this.activePtrs.size >= 2) {
      const [p1, p2] = [...this.activePtrs.values()];
      const dist = this._distance(p1, p2);
      if (dist > 0 && this.pinch.startDist > 0) {
        const rawFactor = dist / this.pinch.startDist;
        const focus = this._midpoint(p1, p2); // zoom toward current midpoint
        this._applyZoomFromBase(rawFactor, focus, this.pinch.startVB);
      }
      return;
    }

    // Single-finger pan path
    if (!this._dragActive || e.pointerId !== this.panPtrId) return;

    const nowElm = this._screenToElementWithMatrix(e.clientX, e.clientY, this.panAtStart);
    const dx = nowElm.x - this.dragStartElm.x;
    const dy = nowElm.y - this.dragStartElm.y;

    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.raf = null;
        this.pan = this.panAtStart.translate(dx, dy);
        this._applyPan();
      });
    }
  }

  _onPointerUp(e) {
    this.activePtrs.delete(e.pointerId);

    // If pinch drops to one finger, end pinch and (optionally) transition to pan
    if (this.activePtrs.size < 2) {
      this.pinch = null;

      if (this.activePtrs.size === 1) {
        // Seamless transition: start a new pan with the remaining finger
        const [remainingId, svgPt] = this.activePtrs.entries().next().value;
        this.panPtrId = remainingId;
        this.panAtStart = this.pan.translate(0, 0);
        const elmPt = new DOMPoint(svgPt.x, svgPt.y).matrixTransform(this.panAtStart.inverse());
        this.dragStartElm = { x: elmPt.x, y: elmPt.y };
        this._dragActive = true;
        return; // keep listeners for continued pan
      }
    }

    function pointEquals(p1, p2, epsilon = 1e-6) {
      return (
        Math.abs(p1.x - p2.x) <= epsilon &&
        Math.abs(p1.y - p2.y) <= epsilon
      );
    }

    // If no pointers remain, end gesture entirely
    if (this.activePtrs.size === 0) {
      this._dragActive = false;
      this.panPtrId = null;
      this.svg.style.cursor = 'grab';
      this.svg.removeEventListener('pointermove', this._pointerMoveHandler);
      this.svg.removeEventListener('pointerup',   this._pointerUpHandler);
      this.svg.removeEventListener('pointercancel', this._pointerUpHandler);

      if (this.svg.hasPointerCapture(e.pointerId)) {
        this.svg.releasePointerCapture(e.pointerId);
        let elmPt = this._screenToElementWithMatrix(e.clientX, e.clientY, this.panAtStart);
        // If the pointer did not move between pointer down and pointer up, consider it a click
        if (pointEquals(elmPt, this.dragStartElm)) {
          this._onClick(e);
        }
      }
    }
  }

  _onClick(e) {
    const elsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
    const shapeElsAtPoint = elsAtPoint.filter(el => el.classList.contains('shape'));
    if (shapeElsAtPoint.length > 0) {
      const elAtPoint = shapeElsAtPoint[0];
      //get cluster and cluster dropdown
      const clusterid = elAtPoint.getAttribute('clusterid');
      //select the cluster in the control panel
      const clusterDropdown = document.getElementById("clusterdropdown");
      for (const option of clusterDropdown.options) {
        if (option.clusterid == clusterid) {
          option.selected = true;
          clusterDropdown.dispatchEvent(new Event('change'));            
        }
      }
    }
  }

  // ---- Zooming (buttons / wheel) ----
  zoomAt(factor, clientX = null, clientY = null) {
    // clamp
    const currentScale = 1 / (this.viewBox.width / this.svg.clientWidth);
    const nextScale = currentScale * factor;
    const clamped = Math.min(this.maxZoom, Math.max(this.minZoom, nextScale));
    const appliedFactor = clamped / currentScale;
    if (appliedFactor === 1) return;

    // focus (cursor) or center
    const focus = clientX != null ? this._screenToSvg(clientX, clientY)
                                  : { x: this.viewBox.x + this.viewBox.width/2,
                                      y: this.viewBox.y + this.viewBox.height/2 };

    const newW = this.viewBox.width / appliedFactor;
    const newH = this.viewBox.height / appliedFactor;
    const fx = (focus.x - this.viewBox.x) / this.viewBox.width;
    const fy = (focus.y - this.viewBox.y) / this.viewBox.height;

    this.viewBox = {
      x: focus.x - newW * fx,
      y: focus.y - newH * fy,
      width: newW,
      height: newH
    };
    this._writeViewBox();
  }

  _onWheel(e) {
    // trackpad pinch on desktop
    const zoomStep = 1 + (Math.abs(e.deltaY) / 1000);
    const factor = e.deltaY < 0 ? zoomStep : 1/zoomStep;
    this.zoomAt(factor, e.clientX, e.clientY);
    e.preventDefault();
  }

  _onResize() {
    // if we need ratio, recompute here
    // this.ratio = this.viewBox.width / this.svg.getBoundingClientRect().width;
  }

  // Public helpers for page code
  getViewBox()  { const {x,y,width,height} = this.viewBox; return {x,y,width,height}; }
  setViewBox(v) {
    if (!v) return;
    const ok = ['x','y','width','height'].every(k => Number.isFinite(v[k]));
    if (ok) { this.viewBox = {...v}; this._writeViewBox(); } else { console.error('Invalid viewBox object:', v); }
  }
  setViewBoxFromString(s) {
    if (!s) return;
    const arr = String(s).trim().split(/[ ,]+/).map(Number);
    if (arr.length === 4 && arr.every(Number.isFinite)) this.setViewBox({x:arr[0], y:arr[1], width:arr[2], height:arr[3]});
    else console.error('Invalid viewBox string:', s);
  }
}
