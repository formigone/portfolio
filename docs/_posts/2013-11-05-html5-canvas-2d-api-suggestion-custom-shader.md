---
title: HTML5 Canvas 2D Custom Shader
subtitle: This is an old demo I made in 2013.
author_staff_member: 
show_comments: true
soc_img:
  src: /images/posts/html5-demo-mega-man-rain-canvas-api.png
  width: 1800
  height: 1029
---

An interactive demo showing what the Canvas 2D API could be like if WebGL specific features could be exposed to the user (so the user could use WebGL without Canvas 3D). Yes, I once thought this would be a good idea :)

# About this post

As mentioned in other posts... last night (November 4, 2020) I was showing my 7 year old daughter what Twitter is. I decided to show her some of the weird stuff I'd posted over the years. One of the posts was a link to an old demo I had posted on an old version of this blog. I clicked on the link, only to realize I'd removed all my old blog posts not related to my current pursuit of AI and Machine Learning. My daughter told me that I "should never delete stuff, because then people would never know what I had to say or show them."

That 7 year old wisdom was enough motivation for me to dig through my Github account and find the code for that and other demos, which is what you'll find below.

# The original content

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
