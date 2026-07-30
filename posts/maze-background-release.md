---
title: "Maze Background Release"
date: "2026-07-28"
---

I just finalized a maze generation and exploration algorithm that exists in the background to add some flair to the 
website. It works roughly as follows:

1. Get the viewer's screen size and choose the appropriate number of rows and columns
2. Carve out paths in the maze with depth-first search
3. Explore the maze with a breadth-first search

The maze responds dynamically to any screen resizing and will regenerate and fill back in if the screen size changes. 
The exploration speed is also defined by the screen size, such that it will fill in at roughly the same rate 
regardless of device.

