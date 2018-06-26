---
layout: page
title: Software & Data Projects I've worked on
permalink: /projects/
---

## My own projects

The following are projects I developed on my own as proof of concepts or because my curiosity would not let me sleep. 

### Blood Cholesterol Predictor (2018)

From a private dataset of images of blood samples with their accompanying cholesterol (in mg/dL), I developed several machine learning models that predicted one's cholesterol from a picture of the blood sample. The best model ended up being a convolutional neural network using Google's Inception 2 architecture.

<img src="/images/cholesterol-predictor.png" alt="Using machine learning to predict cholesterol" width="100%" />

The selected trained model was deployed to a server where it ran on a standalone Python process, fronted by an Apache API endpoint. I also developed an Android and iOS application that allows the user to use the phone's camera to photograph their blood sample, use the API described, and get an accurate prediction within 1 second.

#### Details

 * Used a private dataset.
 * Developed custom tools in JavaScript and PHP to build a clean, labeled dataset from raw images.
 * Developed, trained, debugged, and optimized multiple deep learning models.
 * Deployed the model to production.
 * Developed a backend web API that collects users usage of the app to continue to train the model.

#### Technologies

 * TensorFlow
 * Python
 * PHP
 * Apache
 * React.js
 * React Native

---

### TensorFlow Speech Recognition Challenge (2017)

This was my first Kaggle competition, which I was surprised to place 222nd of 1315 participants (top 17%). The competition was sponsored by Google Brain, and consisted of having to train a machine learning model using a dataset of 64 thoursand 1 second audio files, each containing one of several commands (such as "up", "down", "yes", "no", etc.).

Once trained, the model would be given thousands of new 1 second voice commands, and it would need to predict which, if any, of the commands the sound contained.  

<img src="/images/TensorFlow_Speech_Recognition_Challenge___Kaggle.png" alt="Rodrigo Silveira Google Brain Kaggle Competition" width="100%" />

<a href="https://www.kaggle.com/c/tensorflow-speech-recognition-challenge">View on Kaggle.com</a>

#### Details

 * First Kaggle competition.
 * Best rank was 85th.
 * Participated alone.
 * Best model was a convolutional neural network, taking 3D spectrogram as inputs.

#### Technologies

 * TensorFlow
 * Python
 * Numpy
 * Pandas

---

### MNIST App (2017)

A personal project that applies machine learning proficiency. The app allows users to draw a number on the phone, and using the raw pixels of this drawing as input, the model predicts with high accuracy what the number is.

<img src="/images/MNIST_App_-_Apps_on_Google_Play.png" alt="MNIST App for Android" width="100%" />

<a href="https://play.google.com/store/apps/details?id=mnist.ai.formigone.com.mnistapp&hl=en_US">Download on Google Play</a>

#### Details

 * Used the existing MNIST dataset.
 * Applyed data augmentation techniques to increase dataset.
 * Developed, trained, debugged, and optimized multiple deep learning models.
 * Deployed the best model to TensorFlow mobile.
 * Developed a backend web API that collects users usage of the app to continue to train the model.
 * Over 20,000 observations have been collected to date from users interacting with the app.

#### Technologies

 * TensorFlow
 * Python
 * Apache
 * Node.js
 * Express

---

### Dfrag (2017)

A very minimalist JavaScript framework/abstraction to simplify creating DOM structures in a declarative way. The purpose of this was to simplify my own creation of JavaScript demos and prototypes without having to write a lot of code, and without having to setup React.js, Webpack, Babel, and all sorts of additional tooling just to render simple DOM elements on the page.

<img src="/images/formigone_dfrag__A_minimalist_functional_abstraction_to_create_DOM_fragments.png" alt="Rodrigo Silveira Dfrag JavaScript Library" with="100%" />

<a href="https://github.com/formigone/dfrag">View on GitHub</a>

#### Details

 * Dead-simple API
 * Only 787 bytes uncompressed

#### Technologies

 * Vanilla JavaScript

---

### php-config (2016)

A minimalist and loose port of <a href="https://www.npmjs.com/package/config">node-config</a>, which is a simple way to create environment specific configuration files. At run time, the configuration files from the various environemnts (local, development, stage, production, etc.) get merged in such a way that you can reuse configurations across environemnts, rather than copying and duplicating them.

The reason for this project was to simplify configuration management in PHP projects, and to bring to PHP a very elegant solution that the Node package that this project mimics solved.

<img src="/images/formigone_php-config__A_loose_port_of_node-config.png" alt="Rodrigo Silveira PHP config library" width="100%" />

<a href="https://github.com/formigone/php-config">View on GitHub</a>

#### Technologies

 * PHP

---

### Google's Dev Art (2014)

Another competition I entered for fun. DevArt was a Google sponsored initiative where developers and artists were to develop art with code. The winner(s) would be given some cash grant to develop their idea more fully, and the final project would be featured in some museum somewhere in the world. Again, my intent was mostly to take place in this, learn, and have fun.

My project was artsy rendition of Conway's game of life, where the board was rendered by an image input by the user. Each generation of the game was rendered atop the previous one, but with some level of blending. The final output was intended to give the appearance of bacteria growing on a petri dish.

<img src="/images/devart-screenshot.png" alt="BioPixology Screnshot - Rodrigo Silveira DevArt with Google" width="100%" />

<a href="https://devart.withgoogle.com/#/project/17886819?q=formigone">View on DevArt</a>
<a href="https://github.com/formigone/devart-template">View on GitHub</a>

#### Details

 * Project hosted on the legacy Google App Engine.
 * Weird, creepy idea, but from an art standpoint, looked pretty cool.

#### Technologies

 * Google Closure Tools
 * Google App Engine

---

### BigBrother.js (2014)

I wrote this as a prototype to allow analyst to record a user's interaction with a page, then play it back to watch their behavior, or programmatically aggregate data across multiple users and multiple sessions.
 
<div class="videoWrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/6-hdc5aUHcI?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
 
<a href="https://github.com/formigone/big-brother-js">View on GitHub</a>

#### Technologies
 * Vanilla JavaScript
    * Thin client library that binds to the DOM and tracks the user's interactions with the page, including mouse movement, clicks, keyboard events, etc.
    * A simple _player_ component that allows you to replay a recorded user session.
 * PHP 
    * Thin API endpoint that received input from the client library and persisted each session's recordings.

---

### php-chain (2013)
 
A thin abstraction over PHP's native arrays to help you easily chain array transformation functions. The motivation for writing this library was because PHP's array functions are ridiculous - APIs are not consistent, and you cannot chain or compose the functions. Performing back to back transformation opperations on arrays can be very verbose.

<img src="/images/formigone_php-chain__A_thin_abstraction_over_PHP_arrays_to_help_you_easily_chain_array_transformation_functions.png" alt="PHP Chain array library" width="100%" />
<a href="https://github.com/formigone/php-chain">View on GitHub</a>

#### Technologies
 * PHP

---

### Tupacsum (2013)
 
A Lorem Ipsum generator for the web designer that keeps it real. This was a fun toy project that I wrote during lunch one day to generate real-looking text to fill up designs or UI prototypes. The text content comes from the lyrics of various songs by Tupac Shakur. 

<img src="/images/tupacsum-ipsum.jpg" alt="Tupacsum Ipsum generator" width="100%" />

<a href="https://chrome.google.com/webstore/detail/tupacsum/dokiogadbpnilohbdnhahpoeebljielo?utm_source=chrome-ntp-icon">View on Chrome Web Store</a>
<a href="https://github.com/formigone/tupacsum">View on GitHub</a>

#### Technologies
 * JavaScript

---

### GWT Game of Life (2013)
 
This was probably my first project using Google Web Toolkit, which was once a great and promising way to write performant JavaScript applications using Java. As the name implies, the application was an implementation of Conway's game of life, rendered on an HTML5 canvas. 

<a href="https://github.com/formigone/gwt-game-of-life">View on GitHub</a>

#### Technologies
 * Java
 * Google Web Toolkit (GWT)

---

### jQuery plugin: syntax highlighting (2012)

During a phone interview with a developer from Disney, I was asked if I had ever written a jQuery plugin. Since I had not yet done so, I decided to go home and write something so that I could answer positively the next time I was asked about jQuery. 

This plugin looks for DOM elements containing a configurable className, then replaces that element's contents (assuming it is source code) with extra DOM elements wrapping certain tokens parsed from the element, styling it such that it would render as highlighted source code. 

<a href="https://github.com/formigone/rokkocode">View on GitHub</a>

#### Technologies
 * Java
 * Google Web Toolkit (GWT)

---

### HTML5 Stock Market Simulation (2011)
 
An HTML5-based stock market simulation in PHP using WebSockets (implementing WebSocket Draft 75 and Draft 76), as well as a client app that interacts with the WebSockets server. An unbounded amount of users are allowed to connect to the app and buy/sell stocks.

<div class="videoWrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/oJxWhmt5m-o?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

<a href="https://github.com/formigone/html5-stock-market-simulation">View on GitHub</a>

#### Technologies
 * PHP
    * A manual implementation of the WebSockets protocol (Drafts 75 and 76 - now outdated by many years).
    * A server application that made use of the WebSockets server that handled the stock market simulation.
 * JavaScript
    * A vanilla ECMAScript 5 application that handles the client-side logic and presentation of this stock market simulation.

---

## Contributions to other open-source projects

### TensorFlow (2018)

After discussing with the good folks at <a href="https://groups.google.com/a/tensorflow.org/forum/#!forum/discuss">TensorFlow's official forum</a>, I found a way to make the <a href="https://www.tensorflow.org/api_docs/python/tf/nn/batch_normalization">batch normalization component</a> easier to use correctly. The result of my research was my first contribution to a major open-source project.

<img src="/images/tensorflow-1.8.0-contributors.png" alt="Rodrigo Silveira TensorFlow contributor" width="100%" />

[https://github.com/tensorflow/tensorflow/releases/tag/v1.8.0-rc1](TensorFlow 1.8.0 Release Notes)

---

### Slim Framework (2014)

My first contribution to an open source project. Minor, short, and sweet.

[https://github.com/slimphp/Slim](https://github.com/slimphp/Slim)
