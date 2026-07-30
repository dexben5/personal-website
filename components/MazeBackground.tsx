"use client";

import {useEffect, useRef} from "react";
import {Coord} from "@lib/bfs";

type Props = {
  grid: number[][];
  lastVisited: Coord;
  cellSize?: number;
};

export default function MazeBackground({
  grid,
  lastVisited,
  cellSize = 30,
}: Props) {
  // Initialize canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initial maze, just walls and unexplored cells
  useEffect(() => {
    // Set context to 2d and ensure it is defined
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Iterate over each grid cell, fill in walls as black, and unexplored as white
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        if (grid[x][y] === 1) ctx.fillStyle = "black";
        else ctx.fillStyle = "white";

        ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
      }
    }
  }, [grid, cellSize]);

  useEffect(() => {
    // Set context to 2d and ensure it is defined
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Check that lastVisited is defined and grab coordinates
    if (!lastVisited) return;
    const [x, y] = lastVisited;

    // Fill in updated cell light blue
    ctx.fillStyle = "#60a5fa";
    ctx.fillRect(y * cellSize, x * cellSize, cellSize, cellSize);
  }, [lastVisited, cellSize]);

  // Return html canvas element
  return (
    <canvas
      ref={canvasRef}
      width={grid[0].length * cellSize}
      height={grid.length * cellSize}
      className="fixed top-0 left-0 -z-10 opacity-10 pointer-events-none"
    />
  );
}
