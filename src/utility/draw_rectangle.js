"use strict";

/**
 * Draw a solid rectangle
 * @param {Vector2D}    topLeft     Top left corner of the rectangle
 * @param {Vector2D}    dimensions  Size of the rectangle in pixels
 * @param {String}      color       Color of the rectangle
 * @param {CanvasRenderingContext2D} context Canvas 2D context
 */
function DrawRectangle(topLeft, dimensions, color, context) {
    let initialStyle = context.fillStyle;
    
    context.beginPath();
    context.rect(topLeft.x, topLeft.y, dimensions.x, dimensions.y);
    context.fillStyle = color;
    context.fill();
    context.stroke();

    // Restore fill style
    context.fillStyle = initialStyle;
}
