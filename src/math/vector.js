"use strict";

class Vector2D {
    /**
     * Create a new vector using the specified x and y coordinates
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;

        if (this.x === undefined) {
            this.x = 0;
        }

        if (this.y === undefined) {
            this.y = 0;
        }
    }
};