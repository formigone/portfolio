---
title: Maze Traversal with Breadth-first Search & Depth-first Search - Old Demo
subtitle: This is an old demo I made in 2015.
author_staff_member: 
show_comments: true
soc_img:
  src: /images/posts/Maze_Traversal_with_Breadth-first_Search___Depth-first_Search.png
  width: 1800
  height: 1029
---

Yesterday I was showing my 7 year old daughter what Twitter is. I decided to show her some of the weird stuff I'd posted over the years. One of the posts was a link to an old demo I had posted on an old version of this blog. I clicked on the link, only to realize I'd removed all my old blog posts not related to my current pursuit of AI and Machine Learning. My daughter told me that I "should never delete stuff, because then people would never know what I had to say or show them."

That 7 year old wisdom was enough motivation for me to dig through my Github account and find the code for that demo, which is what you'll find below.

## The Demo

If I remember correctly, this demo came about during my YouTube tutorial making days. Something made me want to make a video tutorial explaining ways to traverse a map, so I wrote this demo as an illustration. I'll forego the explanation of breadth-first search and depth-first search in this post. I will also not take the time to explain my code.

<style>
#demo {
    width: 100%;
    padding-top: 75%;
    position: relative;
}

#demo canvas {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

#ctrls {
    margin: 20px 0;
    width: 100%;
}

#ctrls button {
    margin: 0 20px 0 0;
    padding: 20px;
}
</style>

<div id="demo"></div>
<div id="ctrls"></div>
<script src="/js/demo/maze.js"></script>

<p>Copyright &copy; 2015 <a href="http://www.rodrigo-silveira.com" itemprop="url">
    <span itemprop="name">Rodrigo Silveira</span></a>. All rights reserved.</p>
