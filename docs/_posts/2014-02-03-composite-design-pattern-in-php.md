---
layout: post
title: Composite Design Pattern in PHP
author: Rodrigo Silveira
---

I just wanted to post a quick example of the composite design pattern, implemented in PHP. I don't want to go into great depth about how the pattern works. In short, this pattern allows you to have a tree structure where each node can be either a leaf or a composite. A composite can itself have children, which can obviously only be either a leaf or other composites. When working with this tree, the client simply calls the operation on the tree, and the tree recursively calls the operation on each node. Here's an illustration taken from <a href="http://www.codeproject.com/Articles/10845/Composite-Design-Pattern-an-Example">The Code Project</a> of how this pattern is set up:

## Composite Design Pattern in PHP
-----

<img title="composite-pattern-uml" src="/images/blank.gif" data-echo="/content/uploads/2012/06/composite-pattern-uml.png" alt="" width="100%" />

## Example in PHP
In this example, I'll be implementing a simple command line application that takes an arbitrary number of arguments, all of which should be numbers. Then the application uses a composite to add up all the numbers together. Then, to spice things up, I set up a second composite that subtracts the same numbers. Finally, we add the composites together, and negate both operations. The important part being the fact that the client only deals with two structures, which, although they are both complex, they end up being treated as simple structures (numbers). Here is a UML that resembles my implementation, taken from <a href="http://sourcemaking.com/design_patterns/composite">SourceMaking</a>

<img title="composite-pattern-example" src="/images/blank.gif" data-echo="/content/uploads/2012/06/composite-pattern-example.png" alt="" width="100%" />

## The Source Code
To run this code, invoke the script from the command line, and pass a few numbers as arguments. If you want to run this test on a browser, you'll have to tweak the code a bit to grab the parameters from a different source other than from $argv.

    <?php
    
    //
    // A simple implementation of the composite pattern to apply learning
    // and increase understanding
    //
    
    
    /*************************************
    * The abstract class that our composites
    * will implement. The DOIT operation
    * could represent any arithmetic operation
    *************************************/
    abstract class AritheticComposite {
      public abstract function doit();
    }
    
    
    /*************************************
    * A simple implementation of a composite
    * that adds two or composites together
    *************************************/
    class PlusOperator extends AritheticComposite {
      private $composites;
    
      public function __construct() {
        $this->composites = array();
      }
    
      public function add(AritheticComposite $composite) {
        array_push($this->composites, $composite);
      }
    
      public function doit() {
        $sum = 0;
    
        foreach ($this->composites as $num)
          $sum += $num->doit();
    
        return $sum;
      }
    }
    
    
    /*************************************
    * What is intended to be an implementation
    * of a leaf node. This will only hold a numeric
    * value. Calling the DOIT operation will simply
    * return the object's value.
    *************************************/
    class Number extends AritheticComposite {
      private $val;
    
      public function __construct($num) {
        $this->val = $num;
      }
    
      public function doit() {
        return $this->val;
      }
    }
    
    
    /*************************************
    * Just adding order to the script
    *************************************/
    function main($args) {
    
      $plus = new PlusOperator();
      $minus = new PlusOperator();
    
      //
      // Add the arguments to each of the composites.
      // Since $minus represents substraction, we'll add the
      // negative of each argument to it
      foreach ($args as $key => $arg) {
        if ($key > 0) {
          $plus->add(new Number($arg));
          $minus->add(new Number(-$arg));
        }
      }
    
      echo "Sum      = ", $plus->doit();
      echo "\n";
      echo "Diff     = ", $minus->doit();
      echo "\n";
    
    
      //
      // Now the cool part: add a composite to another one.
      // If this works, the results should be zero.
      //
      $plus->add($minus);
      echo "Negation = ", $plus->doit();
    }
    
    
    
    //
    // Make it so
    //
    main($argv);

A few sample executions of the above script are represented below:

    > php composite_pattern.php 1 2 3 4 5
    Sum      = 15
    Diff     = -15
    Negation = 0
    
    > php composite_pattern.php 1 -1 2 -2 3
    Sum      = 3
    Diff     = -3
    Negation = 0
    
    > php composite_pattern.php 4 8 15 16 23 42
    Sum      = 108
    Diff     = -108
    Negation = 0
