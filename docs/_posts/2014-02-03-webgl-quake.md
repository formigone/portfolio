---
layout: post
title: Webgl Quake
author: Rodrigo Silveira
---

In case you have been offline for the past two years or so, there has been a few improvements and advances on what can be done on a browser, namely doing awesome stuff without a plugin. By that I mean that Flash has been replaced by HTML5. As a demonstration of the new HTML5 technologies and capabilities, a few cool people from Google used Google Web Toolkit to write a WebGL Quake port. Here is a summary of how this has come about:

## Webgl Quake
-----

In case you have been offline for the past two years or so, there has been a few improvements and advances on what can be done on a browser, namely doing awesome stuff without a plugin. By that I mean that Flash has been replaced by HTML5. As a demonstration of the new HTML5 technologies and capabilities, a few cool people from Google used Google Web Toolkit to write a WebGL Quake port. Here is a summary of how this has come about:
<h2>GWT Port of Quake: Official Preview</h2>
<iframe src="http://www.youtube.com/embed/XhMN0wlITLk" frameborder="0" width="540" height="285"></iframe>

&nbsp;
<h2>Official GWT Blog Post</h2>
<img class="alignleft size-full wp-image-399" title="webgl-quake-3-official-preview" src="http://rodrigo-silveira.com/wp-content/uploads/2012/04/webgl-quake-3-official-preview.jpg" alt="" width="542" height="329" />

<!--more-->You can <a href="http://googlewebtoolkit.blogspot.com/2010/04/look-ma-no-plugin.html">read the official post</a> describing this awesome feat. The way they describe what they did was as follows: "We started with the existing Jake2 Java port of the Quake II engine, then used the Google Web Toolkit(along with WebGL, WebSockets, and a lot of refactoring) to cross-compile it into Javascript." You can also checkout a copy of the <a href="http://code.google.com/p/quake2-gwt-port/">GWT project from Google Code</a> and play the game on your own machine, or you can <a href="http://playwebgl.com/games/quake-2-webgl/">play WebGL Quake online</a>.
<h2>WebGL Quake 3 Demo</h2>
<a href="http://www.rodrigo-silveira.com/webgl-quake/webgl-quake-3-demo/" rel="attachment wp-att-398"><img class="alignleft size-full wp-image-398" title="webgl-quake-3-demo" src="http://rodrigo-silveira.com/wp-content/uploads/2012/04/webgl-quake-3-demo.jpg" alt="" width="542" height="349" /></a>

<!--more-->If all else fails, and you have a hard time both playing the game online or getting the repository source code to run on your own computer, I guess you could at least play around with this <a href="http://media.tojicode.com/q3bsp/?tesselate=2">Quake 3 demo</a> written in Javascript and some of the other HTML5 APIs, such as HTML5 audio, web workers, etc. This demo is actually just a map from the game, with clunky controls, and a few options, such as full-screen, background music, etc.