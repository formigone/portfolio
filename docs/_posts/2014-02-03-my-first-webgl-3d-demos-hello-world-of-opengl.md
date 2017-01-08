---
layout: post
title: From OpenGl to WebGL - My first 3D demos in JavaScript
author: Rodrigo Silveira
---

What's a better way to learn something than to implement the concepts in code?! That's the purpose of this post. Some of the demos are direct ports of OpenGl code I wrote for fun and for a graphics course from college. The majority of the code is just me experimenting with JavaScript 3D rendering.

## My First WebGL 3D Demos Hello, World (of OpenGL)
-----

The following is a list of simple HTML5 WebGL demos I have done for a graphics class I'm taking at school. The class focuses on OpenGL and C++. I have ported some of the C++ code I have written for that class into Javascript and HTML5. I am surprised at how close OpenGL and WebGL (OpenGL ES) are. So far I have not yet found any differences between the libraries whatsoever. Actually, the one difference I have ran into is that, as with older versions of OpenGL (pre 2.0-ish), texture files had to have a width and height of powers of 2 (in pixels - 2, 4, 8, 16, 32, 64, 128 512, etc.). OpenGL 2.0+ doesn't enforce this restriction, although I'm sure this can be advantageous to do (sizing your texture images as such).

## Simple Gradiated Triangles

<a href="/demo-webgl-simple-triangles.html">
<img title="webgl-demo-simple-triangles" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-simple-triangles.jpg" alt="" width="100%" />
</a>

Nothing too special here. I think the simple triangle is the <em>Hello, World</em> of 3D graphics.

## A Storm of Triangles
<a href="/demo-webgl-triangle-storm.html">
<img title="webgl-demo-triangle-storm" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-triangle-storm.jpg" alt="" width="100%" /></a>

This demo was designed to be a quick and dirty way to see how much my browser could handle. The demo just renders a bunch of triangles every frame at random locations. You can rotate the triangles, zoom in and out, add or remove more triangles from the scene. Very little optimizations here, if any at all. Each triangle is drawn from its own call to gl_Draw()

## Snow Fall with Fog
<a href="/demo-webgl-snow-fall-with-fog.html"><img title="webgl-demo-fog-effect" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-fog-effect.jpg" alt="" width="100%" /></a>

This demo is built on the previous demo. The main difference between the two is the vertex shader, which calculates each vertex's z position relative to the camera, and render it with more of the color representing the fog. Simple stuff.

## Simple Square
<a href="/demo-webgl-simple-square.html"><img title="webgl-demo-simple-squares" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-simple-squares.jpg" alt="" width="100%" /></a>

Similar to the triangle demo, but with more vertices. One other difference is that this example uses a index buffer (GL_ELEMENT_ARRAY_BUFFER).

## Spinning Cube
<a href="/demo-webgl-spinning-cube.html"><img title="webgl-demo-spinning-cube" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-spinning-cube.jpg" alt="" width="100%" /></a>
This is the other <em>Hello, World</em> of 3D graphics. Built on the previous demo also (it even uses the same shaders), the only difference between the two examples is the amount of vertices and how the vertices are animated each frame.

## Textured Cube
<a href="/demo-webgl-textured-cube.html"><img title="webgl-demo-super-mario-cube" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-super-mario-cube.jpg" alt="" width="100%" /></a>

Now the examples are getting better. This code is the exact same as the previous demo (with the animation being very slightly different), but a new shader is used, which loads the Super Mario Brothers texture. One thing that took me a while to figure out is this: <strong>in WebGL, texture images must be sized as a power of 2!</strong> This is very important to remember. If the image is a single pixel too wide or high, everything will load up fine, but the fragment shader will output black for every fragment. So keep that in mind when loading up your textures!

## Super Mario Galaxy
<a href="/demo-webgl-cloud-of-cubes.html"><img title="webgl-demo-super-mario-galaxy" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-super-mario-galaxy.jpg" alt="" width="100%" /></a>

This demo uses the same code as the previous example, but it prints more than one cube. The main difference is the introduction of a camera matrix, which allows you to navigate the scene without having to move any of the objects in it. In one of the previous demos, a similar effect is achieved by changing the actual vertices of every object's model-view matrix. Not the best way to do things. Who needs that 99 lives trick in Super Mario 64 when you can get ten thousand mystery blocks in outer space!

## Loading Mesh File asynchronously (JSON encoded)
<a href="/demo-webgl-mesh-from-json.html"><img title="webgl-demo-mesh-downloaded-from-ajax-json" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-mesh-downloaded-from-ajax-json.jpg" alt="" width="100%" /></a>

This demo uses the same code as the previous example, with the only difference being that the mesh it uses in the scene is completely loaded from the server asynchronously. The mesh file is stored in the server as a JSON file (JavaScript Object Notation), and was made by a simple program I wrote in C++ that converts an OBJ file exported from Blender 3D 2.6. This allows future demos and apps to be more realistic, as I won't be dealing with blocks and triangles anymore.

## Low Resolution Skybox Effect
<a href="/demo-webgl-lowres-skybox.html"><img title="webgl-demo-low-resolution-skybox" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-lowres-skybox.jpg" alt="" width="100%" /></a>

This demo is my first attempt at the awesome looking skybox effect. Since I was more concerned with getting the effect to work (as opposed to looking beautiful and realistic right away), the texture being used isn't the best. The size of each face is not quite optimized, plus the edges don't come together very nicely. Overall, I think the effect looks decent, although it clearly needs work.

## Simulated Skeletal Animation (soft body deformation)
<a href="/demo-webgl-skeletal-animation.html"><img title="webgl-demo-low-resolution-skybox" src="/images/blank.gif" data-echo="/content/uploads/2012/03/webgl-demo-skeletal-animation.jpg" alt="" width="100%" /></a>

While this demo doesn't actually use a bone system, the concept of transforming some vertices more than others is the goal. I actually have this model nicely animated with a real and complete skeletal structure set up in Blender 2.6. The main issue I'm having with this is being able to understand the way that the exported Collada file (.dae) represents the animation. As I get some more research in on this particular topic, I'll be updating this demo.

## Coming soon

The following are topics I'll be learning and posting a demo for soon:
 + Multiple VBOs (Vertex Buffer Objects)
 + Skeletal Animation (bones, joints, skinning)
 + Lighting (diffused and specular)
 + 3D Soft Deformation
 + Cell Shading (Toon Shading)
 + Collision Detection
 + Physics
 + HTML5 Audio

I will be posting a detailed tutorial for each of the examples above as soon as I get the time. Also, if there is a certain example you'd like to see, feel free to post your request in the comments area.
