---
layout: post
title: Custom CSS Filters with GLSL Shaders
author: Rodrigo Silveira
---

Yesterday I got to the chapter of my book where I was to write about CSS Shaders. Since up to that point I had only heard about them, I had to go out and so my research on it. Turns out they're not even called that anymore... Since the feature was merged with the CSS filters spec, they're all called just that now.

## Custom CSS Filters with GLSL Shaders
-----

<img title="victoriarender2.jpeg" alt="CSS Filters API" src="/images/blank.gif" data-echo="/content/uploads/2013/04/wpid-victoriarender2.jpeg" width="100%" /> 

However, since Google Chrome's about://flags page refers to the feature as a shader, I think I'll continue to call them that.

Since I already had some good experience with GLSL programming, once I understood how the CSS interface works, it was pretty easy to hook into my custom shaders and make things pop.

My next tutorial will definitely be about how to use them, which will include a few sample shaders. The example in the book only walks you through a semi-dummy vertex shader, whose job is to pass a few uniforms from the stylesheet down to the fragment shader. The fragment shader then makes use of the varyings from the user, and renders the HTML accordingly. More specifically, the shader asks for a value for the red, green, and blue channels, then renders the elements with those.

One practical application for this shader program (or should I say, custom filter) is to render the HTML block with a particular color, then render it with a different color when an event takes place. For example, render the elements with a different color when the mouse hovers the node. Then, we can set a nice transition property on that node's style attributes, and the browser would take care of interpolating the values between.
