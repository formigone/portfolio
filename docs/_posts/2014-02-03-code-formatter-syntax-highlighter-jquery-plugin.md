---
layout: post
title: Code Formatter & Syntax Highlighter jQuery Plugin
author: Rodrigo Silveira
---

<img style="display: none;" src="http://rodrigo-silveira.com/wp-content/uploads/2011/12/source-code-syntax-highlighter-172x116.jpg" alt="Syntax Highlighting for source code in webpages" />

## Code Formatter & Syntax Highlighter jQuery Plugin
-----

<img style="display: none;" src="http://rodrigo-silveira.com/wp-content/uploads/2011/12/source-code-syntax-highlighter-172x116.jpg" alt="Syntax Highlighting for source code in webpages" />

Today I decided to write a simple plugin to extend the functionality of everybody's favorite Javascript library: jQuery. The entire process only took around 20 minutes, so I won't be surprised if to find major bugs in it in the next few days. I did test the plug in a little bit, but I can't promise buglessness in this version.

All the plugin does is take source code that you write inside your HTML file, and format it with line numbers, and syntax highlighting. The highlighting part is styled through an external CSS file, which you can theme to your liking. Since I'm writing this in mid-December, I decided to style to resemble the Christmas season.
<h1>How it works</h1>
Using the plugin is pretty simple: Import jQuery, my plugin (which I decided to call Rokko Code, after the great Brazilian coder), and the accompanying style sheet (or a custom style sheet if you prefer).
<div class="i_code">
<pre>&lt;script type="text/javascript" src=" jquery.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src=" rokkocode.js"&gt;&lt;/script&gt;
&lt;link ref="stylesheet" href="rokkocode.css"/&gt;</pre>
</div>
The next step is to identify where in your HTML you want the plugin to be applied. In this example, I'll write all my code inside a DIV tag with a class of “src_code".
<div class="i_code">
<pre>&lt;div class="src_code"&gt;
function Person(pName)
{
     this.name = pName;
     this.greet = function()
     {
          return 'Hello. My name is ' + this.name + '.';
     };
}
&lt;/div&gt;</pre>
</div>
Right now, if you look at your file, you should see something like this: 


<em>function Person(pName){this.name = pName;this.greet = function(){return 'Hello. My name is ' + this.name + '.';};}</em>


Pretty boring, since you haven't called upon RokkoCode. So now the next step is to call the Rokko Code plugin on that DIV. If you have multiple elements that are matched in the jQuery expression, they will all be formatted.

<div class="i_code">
<pre>&lt;script&gt;
$('src_code').rokkoCode();
&lt;/script&gt;</pre>
</div>

And the final result after the call to $().rokkoCode() is this:

<div id="rokkocode_demo">
function Person(pName)
{
     this.name = pName;
     this.greet = function()
     {
          return 'Hello. My name is ' + this.name + '.';
     };
}
&nbsp;
var me = new Person('Rodrigo');
alert( me.greet() );
</div>

&nbsp; <h1>Live Demo</h1>
<ul>
	<li>View a demo of my <a href="http://rodrigo-silveira.com/dharma/web-demos/rokkocode-jquery-plugin-demo.html">RokkoCode jQuery Plugin</a>.</li>
</ul>
<h1>Download Source Code</h1>
Download my RokkoCode plugin and start formatting and highlighting any C, C++, C#, Java, Javascript, and PHP code in your HTML files today.
<ul>
	<li><a href="http://www.rodrigo-silveira.com/dharma/web-demos/src/jquery.rokkocode.0.23.js">RokkoCode jQuery Plugin (.js file)</a></li>
	<li><a href="http://www.rodrigo-silveira.com/dharma/web-demos/src/jquery.rokkocode.css">RokkoCode Christmas Theme (.css file)</a></li>
</ul>

<div id="src_injection_rokkocode_demo"></div>
<link rel="stylesheet" type="text/css" href="http://rodrigo-silveira.com/dharma/web-demos/src/jquery.rokkocode.css" media="all" />
<script>$('#src_injection_rokkocode_demo').append('<script src="/dharma/web-demos/src/jquery.rokkocode.0.23.js"/>');$('#rokkocode_demo').rokkoCode();</script>