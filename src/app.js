"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const gridSize = new Vector2D(canvas.width, canvas.height);
const cellSize = new Vector2D(8, 8);

const grid = new Grid(gridSize, cellSize, canvas, context);

// ----------------------------------------------------------------------------
// Game loop logic
// ----------------------------------------------------------------------------

/**
 * Called once before the game starts to set the initial state
 */
function Initialize() {
}

/**
 * Called once every frame to update the game logic
 * @param {Number} deltaTime Time since the last game update
 */
function Update(deltaTime) {
}

/**
 * Called once at the end of a frame to draw the game to the canvas
 */
function Draw() {
    // Clear the screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a grid and highlight the selected cell
    grid.Draw();
    grid.HighlightCursor();
}

// ----------------------------------------------------------------------------
// Game loop
// ----------------------------------------------------------------------------

let previousTimestamp = 0;

Initialize();

function Loop(timestamp) {
    let deltaTime = timestamp - previousTimestamp;

    Update(deltaTime);
    Draw();

    previousTimestamp = timestamp;
    window.requestAnimationFrame(Loop);
}

window.requestAnimationFrame(Loop);
