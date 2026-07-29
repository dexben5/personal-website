"use client";

import {useEffect, useRef, useState} from "react";
import {bfs, Coord} from "@lib/bfs";

export default function useBfs(
  grid: number[][],
  start: Coord,
  stepDelayMs: number,
): Coord {
  // Initialize last visited with start and generator with null
  const [lastVisited, setLastVisited] = useState<Coord>(start);
  const generatorRef = useRef<Generator<Coord>>(null);

  useEffect(() => {
    // Get initial state of bfs
    generatorRef.current = bfs(grid, start);

    // Explore grid at desired ms delay
    const interval = setInterval(() => {
      // Get next if current is defined
      const next = generatorRef.current?.next();

      // Exit when grid has been fully explored
      if (!next || next.done) {
        clearInterval(interval);
        return;
      }

      // Get new cell
      const [x, y] = next.value;

      // Set lastVisited to new cell
      setLastVisited([x, y]);
    }, stepDelayMs);

    // Clean up interval
    return () => clearInterval(interval);
  }, [grid, start, stepDelayMs]);

  return lastVisited;
}
