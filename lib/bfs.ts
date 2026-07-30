export type Coord = [number, number];

// Set entries are compared based on memory address, so represent coordinates as strings
function key(x: number, y: number): string {
  return `${x},${y}`;
}

// Possible directions to explore in 2D grid
export const DIRECTIONS: Coord[] = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

// Use generator function to save execution after exploration of a single cell
export function* bfs(grid: number[][], start: Coord): Generator<Coord> {
  const rows = grid.length;
  const cols = grid[0].length;

  // Initialize visited set and queue for bfs, use head tracker to get elements in O(1) time
  const visited = new Set<string>([key(...start)]);
  const queue: Coord[] = [start];
  let head = 0;

  yield start;

  while (head < queue.length) {
    // Get current coordinates
    const [x, y] = queue[head++];

    // Check each possible direction
    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx;
      const ny = y + dy;

      // Ensure coordinates are valid, that there isn't a wall, and the cell hasn't already been visited
      if (
        nx >= 0 &&
        nx < rows &&
        ny >= 0 &&
        ny < cols &&
        grid[nx][ny] !== 1 &&
        !visited.has(key(nx, ny))
      ) {
        // Add cell to visited, add it to the queue so its neighbors can be explored, and yield cell to caller
        visited.add(key(nx, ny));
        queue.push([nx, ny]);
        yield [nx, ny];
      }
    }
  }
}
