---
layout: post
title: Web Messaging API - Bouncing a ball across multiple windows
author: Rodrigo Silveira
---

Here's a quick demonstration of what can be done with the awesome cross-document messaging API. This [very crude] demo is part of one of the games I'm building for my upcoming book - Learning HTML5 by Creating Fun Games (ISBN 978-1-84969-602-9).

## HTML5 Demo Web Messaging API - Multi-window Bouncy Ball
-----

While it may be difficult to find valid reasons and use cases where this HTML5 API is useful, those scenarios are there (even in an enterprise environment). Still, don't mind the demos below being a bit contrived examples of when to use this technique.

## Multi-window 2D Canvas Game

<iframe src="http://www.youtube.com/embed/C8Vu3Xdl3wk" width="100%" allowfullscreen="" frameborder="0"></iframe>

## The Code

Parent window - controls other windows by sending messages to them, and telling each one where to render the cube, or whether not to render it at all.

    <!doctype html>
    <html lang="eng">
    <head>
      <meta charset="utf-8" />
      <title>HTML5 Snake V2</title>
    </head>
    <body>
        <script>
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
            
               if (ball.y < 0 || ball.y + ball.h > frames.height)
                  ball.dirY *= -1;
            
               var shouldDraw;
            
               for (var i = 0, len = frames.length; i < len; i++) {
                  shouldDraw = ball.x + ball.w <= frames.width * (i + 1) &amp;&amp; 
                               ball.x >= frames.width * i ||
                               ball.x <= frames.width * (i + 1) &amp;&amp; 
                               ball.x >= frames.width * i;
            
                  frames[i].postMessage({x: ball.x % frames.width, y: ball.y, w: ball.w, h: ball.h, shouldDraw: shouldDraw}, "*");
               }
            
               if (!isPaused)
                  setTimeout(play, 15);
            }
            
            function closeAll() {
               for (var i = 0, len = frames.length; i < len; i++) {
                  frames[i].close();
               }
            }
            
            document.body.addEventListener("keydown", function(key){
               if (keys[key.which] == "N") {
                  var left = frames.length * frames.width + frames.margin * frames.length;
                  frames[frames.length] = window.open("/packt/snake-v2/message-child.html", "", "width=" + frames.width + ",height=" + frames.height + ",top=100,left=" + left);
               } else if (keys[key.which] == "P") {
                  if (frames.length < 1)
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
        </script>
    </body>
    </html>

Child windows - controlled by the parent widow.
    
    <!doctype html>
    <html lang="eng">
    <head>
      <meta charset="utf-8" />
      <title>HTML5 Snake V2</title>
      <style>html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }</style>
    </head>
    <body>
        <script>
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
        </script>
    </body>
    </html>
