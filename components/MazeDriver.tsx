"use client";

import useBfs from "@lib/useBfs";
import MazeBackground from "@components/MazeBackground";
import { Coord } from "@lib/bfs";
import dfsGenerateMaze from "@lib/dfs-maze-generator";

const rows = 11;
const cols = 11;
const stepDelayMs = 50;

// Randomized start value (odd row and column to ensure it is a valid cell in the maze)
const randX = Math.floor(Math.random() * rows);
const randY = Math.floor(Math.random() * cols);
const start: Coord = [
  randX % 2 == 0 ? (randX > 1 ? randX - 1 : randX + 1) : randX,
  randY % 2 == 0 ? (randY > 1 ? randY - 1 : randY + 1) : randY,
];

const grid = dfsGenerateMaze(rows, cols, start);

export default function MazeDriver() {
  // Start bfs with a given grid, start point, and delay between cell explorations
  const lastVisited = useBfs(grid, start, stepDelayMs);
  return <MazeBackground grid={grid} lastVisited={lastVisited} cellSize={41} />;
}
