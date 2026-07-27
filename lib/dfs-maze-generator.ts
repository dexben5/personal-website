type Coord = [number, number];

const DIRECTIONS: Coord[] = [
  [-2, 0],
  [2, 0],
  [0, 2],
  [0, -2],
];

// Set entries are compared based on memory address, so represent coordinates as strings
function key(x: number, y: number): string {
  return `${x},${y}`;
}

export default function dfsGenerateMaze(
  rows: number,
  cols: number,
  start: Coord,
): number[][] {
  const gridRows = rows;
  const gridCols = cols;

  // Initialize grid with all walls
  const grid: number[][] = Array.from({ length: gridRows }, () =>
    new Array(gridCols).fill(1),
  );

  // Initialize visited and stack with start, set start cell to 0
  const visited = new Set<string>([key(...start)]);
  const stack: Coord[] = [start];
  grid[start[0]][start[1]] = 0;

  while (stack.length > 0) {
    // Get current coordinates
    const [x, y] = stack[stack.length - 1];

    // Shuffle directions and check each path for validity
    const shuffled = [...DIRECTIONS].sort(() => Math.random() - 0.5);
    let moved = false;

    for (const [dx, dy] of shuffled) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < gridRows &&
        ny >= 0 &&
        ny < gridCols &&
        !visited.has(key(nx, ny))
      ) {
        grid[nx][ny] = 0;
        grid[x + dx / 2][y + dy / 2] = 0;

        visited.add(key(nx, ny));
        stack.push([nx, ny]);
        moved = true;
        break;
      }
    }

    // If no movements (dead end), pop this off the stack
    if (!moved) {
      stack.pop();
    }
  }

  return grid;
}
