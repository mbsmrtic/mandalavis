import { MandalaShape } from "/static/js/shapes/mandalashape.js";

export class TreeShape extends MandalaShape {
    shapeElementTag() { return "path"; }
    shapeElementAttributes() {
        const startX = this.x;
        const startY = this.y;
        const quarterHeight = this.length / 4;
        const ahalfWidth = this.width / 2;
        const sixthWidth = this.width / 6;
        var pathD = '';
        var currentX = 0;
        var currentY = 0;
        pathD = `
            M ${startX} ${startY} L ${startX} ${startY - this.length} 
            M ${startX} ${startY - quarterHeight} L ${startX + ahalfWidth} ${startY - quarterHeight * 2}
            M ${startX} ${startY - quarterHeight} L ${startX - ahalfWidth} ${startY - quarterHeight * 2}
            M ${startX} ${startY - quarterHeight * 2} L ${startX + sixthWidth * 2} ${startY - quarterHeight * 3}
            M ${startX} ${startY - quarterHeight * 2} L ${startX - sixthWidth * 2} ${startY - quarterHeight * 3}
            M ${startX} ${startY - quarterHeight * 3} L ${startX + sixthWidth} ${startY - this.length + quarterHeight / 2}
            M ${startX} ${startY - quarterHeight * 3} L ${startX - sixthWidth} ${startY - this.length + quarterHeight / 2}
            `;
        return ({
            fill: "transparent",
            stroke: this.color,
            d: pathD
        })
//         <svg width="46" height="134" viewBox="0 0 46 134" fill="none" xmlns="http://www.w3.org/2000/svg">
// <line x1="24.2704" y1="134" x2="24.2704" stroke="white"/>
// <line x1="24.3654" y1="52.7067" x2="45.3654" y2="23.7067" stroke="white"/>
// <line x1="24.3852" y1="53.3188" x2="0.38519" y2="24.3188" stroke="white"/>
// </svg>

    }
}
