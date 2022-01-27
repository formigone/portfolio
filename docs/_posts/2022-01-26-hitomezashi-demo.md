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

<div id="demoContainer" style="overflow: hidden; box-shadow: 0 0 10px #ccc; margin: 0 0 2em; height: 60vh;"></div>
<script src="/js/demo/hitomezashi.js"></script>

<h4>(click on the pattern above)</h4>

Seems that the more that the probability diverges from 0.5, the more individual squares emerge.

Next steps for things to experiment with:

 * Add flodding and attempt to imperically convince myself that the assumption stated in the video is correct - namely, that it will always take two colors to fill the board.
 * What are all of the individual patterns that can be made?
 * How does symmetry about both axes influence the pattern?
 * What patterns emerge when every point starts off, and only every `n` point starts on (for different values of `n`).
 * Finally, for the ultimate time sync: initialize Conway's Game of Life boards with Hitomezashi pattern.
