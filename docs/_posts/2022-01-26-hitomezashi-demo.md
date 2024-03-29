---
title: Hitomezashi Stitch Patterns in HTML Canvas
subtitle: A simple JavaScript implementation of randomly generated Hitomezashi patterns inspired by the Numberphile video.
author_staff_member: 
show_comments: true
soc_img:
  src: /images/demo/hitomezashi-demo.png
  width: 3838
  height: 2240
---

The other day I came across the concept of Hitomezashi stitch patterns from a [Numberphile video](https://www.youtube.com/watch?v=JbfhzlMk2eY){:target="_blank"} on the subject. Before the video was over, I realized I had to code that up and see for myself how the probability for a point starting on/off would influence the pattern.

The implementation below has a fixed probability of 0.5 for column starting on, and 0.75 for a row starting on.

<style>
  #demoContainer canvas {
  image-rendering: pixelated;
  cursor: pointer;
  }
</style>
<div id="demoContainer" style="overflow: hidden; box-shadow: 0 0 10px #ccc; margin: 0 0 2em; height: 60vh;"></div>
<script src="/js/demo/hitomezashi.js"></script>

#### (click on the pattern above - after the flood fill completes)

Note: flood fill has been artificially slowed down for dramatic effect.

Seems that the more that the probability diverges from 0.5, the more individual squares emerge.

Next steps for things to experiment with:

 * ✅ Add flodding and attempt to imperically convince myself that the assumption stated in the video is correct - namely, that it will always take two colors to fill the board.
 * What are all of the individual patterns that can be made?
 * How does symmetry about both axes influence the pattern?
 * What patterns emerge when every point starts off, and only every `n` point starts on (for different values of `n`).
 * Finally, for the ultimate time sink: initialize Conway's Game of Life boards with Hitomezashi pattern.

## Flooding algorithm

Since I have not yet done any research on efficient flooding algorithms (I'm not exaclty sure if this is the correct term), I'm posting my research here to simplify the upcoming writeup on how it works.

The initial objective is simple: given the above grid (or a subsection of it, as shown below), color an entire white section until it hits a wall.

![Hitomezashi patch](/images/demo/hitomezashi-patch.png)
![Hitomezashi patch partially flooded](/images/demo/hitomezashi-patch-filled-once.png)
![Hitomezashi patch completely flooded](/images/demo/hitomezashi-patch-filled-all.png)

After being able to flood a single section, the goal is to fill every other section (no two adjacent section must have the same color).

The pixel data for the patch above can be [found here](/js/demo/hitomezashi.json). That file is formatted like the [JavaScript ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData){:target="_blank"}. That is, within the payload, the attribute `$.data` represents

> ...a one-dimensional array containing the data in the RGBA order, with integer values between 0 and 255 (inclusive).

## Update

Turns out a flood fill algorithm is pretty simple. My current implementation is pretty naive: it uses a recursion (with memoization to avoid processing the same pixel multiple times). The issue is that each iteration calls up to four other recursions, so if the path to be filled is big, it'll throw a `Maximum Call Stack Size Exceeded` exception. The way I'm getting around that for now is by using `setTimeout(recursion, 0)`. This gets me through the night, but clearly not ideal.

Next iteration: use the backtracking algorithm so there won't be any recursion involved.
