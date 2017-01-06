---
layout: post
title: HTML5 Demo Web Messaging API - Multi-window Bouncy Ball
author: Rodrigo Silveira
---

Demo: HTML5 Web Messaging API. Here's a quick demonstration of what can be done with the awesome cross-document messaging API. This [very crude] demo is part of one of the games I'm building for my upcoming book - Learning HTML5 by Creating Fun Games (ISBN 978-1-84969-602-9).

## HTML5 Demo Web Messaging API - Multi-window Bouncy Ball
-----

Demo: HTML5 Web Messaging API. Here's a quick demonstration of what can be done with the awesome cross-document messaging API. This [very crude] demo is part of one of the games I'm building for my upcoming book - Learning HTML5 by Creating Fun Games (ISBN 978-1-84969-602-9).
<h2 id="watch-headline-title">HTML5 Window Messaging API Demo: Multi-window 2D Canvas Game</h2>
<iframe src="http://www.youtube.com/embed/C8Vu3Xdl3wk" height="281" width="500" allowfullscreen="" frameborder="0"></iframe>
<h2>The Code</h2>
Parent window - controls other windows by sending messages to them, and telling each one where to render the cube, or whether not to render it at all.
<div class="i_code">
<pre>&lt;!doctype html&gt;
&lt;html lang="eng"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8" /&gt;
  &lt;title&gt;HTML5 Snake V2&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;script&gt;

var frames = new Array();
frames.max = 3;
frames.width = 400;
frames.height = 200;
frames.margin = 50;

var ball = {
   max: 3,
   x: 0,
   y: 0,
   w: 50,
   h: 50,
   dx: 4.56,
   dy: 3.14,
   dirY: 1
};

var keys = {
   78: "N",
   80: "P"
};

var isPaused = true;

function play() {
   ball.x = (ball.x + ball.dx) % (frames.width * frames.length);
   ball.y += ball.dy * ball.dirY;

   if (ball.y &lt; 0 || ball.y + ball.h &gt; frames.height)
      ball.dirY *= -1;

   var shouldDraw;

   for (var i = 0, len = frames.length; i &lt; len; i++) {
      shouldDraw = ball.x + ball.w &lt;= frames.width * (i + 1) &amp;&amp; 
                   ball.x &gt;= frames.width * i ||
                   ball.x &lt;= frames.width * (i + 1) &amp;&amp; 
                   ball.x &gt;= frames.width * i;

      frames[i].postMessage({x: ball.x % frames.width, y: ball.y, w: ball.w, h: ball.h, shouldDraw: shouldDraw}, "*");
   }

   if (!isPaused)
      setTimeout(play, 15);
}

function closeAll() {
   for (var i = 0, len = frames.length; i &lt; len; i++) {
      frames[i].close();
   }
}

document.body.addEventListener("keydown", function(key){
   if (keys[key.which] == "N") {
      var left = frames.length * frames.width + frames.margin * frames.length;
      frames[frames.length] = window.open("/packt/snake-v2/message-child.html", "", "width=" + frames.width + ",height=" + frames.height + ",top=100,left=" + left);
   } else if (keys[key.which] == "P") {
      if (frames.length &lt; 1)
         return false;

      if (isPaused) {
         isPaused = false;
         play();
      } else {
         isPaused = true;
      }
   }
});

window.onunload = closeAll;
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</pre>
</div>


Child windows - controlled by the parent widow.
<div class="i_code"><pre>&lt;!doctype html>
&lt;html lang="eng">
&lt;head>
  &lt;meta charset="utf-8" />
  &lt;title>HTML5 Snake V2&lt;/title>
  &lt;style>html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }&lt;/style>
&lt;/head>

&lt;body>

&lt;script>
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 200;
document.body.appendChild(canvas);

function doOnMessage(event) {
console.log(event);
   if (event.origin == "http://localhost") {
      var data = event.data;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (data.shouldDraw) {
         ctx.fillRect(data.x, data.y, data.w, data.h);
      }
   }
}

window.addEventListener("message", doOnMessage, false);
&lt;/script>

&lt;/body>
&lt;/html>
</pre></div>