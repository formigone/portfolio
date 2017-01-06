---
layout: post
title: Google Web Toolkit Failed to Connect
author: Rodrigo Silveira
---

This post presents a solution to debugging the problem in Eclipse when you try to launch a GWT project and the project won't load in the browser. If you've searched around for this problem, you'll probably see this problem referred to as:

## Google Web Toolkit Failed to Connect
-----

This post presents a solution to debugging the problem in Eclipse when you try to launch a GWT project and the project won't load in the browser. If you've searched around for this problem, you'll probably see this problem referred to as:

<strong>GWT 2.0.2 : Failed to Connect 127.0.0.1:8888 development mode</strong>

Today I got my new laptop in the mail. The very first thing I did was download all my usual development tools. Eclipse was one of the first things I downloaded, followed immediately by the installation of Google Web Toolkit (GWT). As I tried to launch the quick sample application just to make sure everything was working fine, I was frustrated to be greeted by a Oops! Google Chrome failed to connect.

In Mozilla Firefox, the error message was something like:

<strong>Page load errorFailed to ConnectFirefox can't establish a connection to the server at 127.0.0.1:8888.</strong>

After searching around, I found various blog entries and forums messages that suggested that you change the 127.0.0.1 to localhost. To me, as it appears to have happened to a lot of other people in those forums, this did not help. So I played around with Eclipse and found a solution to this problem. So if you're trying to compile and develop your GWT applications, but your browser says that you were not able to connect to the app, try the following:
<h1>The Solution</h1>
In your Eclipse IDE, go to the main navigation bar and choose the option <strong>Run</strong>, then <strong>Run Configurations</strong>.

Now find the tab with the blue Google icon labeled <strong>Server</strong>. Check the box that says <strong>Run built-in server</strong>, which will allow you to also check the check box for <strong>Automatically select an unused port </strong>(so be sure to check this box also).

Then find the next tab over, which is labeled <strong>GWT</strong>. Repeat the same step, meaning, check the check box labeled <strong>Automatically select an unused port</strong>. Hit apply, then run. Now you Google Web Toolkit applications will work fine.

As a final step, but one that Chrome will guide you through, you will need to enable the browser extension that allows you to run GWT projects from the IDE into the browser. But I'm sure you can figure this part out if you get this far. Besides, the browser will tell you to enable the extension (plug-in), and give you a button to click and install it. Should be pretty easy.

Enjoy!