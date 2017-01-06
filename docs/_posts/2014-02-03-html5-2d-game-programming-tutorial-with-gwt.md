---
layout: post
title: HTML5 2D Game Programming Tutorial with GWT
author: Rodrigo Silveira
---

Lately I’ve been playing around with GWT (<a href="https://developers.google.com/web-toolkit/">Google Web Toolkit</a>) and HTML5 game development. My first goal at this point is to get a 2D tile-based game working, and my first sub-goal for that is to be able to load a map on a 2D canvas context. So far, this is what I have:

## HTML5 2D Game Programming Tutorial with GWT
-----

Lately I’ve been playing around with GWT (<a href="https://developers.google.com/web-toolkit/">Google Web Toolkit</a>) and HTML5 game development. My first goal at this point is to get a 2D tile-based game working, and my first sub-goal for that is to be able to load a map on a 2D canvas context. So far, this is what I have:

<img class="size-full wp-image-445 aligncenter" title="html5-super-mario-brother-map" src="http://rodrigo-silveira.com/wp-content/uploads/2012/06/html5-super-mario-brother-map.png" alt="" width="550" height="312" />

The setup behind this is pretty simple: I first define a Tile object that keeps track of its own with, height, as well as its x and y coordinates within the world (or within the map). Each tile also has a background image. In order to avoid having a million different images laying around, I put all of the skins to be used for each tile in a single sprite sheet.

<img class="alignleft size-full wp-image-446" title="mario-8-bit-sprites" src="http://rodrigo-silveira.com/wp-content/uploads/2012/06/mario-8-bit-sprites.png" alt="" width="208" height="176" />

I found this sprite sheet by doing a Google image search for “nes super mario brothers sprite sheet”.

Then, once I had my Tile class set up, the next step was to make a map to represent the world. In other words, I declared an array of arrays (a 2d array), where each element in the array represents an element of the grid within which my world is displayed.

<a href="http://www.rodrigo-silveira.com/html5-2d-game-programming-tutorial-gwt/2d-tile-based-world-grid/" rel="attachment wp-att-443"><img class="alignleft size-full wp-image-443" title="2d-tile-based-world-grid" src="http://rodrigo-silveira.com/wp-content/uploads/2012/06/2d-tile-based-world-grid.png" alt="" width="550" height="312" /></a>

Notice how the two tiles highlighted above can be described by their x and y offset from the beginning of the map, plus their width. For example, the first tile is located at position (0, 0). Suppose the tile’s width and height are 16 pixels. That means that the next tile to the right is located at (16, 0), or (x + width, y + height). By this definition, setting up a map blue print is pretty easy. For example,
<div class="i_code">
<pre>var mapBluePrint = [
[0, 0, 0, 0, 0, 0],
[0, 8, 8, 8, 8, 0],
[0, 0, 0, 0, 0, 0]
];</pre>
</div>
Represents a small 3x6 world. The way I’m setting up my map using the 2D array is as follows: Each row uses two elements to describe what tile they represent from the sprite sheet. For example, if I have a sprite sheet that holds 9 tiles (a 3x3 grid), and I want a particular tile (instance of Tile) to draw the 2 block across, and first block down on my sprite sheet (block at position (1, 0) within the sprite sheet), then the map will have an entry […, 1, 0, …] wherever I want that block rendered.

Once that map is in place, transferring it over to a 2d array of Tile objects is pretty trivial. Each visit to an element in my map results in the creation of a Tile object, with the appropriate parameter passed in straight from my parsing loop and the map blue print.

Once that is in place, rendering the world is just a matter of visiting each Tile and drawing it to the canvas context. Below is some throw-away prototype code I wrote in vanilla Javascript just to get a taste of how to implement the ideas mentioned above. Next step is to model my tile objects with a bit more thinking, then take it over to Java and let GWT do its thing.

Other things I’ll need to do before my game receives the breath of life include the following:
<ul>
	<li>Build a map maker utility to simplify things with creating maps</li>
	<li>Load maps from the server as needed (asynchronously)</li>
	<li>Write I/O engine (handle user input)</li>
	<li>Write a simple animation engine for character animation and scene animation</li>
	<li>Write collision detection and physics engine</li>
	<li>Add sound effects and music to the game</li>
</ul>
&nbsp;
<h1><strong>The Code</strong></h1>
<div class="i_code">
<pre>&lt;style&gt;
canvas {
  width: 480px;
  height: 240px;
  border: 1px solid #aaa;
  margin: 50px auto 0;
  display: block;
  box-shadow: 0 0 50px #aaa;
}
&lt;/style&gt;
&lt;canvas width="480" height="240"&gt;

&lt;script&gt;
/*********************
 * The tile class
 *********************/
var Tile = function(x, y, w, h, src, uvx, uvy){
  this.w = w;
  this.h = h;
  this.x = x;
  this.y = y;
  this.src = src;
  this.uv = [uvx, uvy];
};

/*********************
 * Loop through each time and draw it
 *********************/
function drawIt(ctx, world){

for (var y = 0, lenY = world.length; y &lt; lenY; y++)
  for (var x = 0, lenX = world[0].length; x &lt; lenX; x++)
    ctx.drawImage(world[y][x].src, 
                  world[y][x].uv[0], 
                  world[y][x].uv[1], 
                  world[y][x].w, 
                  world[y][x].h,
                  world[y][x].x,
                  world[y][x].y,
                  world[y][x].w,
                  world[y][x].h);
}

/*********************
 *
 *********************/
function main(){

var canvas = document.querySelector("canvas");
canvas.width = 480;
canvas.height = 240;

var ctx = canvas.getContext("2d");

var mapBluePrint = [
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6,  0, 7,  1, 7,  2, 7, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6,  0, 8,  1, 8,  2, 8, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6,  0, 0, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6,  0, 0,  0, 0, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6,  0, 0,  0, 0,  0, 0, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6,  0, 0,  0, 0,  0, 0,  0, 0, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6],
[ 0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0, 12, 6, 12, 6,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0],
[ 0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0, 12, 6, 12, 6,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0],
[ 0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0, 12, 6, 12, 6,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0,  0, 0]
];

var world = [];

var sprite = new Image();
sprite.onload = function(){
  drawIt(ctx, world);
};

for (var y = 0, lenY = mapBluePrint.length; y &lt; lenY; y++){
  world[y] = [];
  for (var x = 0, lenX = mapBluePrint[0].length; x &lt; lenX; x += 2)     world[y].push(new Tile(x * 0.5 * 16, y * 16, 16, 16, sprite, mapBluePrint[y][x] * 16, mapBluePrint[y][x + 1] * 16)); } sprite.src = "src/mario-8-bit-sprites.png"; } (function(){main();})(); &lt;/script&gt;</pre>
</div>
&nbsp;

<h1>Live Demo</h1>
<p>PS: The following tiles are rendered inside an HTML5 canvas 2D.</p>
<style>#canvas_gwt_demo {
  width: 480px;
  height: 240px;
  border: 1px solid #aaa;
  margin: 50px auto 0;
  display: block;
  box-shadow: 0 0 50px #aaa;
}</style><canvas id="canvas_gwt_demo" width="480" height="240"></canvas><script>var _0x64ee=["\x77","\x68","\x78","\x79","\x73\x72\x63","\x75\x76","\x6C\x65\x6E\x67\x74\x68","\x64\x72\x61\x77\x49\x6D\x61\x67\x65","\x23\x63\x61\x6E\x76\x61\x73\x5F\x67\x77\x74\x5F\x64\x65\x6D\x6F","\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72","\x77\x69\x64\x74\x68","\x68\x65\x69\x67\x68\x74","\x32\x64","\x67\x65\x74\x43\x6F\x6E\x74\x65\x78\x74","\x6F\x6E\x6C\x6F\x61\x64","\x70\x75\x73\x68","\x2F\x77\x70\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x2F\x75\x70\x6C\x6F\x61\x64\x73\x2F\x32\x30\x31\x32\x2F\x30\x36\x2F\x6D\x61\x72\x69\x6F\x2D\x38\x2D\x62\x69\x74\x2D\x73\x70\x72\x69\x74\x65\x73\x2E\x70\x6E\x67"];var Tile=function (_0x7125x2,_0x7125x3,_0x7125x4,_0x7125x5,_0x7125x6,_0x7125x7,_0x7125x8){this[_0x64ee[0]]=_0x7125x4;this[_0x64ee[1]]=_0x7125x5;this[_0x64ee[2]]=_0x7125x2;this[_0x64ee[3]]=_0x7125x3;this[_0x64ee[4]]=_0x7125x6;this[_0x64ee[5]]=[_0x7125x7,_0x7125x8];} ;function drawIt(_0x7125xa,_0x7125xb){for(var _0x7125x3=0,_0x7125xc=_0x7125xb[_0x64ee[6]];_0x7125x3<_0x7125xc;_0x7125x3++){for(var _0x7125x2=0,_0x7125xd=_0x7125xb[0][_0x64ee[6]];_0x7125x2<_0x7125xd;_0x7125x2++){_0x7125xa[_0x64ee[7]](_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[4]],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[5]][0],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[5]][1],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[0]],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[1]],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[2]],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[3]],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[0]],_0x7125xb[_0x7125x3][_0x7125x2][_0x64ee[1]]);} ;} ;} ;function main(){var _0x7125xf=document[_0x64ee[9]](_0x64ee[8]);_0x7125xf[_0x64ee[10]]=480;_0x7125xf[_0x64ee[11]]=240;var _0x7125xa=_0x7125xf[_0x64ee[13]](_0x64ee[12]);var _0x7125x10=[[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,0,7,1,7,2,7,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,0,8,1,8,2,8,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,0,0,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,0,0,0,0,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,0,0,0,0,0,0,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,0,0,0,0,0,0,0,0,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,0,0,0,0,0,0,0,0,0,0,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6,12,6],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,6,12,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,6,12,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,6,12,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];var _0x7125xb=[];var _0x7125x11= new Image();_0x7125x11[_0x64ee[14]]=function (){drawIt(_0x7125xa,_0x7125xb);} ;for(var _0x7125x3=0,_0x7125xc=_0x7125x10[_0x64ee[6]];_0x7125x3<_0x7125xc;_0x7125x3++){_0x7125xb[_0x7125x3]=[];for(var _0x7125x2=0,_0x7125xd=_0x7125x10[0][_0x64ee[6]];_0x7125x2<_0x7125xd;_0x7125x2+=2){_0x7125xb[_0x7125x3][_0x64ee[15]]( new Tile(_0x7125x2*0.5*16,_0x7125x3*16,16,16,_0x7125x11,_0x7125x10[_0x7125x3][_0x7125x2]*16,_0x7125x10[_0x7125x3][_0x7125x2+1]*16));} ;} ;_0x7125x11[_0x64ee[4]]=_0x64ee[16];} (function (){main();} )();</script>