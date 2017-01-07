---
layout: post
title: 3D Programming Transformation Matrix Tutorial
author: Rodrigo Silveira
---

This tutorial is an introduction to 3D programming. While code examples will be in C++ and using <a href="http://www.opengl.org/" target="_blank">OpenGL</a>, the concepts can be used in any language. In fact, the focus of this tutorial is the concepts rather than the implementation.

## 3D Programming Transformation Matrix Tutorial
-----

For starters, let’s briefly go over the idea of displaying a 3D world in a computer screen. As you know, computers ultimately display images as a series of pixels. A pixel can be thought of as a single dot (normally shaped like a rectangle) with a single color. You can think of an image displayed by a computer screen as array of objects type Pixel:
Pixel image[600 * 800] = {1.0, 0.0, 0.0, 1.0, 0.0, 0.0, …};

In order to keep things simple, you can interpret the numbers inside the image array as a series of values representing a color made up of 3 different values, namely red, green, and blue (RGB). So the first 3 values in the array are red = 1, green = 0, blue = 0, which gives you a very bright red pixel. The size of that array (600 * 800) means that this array has a width of 600 and a height of 800 pixels. Below is an example of a small pixel grid, where you can imagine an image can be drawn:

<img title="pixel-grid" src="/images/blank.gif" data-echo="/content/uploads/2012/03/pixel-grid.gif" alt="" width="100%" />

So the first 3 values in that pixel array correspond to the color that the very first pixel in the array will be displayed in. In this space – pixel space (more on that later), the first pixel in the pixel array corresponds to the top left corner of this screen. Below is an example of this grid of points with a few points colored in red:

<img title="pixel-grid-filled" src="/images/blank.gif" data-echo="/content/uploads/2012/03/pixel-grid-filled.gif" alt="" width="100%" />

The moral of this example is that you can access any point within this grid by specifying its x and y coordinates. The image below shows a blue pixel with a coordinate of (4, 2).

<img title="pixel-grid-indexed" src="/images/blank.gif" data-echo="/content/uploads/2012/03/pixel-grid-indexed.gif" alt="" width="100%" />

At this point you may be asking yourself where the z coordinate goes… Since we’ll be drawing 3D objects, we’ll need more than just x and y axis, right?! Well, unfortunately computer screens don’t know anything about that third axis, and all it can draw is x and y points.

## Coordinate System Transformation
The point of the above discussion is to introduce the idea of a coordinate system. At the lowest level, the computer monitor can only deal with the x and y coordinates system (also known as pixel space). With 3D objects, we’ll be working with 3 additional spaces, namely the model space (also known as object space), world space, and view space (also known as camera space and eye space).

As the title of this tutorial implies, the way you get from one pixel space to the next is through transformation matrices. In case you only know the work “matrix” because you’ve watched the movie, I recommend you look up a few tutorials on matrix math, or better yet, pay more attention in school…

The next few sections of this tutorial will introduce each of these spaces (coordinate systems), and how you move your 3D objects from one space to the next, until you can finally display the 3D image (project it) on your 2D computer screen.

## MVP Model View Projection Matrix
### Model Space
When you first model an object in 3D (normally you’d use a 3D modeling program like <a href="http://www.blender.org/" target="_blank">Blender </a>or <a href="http://sketchup.google.com/" target="_blank">Google Sketchup</a>, both of which are free, by the way), you create your model in a coordinate system called the model space. That is, the center of the object is the point (0, 0, 0), meaning that you now have an axis for each dimension (x, y, and z). The following image should help to illustrate this idea:

<img title="3d-cube-in-model-space" src="/images/blank.gif" data-echo="/content/uploads/2012/03/3d-cube-in-model-space.png" alt="" width="100%" />

For the purposes of this tutorial, we’ll define this cube as an array of points representing each vertex (corner) of this cube:

    float cube[] = {
        -1.0, -1.0, -1.0, // front face, top left corner
        -1.0, 1.0, -1.0, // front face, bottom left corner
         1.0, 1.0, -1.0,
         1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0, // back face, top left corner
        -1.0, 1.0, 1.0, // back face, bottom left corner
         1.0, 1.0, 1.0,
         1.0, -1.0, 1.0
    };

This cube defines the points along the negative z axis to be closer to the viewer, points to the left of the center of the model to be going along the negative x axis, and going up as moving to the negative y direction.

So in summary, those points defining the cube represent a model in model space. This says nothing about where the cube is to be displayed within a virtual world.
### World Space
Now image your virtual 3D world. Let’s say that in it you have only one object – the cube we just talked about. Similar to the coordinate system in model space, the point (0, 0, 0) represents the center of the world. Let’s say we want to display our cube centered on point (10, 10, 10). That is, 10 units to the right, 10 units down, and 10 units away from the camera.

To do this, we’ll need to create a matrix and multiply all the points that make up the cube by it. Basically, we’ll be performing the multiplication by a vector (the vector has 3 points, which represents a particular vertex).

Once you multiply a vertex by your model matrix, you will have moved that vertex from model space to world space. This is as simple as that. The model matrix can be really simple or not so simple. Basically what it does it perform 3 transformations to your vertices:

 + Rotate
 + Scale
 + Translate
 
In other words, this matrix specifies how much you want to rotate your object (it may simply specify that there will be no rotation at all), how big you want it to display within the world (with relation to the original model, which in our example is a 1x1x1 cube), and where within the entire world you want it (in this example we want to translate it from the origin to the point (10, 10, 10)).

The easiest way to accomplish this is to create each of the five matrices, then multiply them all together to create a composite model matrix:

<img title="rotation-matrices" src="/images/blank.gif" data-echo="/content/uploads/2012/03/rotation-matrices.png" alt="" width="100%" />

<img title="scale-matrices" src="/images/blank.gif" data-echo="/content/uploads/2012/03/scale-matrices1.png" alt="" width="100%" />

<img title="translation-matrices" src="/images/blank.gif" data-echo="/content/uploads/2012/03/translation-matrices.png" alt="" width="100%" />

Once you have specified the values for your model transformation, generated the appropriate matrices, and multiplied them together, you’ll have your model matrix. Run each vertex of your model through it, and you’ll have your vertices in world space.

### View Space
View space is the coordinate system that you’ll have your vertices in after you transform your vertices from world space by using a view matrix (also known as the camera matrix). All this means is that your camera will be in point (0, 0, 0) of your world, and all the points that were in world space are transformed accordingly. Actually, your camera matrix looks exactly like your model matrix. The truth is that the camera is just another object, but one that’s invisible. This means that you create your camera matrix the same way as your model matrix (you rotate it, scale it, and translate it). The difference is this: Say you have an object in your world space located at point (10, 10, 10). Now, let’s say you want the camera to sit 5 unites away from this cube. Well, so we can imagine that the camera will be located (in world space) at point (10, 10, 5). However, view space is a completely different space. Like I mentioned, in camera space (same as view space) the camera is always at the origin. So that means that your cube that was at (10, 10, 10) in world space will now be located at (0, 0, 5), which is the same thing as before, but now it’s positioned relative to the camera. If you choose to scale and rotate your camera, then your objects (vertices) in world space will be scaled and rotated relative to your camera as well.

So to transform a vertex from your model space down to camera space, you’ll have to multiply the camera matrix by the model matrix, and all your vertices by this new composite matrix.

## Projection Space
Now that we’ve moved vertices from model space down to view space, we only have one transformation left before we can have our points in pixel space. Like we mentioned earlier, your monitor only knows about x and y points. It has no sense of depth (z axis). The way we simulate that is by projecting the 3D shapes onto a 2D plane. To accomplish this effect, we run our points through the projection matrix, which could be a perspective projection or an orthographic projection.

The projection matrix shown below does two things: it creates the illusion of depth by projecting points in our 3D space (from the near plane to the far plane, meaning that points along the z-axis beyond those points won’t be drawn) onto a 2D plane, and it also adjusts the image to take the aspect ratio of your display into account. This last part is important. In projection space, the coordinate system is centered on its origin (point (0, 0, 0)), and the dimensions range from -1 to 1. In other words, the upper-left point on the display is (-1, -1), and the lower-right corner is (1, 1). That means the display is a square, right?! But what if your display is actually not a square? Then your cube would look weird. So the projection matrix adjusts for that, so you’d still have a cube with all sides looking the same length (or a circle that doesn’t look lopsided).

    void MatrixPerspective(float fov_deg, /* width / height */
                           float aspectRatio, 
                           float near, 
                           float far)
    {
        float Sx = (aspectRatio>1.0f) ? 1.0f/aspectRatio : 1.0f;
        float Sy = (aspectRatio>1.0f) ? 1.0f : aspectRatio;
        float cotA2 = 1.0f / tan(DEG_2_RAD(angle_deg / 2.0f));
        float scaleX = cotA2 * Sx;
        float scaleY = cotA2 * Sy;
        float depth = far - near;
    
       this->setElements( scaleX, 0, 0, 0,
                             0, scaleY, 0, 0,
                             0, 0, far / depth, -(far + near) / depth,
                             0, 0, 1.0f, 0);
    }

Where the function setElements would construct or update an array of 16 floats representing your matrix structure.
In summary, after you create your MVP matrix stack (by multiplying together your projection, view, and model matrices), you simply multiply every point in your 3D mesh, and the resulting points will be in pixel space, meaning that a call to a function like the example below would render that 3D object on a 2D computer screen:

    void drawPixel(float x, float y, float* color_rgb)
    {
        // Draw points to some type of buffer that gets drawn by your application
    }
