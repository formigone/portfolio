---
layout: post
title: HTML5 Stock Market Simulation in PHP
author: Rodrigo Silveira
---

In response to the several emails I have received in the last two weeks, I have decided to take the time to post the source code for my HTML5 Stock Market simulator written in PHP. 

## HTML5 Stock Market Simulation in PHP
-----

## Update: Source code now available

I've posted the project in GitHub under <a href="https://github.com/formigone/html5-stock-market-simulation">HTML5 stock market simulation</a>.

## HTML5 WebSocket Server in PHP

I wrote a PHP implementation of HTML5 Web Sockets, and made a simple Stock Exchange simulator application out of it with HTML5 (Javascript's Web Socket object). While I'm at it, I'll go ahead and post a brief explanation of what I did and how things work, so check back soon if that is of any interest to you. Here's a link to the <a href="http://www.youtube.com/watch?v=oJxWhmt5m-o">YouTube screen cast</a> that I posted about it. Or if you'd like, I guess you can just watch the video right here:

<iframe width="100%" src="https://www.youtube.com/embed/oJxWhmt5m-o" frameborder="0" allowfullscreen></iframe>

## The Code

For those of you who have been waiting for me to post the code for this, I apologize for the delay. You can now <a href="https://github.com/formigone/html5-stock-market-simulation">clone the repository</a> and play around with this stock simulator for yourself. I was just trying out the app a few minutes ago, and I noticed that the latest version of <a href="http://www.google.com/aclk?sa=L&ai=C_hgX2HkXT4iDJee0iAKMs-iDC6mmrvQB0bDj5huJlNy_CwgAEAEgyZiiC1CigbjN_v____8BYMmO9ofso9wXyAEBqgQbT9DdaSW_86o0Bmjs2bih_M92kGmRaAsui4XagAWQTqAGGg&sig=AOD64_2dpDxeSa8hhn6pnogyKmb_CPx0tg&ved=0CBMQ0Qw&adurl=http://www.google.com/chrome/intl/en/make/download.html%3F%26brand%3DCHMB%26utm_campaign%3Den%26utm_source%3Den-ha-na-us-sk%26utm_medium%3Dha&rct=j&q=download+chrome">Chrome </a>wasn't connecting to the PHP server for some reason. The server recognized the connection request, and even maintained the socket opened, but the browser threw some exception. I haven't looked into it too much due to current time constraints, so someone that finds out something about it please post. The code does work just fine in <a href="http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&sqi=2&ved=0CCsQFjAA&url=http%3A%2F%2Fwww.apple.com%2Fsafari%2Fdownload%2F&ei=8HkXT4rjEbLKiALy3o2KAQ&usg=AFQjCNHWLTA9xzeCUYjWJ9KECN1AnsRgKA">Safari</a>, though. I have not tested it in <a href="http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CDAQFjAA&url=http%3A%2F%2Fwww.mozilla.org%2Fen-US%2Ffirefox%2Fnew%2F&ei=_XkXT-u4BKzViAKCxMDXDw&usg=AFQjCNHXR7GrDNHIc3plcSvQSx_ByCacYQ">Firefox</a>, but I'd assume it'd work fine. If not, make sure that there's no settings that prevent websocket connections from being established. As far as <a href="http://www.google.com/aclk?sa=L&ai=CIwnUCnoXT-CfNMjoiAKFxIXfCbW_m4kDxarTvjLli7SXewgAEAEgyZiiC1CNocKq-f____8BYMmO9ofso9wXyAEBqgQYT9AbjH94c8zNq7odhw4_Uoejbq0YdWeXgAWQTg&sig=AOD64_1OYYf9_WQQLqZFeUGw_tbrVCQY4w&ved=0CAwQ0Qw&adurl=http://clk.atdmt.com/MRT/go/336236240/direct/01/%3Fhref%3Dhttp://view.atdmt.com/action/mrt101_PFXUSMSFTIEUSGenericActionTag_1/v3/sz9CZgzqI_13467314741_e_8754bh8916/%3Fhref%3Dhttp%253A%252F%252Fpixel.quantserve.com%252Fr%253Ba%253Dp-5eu58oSpL1cEs%253Blabels%253D_click.publisher.SEARCH%252BGoogle%252C_click.campaign.IE9_RTWDR%252C_click.placement.*http%253A%252F%252Fwindows.microsoft.com%252Fen-US%252Finternet-explorer%252Fproducts%252Fie%252Fhome%253Focid%253Die9_bow_Google%2526WT.srch%253D1%2526mtag%253DSearGoogle&rct=j&q=download+ie9">Internet Explorer 9</a> is concerned, I haven't tried it either, but wouldn't be surprised if it worked with it, too.

So there you have it. There are instructions in the zip file on how to run the application. As far as extending the app, or building different apps using the server, feel free to do whatever you want with it. Although the code was written for a networking class that I took at school, the elegance and clarity of the code was not the priority. Thus, any graphics about a CS460 class, or poor code documentation can be justified for this reason.
