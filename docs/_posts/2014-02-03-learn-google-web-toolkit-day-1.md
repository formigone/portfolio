---
layout: post
title: Learn Google Web Toolkit Day #1
author: Rodrigo Silveira
---


## Learn Google Web Toolkit Day #1
-----

<img title="google-web-toolkit-rpc-app-engine" src="/images/blank.gif" data-echo="/content/uploads/2012/12/google-web-toolkit-rpc-app-engine-300x243.png" alt="" width="300" height="243" /></a>As I was working on a Google Web Toolkit &amp; Google App Engine application that I'm doing as a means to get better at GAE and some more advanced GWT concepts (UiBinder, MVP design pattern, RPC, etc.) - at least advanced for me right now, I decided to log every new thing I learn, so that, 1) I will be able to remember them tomorrow, and 2) other can hopefully learn, since there seems to be very little [quality] documentation about GWT and GAE for beginners.

Today, or, day #1, as I decided to call this first blog entry on this subject, I learned two things, which I'll call "tips" from now on, though I know they're not so much tips as they're like, bits of wisdom:

&nbsp;
<h2>GWT Tip #1 - You can't use Google App Engine objects in your client GWT code through RPCs</h2>
I was having a hard time sending a list of users to the client through and RPC. Since the source code for the app engine User class is not available on a path that will be converted to Javascript, you can't just send it to the client. The solution is simple (at least in this very specific case, where the data model I want is simple - it only has holds an email address): Create your own data model, and populate it with whatever data you want from a GAE object on the server. In my case I just had to instantiate my own User objects with the email address taken in my servlet class.

&nbsp;
<h2>GWT Tip #2 - If your data models have complex constructors (a constructor that takes arguments), you must also provide a no argument constructor if you're sending the model to the client through an RPC</h2>
I'm not sure exactly why this is yet, but some of my models, as simple as they were, didn't have a no argument constructor, thus breaking my RPC calls. I just added a blank constructor, and life is good.

Update: After making this same mistake again today, I've realized that the no argument constructor is needed in the serialization process of your model. So if you get such error message as:

<strong>com.google.gwt.user.client.rpc.SerializationException: Type &lt;<em>your.model.class</em>&gt; was not included in the set of types which can be serialized by this SerializationPolicy or its Class object could not be loaded. For security purposes, this type will not be serialized.</strong>

So if you get this error during an RPC, be sure to include that empty constructor, and you'll fix the problem. Of course, that goes without saying that you should include the path to your model in the GWT module descriptor, as in:

<strong>&lt;source path="shared" /&gt;</strong>

And that the model class itself implements <strong>java.io.Serializable</strong>.

&nbsp;
<h2>GWT Tip #3 - How to setup GWT RPC Servlet url-pattern</h2>
One thing I've been confused about with GWT RPC is the annotation @RemoteServiceRelativePath. The actual path that this specifies is the servlet path (its url mapping) to the servlet that will satisfy the remote procedure call.

Whatever value you specify in the annotation, let's say,

@RemoteServiceRelativePath("my-service")

will be used in the web.xml &lt;url-pattern&gt; element as follows:

&lt;url-pattern&gt;/My_GWT_Module_Name/<strong>my-service</strong>&lt;/url-pattern&gt;

The first part of that URL pattern is the name of your GWT module. If you don't rename your module in the module.gwt.xml file, then the first part of the URL would be com.package.name.client. If you do rename your module, as in

&lt;module rename-to="My_GWT_Module_Name"&gt;

Then that renamed attribute would be used in the web.xml file instead.