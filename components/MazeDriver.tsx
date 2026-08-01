"use client";

import useBfs from "@lib/useBfs";
import MazeBackground from "@components/MazeBackground";
import {Coord} from "@lib/bfs";
import dfsGenerateMaze from "@lib/dfs-maze-generator";
import {useEffect, useState, useMemo} from "react";


const cellSize = 30;

// Randomized start value (odd row and column to ensure it is a valid cell in the maze)
function getStart(rows: number, cols: number): Coord {
  const randX = Math.floor(Math.random() * rows);
  const randY = Math.floor(Math.random() * cols);
  return [
    randX % 2 == 0 ? (randX > 1 ? randX - 1 : randX + 1) : randX,
    randY % 2 == 0 ? (randY > 1 ? randY - 1 : randY + 1) : randY,
  ];
}

export default function MazeDriver() {
  // Define window size state
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 600,
    height: 400,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get number of rows and columns given window size and cell size and set min for safety
  const rows = Math.max(Math.ceil(windowSize.height / cellSize), 2);
  const cols = Math.max(Math.ceil(windowSize.width / cellSize), 2);

  const {start, grid} = useMemo(() => {
    const start = getStart(rows, cols);
    const grid = dfsGenerateMaze(rows, cols, start);
    return {start, grid};
  }, [rows, cols]);

  // Scale stepDelay with maze size for consistent timing
  const stepDelayMs = 10000 / (rows * cols);

  // Start bfs with a given grid, start point, and delay between cell explorations
  const lastVisited = useBfs(grid, start, stepDelayMs);
  return <MazeBackground grid={grid} lastVisited={lastVisited} cellSize={cellSize}/>;
}
