---
title: HTML5 Canvas 2D API Suggestion: Custom Shader (old demo)
subtitle: This is an old demo I made in 2013.
author_staff_member: 
show_comments: true
soc_img:
  src: /images/posts/html5-demo-mega-man-rain-canvas-api.png
  width: 1800
  height: 1029
---

Once upon a time, I was misguided enough that I wanted to write a game in JavaScript from scratch. Why bother learning a full-featured, stable game engine/framework, if I could just build everything myself?! As part of this journey (which "only" lasted about 6 months), I thought it'd be nice the HTML5 Canvas 2D API exposed a way to allow a client to control the rendering of the canvas via the very specific implementation of WebGL Shaders. This was all because I didn't want to use WebGL because Canvas 2D was so much simpler.

In order to submit an official request to the Google Chrome developers to add this feature in Chrome, I created the following demo. The engineer from the Chrome team that looked at my request was super kind. He gave me his feedback on what I was trying to achieve. He presented some ideas that made my proposal more viable, and even showed me how to file that request with the committee that actually handles official HTML5 APIs.

Long story short, I moved on from my game development hobby, and all that there is left of that adventure is this demo. 

## The Demo

To be honest, I don't remember all of the details about what I was actually proposing to the Google Chrome devs. Something about making it easier to do very low level custom rendering using the very general purpose Canvas 2D API. All I remember is that I was very excited about the visual effect of what I achieved by simulating what an extension to the Canvas API could look like. 

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
<script src="/js/demo/rain.js"></script>

<p>Copyright &copy; 2013 <a href="http://www.rodrigo-silveira.com" itemprop="url">
    <span itemprop="name">Rodrigo Silveira</span></a>. All rights reserved. Mega Man
    is an awesome game, and all its rights, trademarks, etc. are property of Capcom.</p>