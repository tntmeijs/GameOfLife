"use strict";

class Simulation {
    constructor(grid, simulationData, context) {
        this.simulationData = simulationData;
        this.context = context;

        if (grid === undefined) {
            console.error("[ERROR] Simulation grid not set.");
        }

        if (this.simulationData === undefined) {
            console.error("[ERROR]: Simulation data not set.");
        }

        if (this.context === undefined) {
            console.error("[ERROR] Simulation context not set.");
        }

        // Cells are either dead or alive
        this.cellState = {
            dead: 0,
            alive: 1
        };

        // Create a 2D array that will hold the simulation
        this.simulationGrid = [];

        // Grid information
        this.rowCount    = Math.floor(grid.gridSize.y / grid.cellSize.y);
        this.columnCount = Math.floor(grid.gridSize.x / grid.cellSize.x);
        this.cellSize    = grid.cellSize;

        for (let row = 0; row < this.rowCount; ++row) {
            let rowArray = [];

            for (let column = 0; column < this.columnCount; ++column) {
                // Cells are dead by default
                let state = this.cellState.dead;

                // Use the initial spawn chance to spawn live cells
                // A number between 0 and 100 is generated, this maps to the
                // spawn percentage value
                let randomNumber = Math.floor(Math.random() * Math.floor(101));

                if (randomNumber < this.simulationData.initialSpawnChance) {
                    state = this.cellState.alive;
                }

                // Save the cell
                rowArray.push(state);
            }

            // Save the row
            this.simulationGrid.push(rowArray);
        }
    }

    /**
     * Advance the simulation by a single generation
     */
    Step() {
        // Do not modify the simulation grid directly, because the grid
        // iteration order will start somewhere. We need to simulate the
        // generation as if they all update at the same time. This is why
        // we need an "intact" copy of the original data to compare against.        
        let previousGeneration = this.simulationGrid;

        for (let row = 0; row < this.rowCount; ++row) {
            for (let column = 0; column < this.columnCount; ++column) {
                // All neighbouring cells
                let topleftCellAlive        = null;
                let topCenterCellAlive      = null;
                let topRightCellAlive       = null;
                let leftCenterCellAlive     = null;
                let rightCenterCellAlive    = null;
                let bottomleftCellAlive     = null;
                let bottomCenterCellAlive   = null;
                let bottomRightCellAlive    = null;

                // Top center cell
                if (row - 1 < 0) {
                    // Outside of the grid
                    topCenterCellAlive = this.cellState.dead;
                } else {
                    topCenterCellAlive = previousGeneration[row - 1][column];
                }

                // Bottom center cell
                if (row + 1 >= this.rowCount) {
                    // Outside of the grid
                    bottomCenterCellAlive = this.cellState.dead;
                } else {
                    bottomCenterCellAlive = previousGeneration[row + 1][column];
                }

                // Left center cell
                if (column - 1 < 0) {
                    // Outside of the grid
                    leftCenterCellAlive = this.cellState.dead;
                } else {
                    leftCenterCellAlive = previousGeneration[row][column - 1];
                }

                // Right center cell
                if (column + 1 >= this.columnCount) {
                    // Outside of the grid
                    rightCenterCellAlive = this.cellState.dead;
                } else {
                    rightCenterCellAlive = previousGeneration[row][column + 1];
                }

                // // Top left cell
                if (row - 1 < 0 || column - 1 < 0) {
                    topleftCellAlive = this.cellState.dead;
                } else {
                    topleftCellAlive = previousGeneration[row - 1][column - 1];
                }

                // Top right cell
                if (row - 1 < 0 || column + 1 >= this.columnCount) {
                    topRightCellAlive = this.cellState.dead;
                } else {
                    topRightCellAlive = previousGeneration[row - 1][column + 1];
                }

                // Bottom left cell
                if (row + 1 >= this.rowCount || column - 1 < 0) {
                    bottomleftCellAlive = this.cellState.dead;
                } else {
                    bottomleftCellAlive = previousGeneration[row + 1][column - 1];
                }

                // Bottom right cell
                if (row + 1 >= this.rowCount || column + 1 >= this.columnCount) {
                    bottomRightCellAlive = this.cellState.dead;
                } else {
                    bottomRightCellAlive = previousGeneration[row + 1][column + 1];
                }

                // Determine how many neighbours are still alive
                let aliveNeighbourCount = 0;
                aliveNeighbourCount += (topleftCellAlive === this.cellState.dead)        ? 0 : 1;
                aliveNeighbourCount += (topCenterCellAlive === this.cellState.dead)      ? 0 : 1;
                aliveNeighbourCount += (topRightCellAlive === this.cellState.dead)       ? 0 : 1;
                aliveNeighbourCount += (leftCenterCellAlive === this.cellState.dead)     ? 0 : 1;
                aliveNeighbourCount += (rightCenterCellAlive === this.cellState.dead)    ? 0 : 1;
                aliveNeighbourCount += (bottomleftCellAlive === this.cellState.dead)     ? 0 : 1;
                aliveNeighbourCount += (bottomCenterCellAlive === this.cellState.dead)   ? 0 : 1;
                aliveNeighbourCount += (bottomRightCellAlive === this.cellState.dead)    ? 0 : 1;

                // Conway's Game of Life rules from:
                // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
                let currentCell = this.simulationGrid[row][column];
                if ((aliveNeighbourCount === 2 || aliveNeighbourCount === 3) && currentCell === this.cellState.alive) {
                    // Dies by overpopulation
                    this.simulationGrid[row][column] = this.cellState.alive;
                } else if (aliveNeighbourCount === 3 && currentCell === this.cellState.dead) {
                    // Becomes alive again by reproduction
                    this.simulationGrid[row][column] = this.cellState.alive;
                } else {
                    // Dead by other causes
                    this.simulationGrid[row][column] = this.cellState.dead;
                }
            }
        }
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

                    DrawRectangle(coordinate, this.cellSize, this.context);
                }
            }
        }
    }
};
