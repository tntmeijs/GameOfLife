"use strict";

/**
 * Draw a line between the start and end coordinates
 * @param {Vector2D} start Line begins at this coordinate
 * @param {Vector2D} end Line ends at this coordinate
 * @param {CanvasRenderingContext2D} context Canvas 2D context
 */
function DrawLine(start, end, context) {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}
