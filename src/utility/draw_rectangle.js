"use strict";

/**
 * Draw a solid rectangle
 * @param {Vector2D} topLeft Top left corner of the rectangle
 * @param {Vector2D} dimensions Size of the rectangle in pixels
 * @param {CanvasRenderingContext2D} context Canvas 2D context
 */
function DrawRectangle(topLeft, dimensions, context) {
    context.beginPath();
    context.rect(topLeft.x, topLeft.y, dimensions.x, dimensions.y);
    context.fill();
    context.stroke();
}
