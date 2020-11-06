---
layout: post
title: Machine Learning Painting with Linear Regression
author: Rodrigo Silveira
---

This is my first implementation of a machine learning algorithm in JavaScript. I think linear regression is an appropriate place to start, as the only thing required to get something going is to implement gradient descent. Although the code is not optimized for performance, it demonstrates the underlying concepts of minimizing a cost function in order to learn the parameters that best fit the training data.

## Demo: Learning an input image
-----

This toy application feeds the pixel data for some input image to a linear regression model, which eventually learns what RGB value corresponds with each pixel coordinate. A more technical explanation follows.

<div id="painting-container"></div>
<style>
    .lin-reg-canvas { background: #fff; width: 50%; image-rendering: pixelated; }
    #painting-container p { font-family: monospace; }
    #painting-container button { margin: 10px auto; }
    @media only screen and (max-width: 600px) {
        .lin-reg-canvas {
            width: 100%;
        }
    }
</style>
<script src="/js/gstatic-charts-loader.js"></script>
<script src="/js/demo/linear_regression_painting.bundle.js"></script>
<script>formigone.linear_regression_painting.default('/images/samira-28x28.jpg', document.getElementById('painting-container'));</script>

<hr/>

## How linear regression "learns"

The first image in the demo above is used as the target that the algorithm is to learn. Since the goal is for the algorithm to learn every pixel in the image, I create a model with `n + 1` weights, where `n = width * height` pixels in the input image, and the additional value acts as a bias value.

The training data consists the coordinate of each pixel, with the expected output as the hex value of the corresponding pixel. Since this is a linear model (as opposed to a neural network), I'm not sure how I can use two features (such as [x, y] values) and affect as many weights as I'd like. Thus, each training sample is a vector of length `n` with all zeros, and a one representing the pixel location in question.
 
    // Suppose the target image is a 2x2 image
    const trainingX = [
       [1, 0, 0, 0],
       [0, 1, 0, 0],
       [0, 0, 1, 0],
       [0, 0, 0, 1],
    ];
    
    const trainingY = [
       [0xfff],
       [0xf00],
       [0x0f0],
       [0x00f],
    ];
    
In the example above, `trainingX[0]` refers to pixel [0, 0], which maps to the expected value `trainingY[0]`, which happens to be a white color.

To keep things simple, I run [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent) for a small amount of epochs, then use the model to redraw the image pixel by pixel. The process repeats until the cost function returns below some arbitrary threshold.

<img src="/images/samira-400.jpg" alt="Using linear regression to learn images" style="width: 100%" />

## JavaScript implementation of linear regression

Checkout the entire source for this at [https://github.com/formigone/machine-learning/blob/master/lin-reg/LinearRegressionModel.js](GitHub). My purpose with that repository is to learn and experiment, and not to produce a high performance machine learning library. 

The main class is `LinearRegressionModel`, which has a simple interface:

    /**
     *
     * @param {Array<Array<number>>} samples List of samples
     * @param {Array<Array<number>>} labels List of vectors
     */
     LinearRegressionModel.prototype.train = function(samples, labels){};
     
     /**
      *
      * @param {Array<number>} inputs
      */
     LinearRegressionModel.prototype.score = function(inputs){};

    /**
     *
     * @returm {Array<number>}
     */
    LinearRegressionModel.prototype.getParams = function(){};
    
    /**
     *
     * @param {Array<number>} params
     */
    LinearRegressionModel.prototype.setParams = function(params){};
    
To me the most exciting part about it is the implementation of the training algorithm, which I was pleasantly surprised with how simple it was to get right within 15 minutes. Ignoring some of the logging stuff in that method, the steps are:

 + Add a constant input value of 1 to each sample (to reconcile the bias weight).
 + Score each sample using the current weights in the model.
 + Calculate the error for each sample (`score - expected`).
 + Create a new weights vector by updating each weight with `weight[y] - learningRate * sum(errors[i], samples[i])`

---
    
    /**
     *
     * @param {Array<Array<number>>} samples List of samples
     * @param {Array<Array<number>>} labels List of vectors
     * @param {Object=} config - { learningRate, maxCost, epochs, logCost, logCallback }
     */
    LinearRegressionModel.prototype.train = function (samples, labels, config) {
      var maxEpochs = config.epochs || 10;
      var epoch = 0;
      var maxCost = config.maxCost || 0.05;
      var learningRate = config.learningRate || 0.05;
      var logCost = config.logCost || 100;
      var logCallback = config.logCallback || function () {};
      var M = samples.length;
    
      var lr = learningRate / M;
      var costFrac = 1 / (2 * M);
    
      // Add zeroth bias input
      samples = samples.map(sample => [1].concat(sample));
    
      while (epoch++ < maxEpochs) {
        var scores = samples.map(sample => this.score(sample, true));
    
        if (logCost > 0 && epoch % logCost === 1) {
          var errorSquared = scores.reduce(function (acc, score, i) {
            var diff = score - labels[i][0];
            return acc + diff * diff;
          }, 0);
          var cost = costFrac * errorSquared;
          if (Number.isNaN(cost)) {
            throw new Error('Cost exploded');
          }
    
          if (cost < maxCost) {
            break;
          }
    
          logCallback({ model: this, cost, epoch });
        }
    
        var errors = scores.map((score, i) => score - labels[i][0]);
        this.params = this.params.map(function (param, col) {
          return param - lr * errors.reduce((acc, error, row) => {
              return acc + error * samples[row][col];
            }, 0);
        });
      }
    };
    
My next goal is to implement stochastic gradient descent and see for myself what the trade-offs are. Next I plan on writing a simple neural network and try the same exercise. Finally, I will implement the same concept using TensorFlow and get more involved with it.

One question I'm trying to find a definitive answer to is: using linear regression, is it possible to input only two values (namely, [x, y]) and train the model to correctly output the value for all pixels colors of the image represented by the training data? 
