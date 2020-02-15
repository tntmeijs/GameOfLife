"use strict";

/**
 * Draw a line between the start and end coordinates
 * @param {Vector2D}    start   Line begins at this coordinate
 * @param {Vector2D}    end     Line ends at this coordinate
 * @param {String}      color   Color of the line
 * @param {CanvasRenderingContext2D} context Canvas 2D context
 */
function DrawLine(start, end, color, context) {
    let initialStyle = context.strokeStyle;

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = color;
    context.stroke();

    // Restore fill style
    context.strokeStyle = initialStyle;
}
