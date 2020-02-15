"use strict";

class Simulation {
    constructor(grid, context) {
        this.context = context;
        this.savedSimulationGrid = null;

        if (grid === undefined) {
            console.error("[ERROR] Simulation grid not set.");
        }

        if (this.context === undefined) {
            console.error("[ERROR] Simulation context not set.");
        }

        // Cells are either dead or alive
        this.cellState = {
            dead: 0,
            alive: 1
        };

        // Grid information
        this.rowCount    = Math.floor(grid.gridSize.y / grid.cellSize.y);
        this.columnCount = Math.floor(grid.gridSize.x / grid.cellSize.x);
        this.cellSize    = grid.cellSize;

        // Create a 2D array that will hold the simulation
        this.simulationGrid = this.CreateClearSimulationGrid();

        // Allow the user to toggle cells between dead and alive
        grid.onCellClicked = (row, column) => {
            let cell = this.simulationGrid[row][column];
            
            if (cell === this.cellState.dead) {
                cell = this.cellState.alive;
            } else if (cell === this.cellState.alive) {
                cell = this.cellState.dead;
            }

            this.simulationGrid[row][column] = cell;
        };
    }

    /**
     * Save the simulation grid
     * This allows users to reset their grid to the inital state
     */
    SaveSimulation() {
        this.savedSimulationGrid = this.simulationGrid;
    }

    /**
     * Revert the simulation grid to the saved grid
     */
    LoadSimulation() {
        if (this.savedSimulationGrid !== null) {
            this.simulationGrid = this.savedSimulationGrid;
        }
    }

    /**
     * Set all cells to the dead state
     * @returns Two-dimensional array that represents a new simulation grid
     */
    CreateClearSimulationGrid() {
        let grid = [];

        for (let row = 0; row < this.rowCount; ++row) {
            let rowArray = [];

            for (let column = 0; column < this.columnCount; ++column) {
                // Cells are dead by default
                rowArray.push(this.cellState.dead);
            }

            // Save the row
            grid.push(rowArray);
        }

        return grid;
    }

    /**
     * Advance the simulation by a single generation
     */
    Step() {
        // Do not modify the simulation grid directly, because the grid
        // iteration order will start somewhere. We need to simulate the
        // generation as if they all update at the same time. This is why
        // we need an "intact" copy of the original data to compare against.        
        let previousGeneration = this.CreateClearSimulationGrid();

        for (let row = 0; row < this.rowCount; ++row) {
            for (let column = 0; column < this.columnCount; ++column) {
                let aliveNeighbourCount = 0;

                // Loop through all eight neighbours
                for (let deltaY = -1; deltaY <= 1; ++deltaY) {
                    for (let deltaX = -1; deltaX <= 1; ++deltaX) {
                        // Ignore self
                        if (!(deltaX === 0 && deltaY === 0)) {
                            // Check whether the neighbouring cell is alive
                            if ((this.simulationGrid[row + deltaY] !== undefined) &&
                                (this.simulationGrid[row + deltaY][column + deltaX] !== undefined) &&
                                (this.simulationGrid[row + deltaY][column + deltaX] === this.cellState.alive)) {
                                    ++aliveNeighbourCount;
                            }
                        }
                    }
                }

                // Conway's Game of Life rules
                let thisCell = this.simulationGrid[row][column];
                switch (aliveNeighbourCount) {
                    case 0:
                    case 1:
                        thisCell = this.cellState.dead;
                        break;
                    case 2:
                        break;
                    case 3:
                        thisCell = this.cellState.alive;
                        break;
                    default:
                        thisCell = this.cellState.dead;
                        break;
                }

                previousGeneration[row][column] = thisCell;
            }
        }

        this.simulationGrid = previousGeneration;
    }

    /**
     * Draw all cells that are currently alive
     */
    Draw() {
        for (let row = 0; row < this.rowCount; ++row) {
            for (let column = 0; column < this.columnCount; ++column) {
                let cell = this.simulationGrid[row][column];

                if (cell === this.cellState.alive) {
                    let coordinate = new Vector2D();
                    coordinate.x = column * this.cellSize.x;
                    coordinate.y = row * this.cellSize.y;

                    DrawRectangle(coordinate, this.cellSize, "#ffffff", this.context);
                }
            }
        }
    }
};
