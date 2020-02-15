"use strict";

// Update interval in milliseconds
const stepTime = 100;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const playPauseButton   = document.getElementById("play-pause");
const resetButton       = document.getElementById("reset");
const saveButton        = document.getElementById("save");
const loadButton        = document.getElementById("load");

const gridSize = new Vector2D(canvas.width, canvas.height);
const cellSize = new Vector2D(8, 8);

const grid = new Grid(gridSize, cellSize, canvas, context);

const simulation = new Simulation(grid, context);

// ----------------------------------------------------------------------------
// Game loop logic
// ----------------------------------------------------------------------------

let gamePaused = true;

/**
 * Called once before the game starts to set the initial state
 */
function Initialize() {
    playPauseButton.addEventListener('click', event => {
        event.preventDefault();

        gamePaused = !gamePaused;
    });

    resetButton.addEventListener('click', event => {
        event.preventDefault();

        // Clear the simulation grid
        simulation.simulationGrid = simulation.CreateClearSimulationGrid();

        // Pause the simulation
        gamePaused = true;
    });

    saveButton.addEventListener('click', event => {
        event.preventDefault();

        simulation.SaveSimulation();
    });

    loadButton.addEventListener('click', event => {
        event.preventDefault();

        simulation.LoadSimulation();
    });
}

/**
 * Called once every N milliseconds update the game logic
 */
function Update() {
    if (gamePaused) {
        playPauseButton.innerHTML = "simulate";
        return;
    }

    playPauseButton.innerHTML = "pause";

    // Advance the simulation
    simulation.Step();
}

/**
 * Called once at the end of a frame to draw the game to the canvas
 */
function Draw() {
    // Clear the screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gamePaused) {
        // Draw a grid and highlight the selected cell
        grid.Draw();
    }

    simulation.Draw();
}

// ----------------------------------------------------------------------------
// Game loop
// ----------------------------------------------------------------------------

Initialize();

function Loop() {
    Update();
    Draw();

    setTimeout(Loop, stepTime);
}

// Start the simulation
Loop();
