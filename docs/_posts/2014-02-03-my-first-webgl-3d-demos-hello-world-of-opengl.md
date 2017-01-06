---
layout: post
title: My First WebGL 3D Demos Hello, World (of OpenGL)
author: Rodrigo Silveira
---

The following is a list of simple HTML5 WebGL demos I have done for a graphics class I'm taking at school. The class focuses on OpenGL and C++. I have ported some of the C++ code I have written for that class into Javascript and HTML5. I am surprised at how close OpenGL and WebGL (OpenGL ES) are. So far I have not yet found any differences between the libraries whatsoever. Actually, the one difference I have ran into is that, as with older versions of OpenGL (pre 2.0-ish), texture files had to have a width and height of powers of 2 (in pixels - 2, 4, 8, 16, 32, 64, 128 512, etc.). OpenGL 2.0+ doesn't enforce this restriction, although I'm sure this can be advantageous to do (sizing your texture images as such).

## My First WebGL 3D Demos Hello, World (of OpenGL)
-----

The following is a list of simple HTML5 WebGL demos I have done for a graphics class I'm taking at school. The class focuses on OpenGL and C++. I have ported some of the C++ code I have written for that class into Javascript and HTML5. I am surprised at how close OpenGL and WebGL (OpenGL ES) are. So far I have not yet found any differences between the libraries whatsoever. Actually, the one difference I have ran into is that, as with older versions of OpenGL (pre 2.0-ish), texture files had to have a width and height of powers of 2 (in pixels - 2, 4, 8, 16, 32, 64, 128 512, etc.). OpenGL 2.0+ doesn't enforce this restriction, although I'm sure this can be advantageous to do (sizing your texture images as such).
<h1><strong>List of demos:</strong></h1>
&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/simple-triangles.php">Simple Gradiated Triangles</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/simple-triangles.php"><img class="alignnone size-full wp-image-327" title="webgl-demo-simple-triangles" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-simple-triangles.jpg" alt="" width="550" height="200" /></a>

Nothing too special here. I think the simple triangle is the <em>Hello, World</em> of 3D graphics.

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/triangle-storm.php">A Storm of Triangles</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/triangle-storm.php"><img class="alignnone size-full wp-image-331" style="border-style: initial; border-color: initial;" title="webgl-demo-triangle-storm" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-triangle-storm.jpg" alt="" width="550" height="200" /></a>

This demo was designed to be a quick and dirty way to see how much my browser could handle. The demo just renders a bunch of triangles every frame at random locations. You can rotate the triangles, zoom in and out, add or remove more triangles from the scene. Very little optimizations here, if any at all. Each triangle is drawn from its own call to gl_Draw()

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/snow-fall-with-fog.php">Snow Fall with Fog</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/snow-fall-with-fog.php"><img class="alignnone size-full wp-image-325" title="webgl-demo-fog-effect" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-fog-effect.jpg" alt="" width="550" height="200" /></a>

This demo is built on the previous demo. The main difference between the two is the vertex shader, which calculates each vertex's z position relative to the camera, and render it with more of the color representing the fog. Simple stuff.

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/simple-square.php">Simple Square</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/simple-square.php"><img class="alignnone size-full wp-image-326" style="border-style: initial; border-color: initial;" title="webgl-demo-simple-squares" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-simple-squares.jpg" alt="" width="550" height="200" /></a>

Similar to the triangle demo, but with more vertices. One other difference is that this example uses a index buffer (GL_ELEMENT_ARRAY_BUFFER).

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/spinning-cube.php">Spinning Cube</a></h2>
<h2><a href="http://rodrigo-silveira.com/webgl/demos/spinning-cube.php"><img class="alignnone size-full wp-image-328" style="border-style: initial; border-color: initial;" title="webgl-demo-spinning-cube" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-spinning-cube.jpg" alt="" width="550" height="200" /></a></h2>
This is the other <em>Hello, World</em> of 3D graphics. Built on the previous demo also (it even uses the same shaders), the only difference between the two examples is the amount of vertices and how the vertices are animated each frame.

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/textured-cube.php">Textured Cube</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/textured-cube.php"><img class="alignnone size-full wp-image-329" title="webgl-demo-super-mario-cube" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-super-mario-cube.jpg" alt="" width="550" height="200" /></a>

Now the examples are getting better. This code is the exact same as the previous demo (with the animation being very slightly different), but a new shader is used, which loads the Super Mario Brothers texture. One thing that took me a while to figure out is this: <strong>in WebGL, texture images must be sized as a power of 2!</strong> This is very important to remember. If the image is a single pixel too wide or high, everything will load up fine, but the fragment shader will output black for every fragment. So keep that in mind when loading up your textures!

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/cloud-of-cubes.php">Super Mario Galaxy</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/cloud-of-cubes.php"><img class="alignnone size-full wp-image-330" style="border-style: initial; border-color: initial;" title="webgl-demo-super-mario-galaxy" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-super-mario-galaxy.jpg" alt="" width="550" height="200" /></a>

This demo uses the same code as the previous example, but it prints more than one cube. The main difference is the introduction of a camera matrix, which allows you to navigate the scene without having to move any of the objects in it. In one of the previous demos, a similar effect is achieved by changing the actual vertices of every object's model-view matrix. Not the best way to do things. Who needs that 99 lives trick in Super Mario 64 when you can get ten thousand mystery blocks in outer space!

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/mesh-from-json.php">Loading Mesh File with AJAX &amp; JSON</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/mesh-from-json.php"><img class="alignnone size-full wp-image-330" style="border-style: initial; border-color: initial;" title="webgl-demo-mesh-downloaded-from-ajax-json" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-mesh-downloaded-from-ajax-json.jpg" alt="" width="550" height="200" /></a>

This demo uses the same code as the previous example, with the only difference being that the mesh it uses in the scene is completely loaded from the server asynchronously. The mesh file is stored in the server as a JSON file (JavaScript Object Notation), and was made by a simple program I wrote in C++ that converts an OBJ file exported from Blender 3D 2.6. This allows future demos and apps to be more realistic, as I won't be dealing with blocks and triangles anymore.

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/lowres-skybox.php">Low Resolution Skybox Effect</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/lowres-skybox.php"><img title="webgl-demo-low-resolution-skybox" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-lowres-skybox.jpg" alt="" width="550" height="200" /></a>

This demo is my first attempt at the awesome looking skybox effect. Since I was more concerned with getting the effect to work (as opposed to looking beautiful and realistic right away), the texture being used isn't the best. The size of each face is not quite optimized, plus the edges don't come together very nicely. Overall, I think the effect looks decent, although it clearly needs work.

&nbsp;
<h2><a href="http://rodrigo-silveira.com/webgl/demos/skeletal-animation.php">Simulated Skeletal Animation (soft body deformation)</a></h2>
<a href="http://rodrigo-silveira.com/webgl/demos/skeletal-animation.php"><img title="webgl-demo-low-resolution-skybox" src="http://rodrigo-silveira.com/wp-content/uploads/2012/03/webgl-demo-skeletal-animation.jpg" alt="" width="550" height="200" /></a>

While this demo doesn't actually use a bone system, the concept of transforming some vertices more than others is the goal. I actually have this model nicely animated with a real and complete skeletal structure set up in Blender 2.6. The main issue I'm having with this is being able to understand the way that the exported Collada file (.dae) represents the animation. As I get some more research in on this particular topic, I'll be updating this demo.

&nbsp;

<strong>Coming soon:</strong>

The following are topics I'll be learning and posting a demo for soon:
<ul>
	<li>Multiple VBOs (Vertex Buffer Objects)</li>
	<li>Skeletal Animation (bones, joints, skinning)</li>
	<li>Lighting (diffused and specular)</li>
	<li>3D Soft Deformation</li>
	<li>Cell Shading (Toon Shading)</li>
	<li>Collision Detection</li>
	<li>Physics</li>
	<li>HTML5 Audio</li>
</ul>
I will be posting a detailed tutorial for each of the examples above as soon as I get the time. Also, if there is a certain example you'd like to see, feel free to post your request in the comments area.