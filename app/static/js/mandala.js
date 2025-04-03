import { MandalaShape } from "./shapes/mandalashape.js";

const svgUrl = "http://www.w3.org/2000/svg";
let tooltipJustOpened = false;

document.addEventListener('click', (event) => {
    // The first time we get this event after highlighting a shape, we leave
    //   it.  After that, it means this click was not in a shape, so 
    //   we close the tooltip.
    if (tooltipJustOpened) {
        tooltipJustOpened = false;
    } else {
        const tooltip = document.querySelector('.tooltip');
        tooltip.style.display = 'none';
        clearHighlights();
    }
});

function clearHighlights() {
    let elements = document.querySelectorAll('.tempMoveToFront');
    elements.forEach(element => element.parentNode.removeChild(element));
}

export class Mandala {
    constructor(elementId, centerX=70, centerY=68) {
        this.elementId = elementId;
        this.centerX = centerX;
        this.centerY = centerY;
        this.innerR = 10;
        this.outerR = 27;
        this.defaultColor = "black";
        this.mandalaEl = document.getElementById(elementId);
    }

    makeGradient(centerColor='white', outerColor='black', name="myGradient") {
        const defs = document.createElementNS(svgUrl, "defs");  
        this.mandalaEl.appendChild(defs);  
        const gradient = document.createElementNS(svgUrl, "radialGradient");  
        gradient.setAttribute("id", name);  
        
        // Add color stops  
        const stop1 = document.createElementNS(svgUrl, "stop");  
        stop1.setAttribute("offset", "0%");  
        stop1.setAttribute("stop-color", centerColor);  
        gradient.appendChild(stop1);  
        
        const stop2 = document.createElementNS(svgUrl, "stop");  
        stop2.setAttribute("offset", "100%");  
        stop2.setAttribute("stop-color", outerColor);  
        gradient.appendChild(stop2);  
        
        defs.appendChild(gradient);  
        this.defaultColor = "url(#myGradient)";
        return this.defaultColor;
    }

    addShape(shape) {
        var elementTag = shape.shapeElementTag();
        var attributes = shape.shapeElementAttributes();
        for (var attrKey in shape.svgElementAttributes) {
            attributes[attrKey] = shape.svgElementAttributes[attrKey];
        }

        // loop through the angles adding multiple copies of the shape
        for (var angle=shape.angleStart; angle < 360; angle += shape.angleStep){
            if (angle > 0)
                attributes['transform'] = `rotate(${angle} ${this.centerX} ${this.centerY})`;
            //create the DOM element
            const newEl = document.createElementNS(svgUrl, elementTag);
            newEl.setAttribute('mandalaid', this.elementId);
            for (const key in attributes) {
                newEl.setAttribute(key, attributes[key]);
            }

            function selectShape(element) {
                // const tooltip = document.querySelector('.tooltip');
                const article = element.closest('article');
                const tooltip = article.querySelector('.tooltip');
                if (tooltip && element.textContent.length < 100) {
                    tooltip.textContent = element.textContent;
                    tooltip.style.display = 'block';   
                    // To highlight the element, we make a temporary copy 
                    //    and append it to the DOM, putting it over all existing
                    //    elements
                    let clonedNode = element.cloneNode(true);
                    clonedNode.classList.add('tempMoveToFront');
                    clonedNode.setAttribute('stroke', 'black');
                    clonedNode.setAttribute('stroke-width', 2);
                    // move the element to the front (end of the svg)
                    const mandalaId = element.getAttribute('mandalaid');
                    let svgEl = document.querySelector('#' + mandalaId);
                    svgEl.appendChild(clonedNode);
                }
            };
            // tooltip and shape highlight
            // todo - maybe move this code to the top
            //     maybe we don't need one event listener for each shape
            //     we could just capture them in one place at the top
            //     and use event.target to access the relevant element
            if (shape.toolTipText) {
                newEl.textContent = shape.toolTipText;
                newEl.addEventListener('mouseenter', (event) => {
                    selectShape(event.target);
                });
                newEl.addEventListener('mouseout', () => {
                    clearHighlights();
                });
                newEl.addEventListener('touchstart', (event) => {
                    clearHighlights();
                    selectShape(event.target);
                    tooltipJustOpened = true;
                    event.stopPropagation();
                    event.preventDefault();
            });    
                newEl.addEventListener('touchmove', (event) => {
                    console.log('touchmove');
                    const touch = event.touches[0]; // Get the first touch point
                    const x = touch.clientX;
                    const y = touch.clientY;
                    const elementUnderTouch = document.elementFromPoint(x, y);

                    // If the new element is in the same mandala, we will handle it
                    var elementMandalaId = elementUnderTouch.getAttribute('mandalaid');
                    if (elementMandalaId && elementMandalaId == event.target.getAttribute('mandalaid')) {
                        clearHighlights();
                        selectShape(elementUnderTouch);
                        tooltipJustOpened = true;    
                        event.stopPropagation();
                        event.preventDefault();
                    }
                })
            }

            // add the new element to the DOM
            this.mandalaEl.appendChild(newEl);
        }
    }

    addCenteredCircle(r, stroke="black", fill="none") {
        this.addElement("circle", {
            cx: this.centerX,
            cy: this.centerY,
            r: r,
            stroke: stroke,
            fill: fill
        })
    }

   
    addElement(tag, attributes, toolTipText = '', shapeRotation=null) {

        const newEl = document.createElementNS(svgUrl, tag);
        for (const key in attributes) {
            newEl.setAttribute(key, attributes[key]);
        }
        // return Object.assign(document.createElement(tag), attributes);
        // tooltip
        const title = document.createElementNS(svgUrl, 'title');
        title.textContent = toolTipText;
        newEl.appendChild(title);

        // add the new element to the dom
        this.mandalaEl.appendChild(newEl);
        return newEl;
    }

    addDot(x, y, r = 2, color = "black", rotation = 0) {
        this.addElement("circle", {
            cx: x,
            cy: y,
            r: r,
            fill: color,
            transform: `rotate(${rotation} ${this.centerX} ${this.centerY})`
        })
    }
    
    // a circle with multiple droplets coming out of it
    pottedPlant({rotation, length}) {

    }

}
