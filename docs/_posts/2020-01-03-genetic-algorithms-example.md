---
title: Genetic Algorithm Example
subtitle: A slightly artsy demo of a genetic algorithm learning a non-linear function.
author_staff_member: 
show_comments: true
soc_img:
  src: /images/posts/Genetic_Algorithm_Example.jpg
  width: 1800
  height: 1029
---

In this toy demonstration of genetic algorithms, the algorithm learns some arbitrary 2D function. The "chromosome" is represented by a sequence of <code><distance, angle></code> pairs. By rendering the first point at some location, we can render the next point in the sequence by computing the <code><x, y></code> coordinates relative to that first point by using the distance and angle for the current gene.

My motivation for this demo was to apply what I've been learning about genetic algorithms (in the context of reinforcement learning and optimizing/training deep learning models), but in a slightly less contrived application as most demos I'm seeing online. Typically, folks will demonstrate how to learn a single value (such as the pixels that compose an image or a cardinal direction to navigate a maze). The following example has two variables (angle and distance) and a minor ordering dependency. That is, if the first gene is bad, the second (and all subsequent ones) will likely not perform well.

## Fitness Function

The fitness function for the entire instance is the sum of the Euclidean distance of each corresponding point to the base function.

## How it works

To render a 2D function in the canvas below and start the simulation, click the _Start_ button below to use the default sine wave or draw a pattern using your mouse/finger/stylus directly on the canvas.

In the rendering below, you'll see the base function in green, and dark red lines representing some of the instances of the population. The fainter/thicker the line, the worse is its fitness. The thinnest, darkest line represents the best instance.  

<div id="demoContainer" ></div>
<script src="/js/demo/genetic-algorithm.js"></script>
