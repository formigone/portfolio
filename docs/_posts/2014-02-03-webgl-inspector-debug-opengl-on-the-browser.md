---
layout: post
title: WebGL Inspector Debug OpenGL on the Browser
author: Rodrigo Silveira
---

For those of you who have done any web development at all, you are well aware of tools such as <a href="https://addons.mozilla.org/en-US/firefox/addon/firebug/">Firebug</a>, Google Chrome's Developer Tools, and other browser plug-ins that allow you to inspect a web page's DOM structure in real time. Normally these tools also allow you to execute Javascript code, check for HTTP requests and statuses, etc., all in real-time.

## WebGL Inspector Debug OpenGL on the Browser
-----

Now, in case you have also been doing some 3D game programming, or just some WebGL development in general, you are probably hoping and waiting for the day when someone will come around and put out a tool similar to those described above, but one that is aimed at WebGL. I'm here today to bring you the good news: Now you can debug your OpenGL or WebGL applications in real-time using this Firebug-like extension for the three major browsers [that work] called <a href="http://benvanik.github.com/WebGL-Inspector/">WebGL Inspector</a>.

<img title="webgl-inspector-screenshot" src="/images/blank.gif" data-echo="/content/uploads/2012/04/webgl-inspector-screenshot.jpg" alt="" width="100%" />

This extension will seem familiar to most who have done any web design work before using available debugging browser tools. To install the plugin, run the following Git command:

    $ git clone git://github.com/benvanik/WebGL-Inspector

You can also download the project as a Zip or Tar collection directly from the link above.

With WebGL Inspector, you can see all the buffers used in a given frame, view and even download any and all texture files used, view all the 3D models, and even look at the original fragment and vertex shader programs. While the inspector is meant to be used within a browser context, it can be super helpful to traditional OpenGL developers, since it gives you access to an application's inner workings.
