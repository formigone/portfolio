---
title: Code Formatter & Syntax Highlighter jQuery Plugin
subtitle: This is an old demo I made in 2013.
author_staff_member: 
show_comments: true
soc_img:
  src: /images/posts/jquery-meme.jpg
  width: 1800
  height: 1029
---

This is proof that I was one of the cool developers who not only used jQuery, but I was [on my way to becoming] a jQuery master.

# About this post

As mentioned in other posts... last night (November 4, 2020) I was showing my 7 year old daughter what Twitter is. I decided to show her some of the weird stuff I'd posted over the years. One of the posts was a link to an old demo I had posted on an old version of this blog. I clicked on the link, only to realize I'd removed all my old blog posts not related to my current pursuit of AI and Machine Learning. My daughter told me that I "should never delete stuff, because then people would never know what I had to say or show them."

That 7 year old wisdom was enough motivation for me to dig through my Github account and find the code for that and other demos, which is what you'll find below.

# The original content

Today I decided to write a simple plugin to extend the functionality of everybody's favorite Javascript library: jQuery. The entire process only took around 20 minutes, so I won't be surprised if to find major bugs in it in the next few days. I did test the plug in a little bit, but I can't promise buglessness in this version.

## Code Formatter & Syntax Highlighter jQuery Plugin
-----

<img width="100%" src="/images/source-code-syntax-highlighter-172x116.jpg" alt="Syntax Highlighting for source code in webpages" />

All the plugin does is take source code that you write inside your HTML file, and format it with line numbers, and syntax highlighting. The highlighting part is styled through an external CSS file, which you can theme to your liking. Since I'm writing this in mid-December, I decided to style to resemble the Christmas season.

## How it works

Using the plugin is pretty simple: Import jQuery, my plugin (which I decided to call Rokko Code, after the great Brazilian coder), and the accompanying style sheet (or a custom style sheet if you prefer).

    <script type="text/javascript" src=" jquery.js"></script>
    <script type="text/javascript" src=" rokkocode.js"></script>
    <link ref="stylesheet" href="rokkocode.css"/>

The next step is to identify where in your HTML you want the plugin to be applied. In this example, I'll write all my code inside a DIV tag with a class of “src_code".

    <div class="src_code">
    function Person(pName)
    {
         this.name = pName;
         this.greet = function()
         {
              return 'Hello. My name is ' + this.name + '.';
         };
    }
    </div>

Right now, if you look at your file, you should see something like this: 

    function Person(pName){
        this.name = pName;
        this.greet = function(){
            return 'Hello. My name is ' + this.name + '.'
        ;}
    ;}

Pretty boring, since you haven't called upon RokkoCode. So now the next step is to call the Rokko Code plugin on that DIV. If you have multiple elements that are matched in the jQuery expression, they will all be formatted.

    <script>$('src_code').rokkoCode();</script>

And the final result after the call to $().rokkoCode() is this:

    function Person(pName)
    {
         this.name = pName;
         this.greet = function()
         {
              return 'Hello. My name is ' + this.name + '.';
         };
    }

    var me = new Person('Rodrigo');
    alert( me.greet() );

## Live Demo

<strike>View a demo of my <a href="#">RokkoCode jQuery Plugin</a>.</strike>
Sadly, I was not able to find the HTML file I had with that plugin in action. Since the code for the plugin is still in my GitHub account, I will one day take the time to make an interactive demo page for it.

## Source Code

Checkout my RokkoCode plugin and start formatting and highlighting any C, C++, C#, Java, Javascript, and PHP code in your HTML files today.

 + <a href="https://github.com/formigone/rokkocode">RokkoCode jQuery Plugin</a>
