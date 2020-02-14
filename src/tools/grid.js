"use strict";

class Grid {
    /**
     * Configure the grid's properties for drawing
     * @param {Vector2D} gridSize Size of the grid in pixels
     * @param {Vector2D} cellSize Size of a single grid cell in pixels
     * @param {Canvas} canvas Canvas used to render this grid
     * @param {CanvasRenderingContext2D} context Canvas 2D context
     */
    constructor(gridSize, cellSize, canvas, context) {
        this.gridSize = gridSize;
        this.cellSize = cellSize;
        this.context = context;
        this.mousePosition = new Vector2D();

        if (this.gridSize === undefined) {
            this.gridSize = new Vector2D();
        }

        if (this.cellSize === undefined) {
            this.cellSize = new Vector2D();
        }

        if (canvas === undefined) {
            console.error("[ERROR] Canvas not set.");
        }

        if (this.context === undefined) {
            console.error("[ERROR] Grid context not set.");
        }

        // Register to the mouse move callback on the canvas element
        // This is used to determine where in the grid the user is pointing
        canvas.addEventListener('mousemove', event => {
            // Snap the mouse position to the grid
            this.mousePosition.x = event.offsetX - (event.offsetX % this.cellSize.x);
            this.mousePosition.y = event.offsetY - (event.offsetY % this.cellSize.y);
        });
    }

    /**
     * Draw a grid to the canvas
     */
    Draw() {
        // Draw horizontal lines
        for (let y = this.cellSize.y; y < this.gridSize.y; y += this.cellSize.y) {
            let start = new Vector2D(0, y);
            let end = new Vector2D(this.gridSize.x, y);

            DrawLine(start, end, this.context);
        }

        // Draw vertical lines
        for (let x = this.cellSize.x; x < this.gridSize.x; x += this.cellSize.x) {
            let start = new Vector2D(x, 0);
            let end = new Vector2D(x, this.gridSize.y);

            DrawLine(start, end, this.context);
        }
    }

    /**
     * Draw the grid cell that lies beneath the mouse cursor
     */
    HighlightCursor() {
        DrawRectangle(this.mousePosition, this.cellSize, this.context);
    }
};
