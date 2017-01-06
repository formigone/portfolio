---
layout: post
title: Building a custom web analytics system
author: Rodrigo Silveira
---

<a href="http://rodrigo-silveira.com/wp-content/uploads/2013/04/big-database-mysql.jpg"><img class="alignleft size-medium wp-image-642" alt="big-database-mysql" src="http://rodrigo-silveira.com/wp-content/uploads/2013/04/big-database-mysql-300x225.jpg" width="300" height="225" style="display:block"/></a>

## Building a custom web analytics system
-----

<a href="http://rodrigo-silveira.com/wp-content/uploads/2013/04/big-database-mysql.jpg"><img class="alignleft size-medium wp-image-642" alt="big-database-mysql" src="http://rodrigo-silveira.com/wp-content/uploads/2013/04/big-database-mysql-300x225.jpg" width="300" height="225" style="display:block"/></a>

&nbsp;

Recently at work, I was assigned to develop a system to track and analyse user behavior on a news website, so that we can determine what kinds of news articles our visitors read, and thus expose more relevant content to individual readers.

Since we average a couple million unique visits every day on the site, this is no trivial task. Obviously, when compared to the truly gargantuan systems out there today, this is not too large a scale. However, given our constraints and the requirements for the project, I'm very much enjoying the challenge and the learning experience.

In the next couple of posts I'll describe my what I've learned from working in this project. More specifically, I'll describe what I've learned about, and how I've implemented the following concepts:
<ul>
	<li>How to architect a scalable, custom web analytics system</li>
	<li>How to model the data to keep track of each user's behavior patterns</li>
	<li>How to scale MySQL databases</li>
	<li>How to generate reports to analyse data</li>
	<li>How to track users even when they're not logged in</li>
	<li>Caching is king, cron job is queen</li>
</ul>
This application was written in PHP 5.4 using Zend Framework in the back end, using a MySQL cluster for the storage, and vanilla JavaScript on the front end.