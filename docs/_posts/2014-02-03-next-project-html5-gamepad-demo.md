---
layout: post
title: Next Project HTML5 Gamepad Demo
author: Rodrigo Silveira
---

Last night I got a USB adapter that allows me to connect my PlayStation 2 controller my computer. The whole reason I purchased this thing was so I could get started with the "new" HTML5 API that exposes a gamepad to JavaScript.

## Next Project HTML5 Gamepad Demo
-----

<img alt="playstation-2-controller-html5" src="/images/blank.gif" data-echo="/content/uploads/2013/04/playstation-2-controller-html5-300x168.jpg" width="100%" />

I've been reading about this API for the past few days, and since there's so little information on it, I've decided to also write a pretty detailed tutorial on HTML 5 gaming using a gamepad. All I've been able to find on the subject so far, is that the interface provided by Mozilla is fairly different from the one provided by WebKit...

So read on if this sounds exciting to you as much as it does to me. And if you have know of any sound sources where I can read more about the API, please let me know.

## WebKit GamePads API
The first thing I learned about this HTML5 gaming API is that most of the information on it as of this writing (2013-04-11) is a bit outdated. First of all, the call to get the controller state is

    var controllers = navigator.webkitGetGamepads();

From there, you'll get an object of type <strong>GamepadList</strong>, which is essentially an array of length 4, where each element is a snapshot of each controller state. If you call this function before a button is pressed on a connected controller, the array will be undefined. And as you press buttons on each controller, the order that each controller is activated is the order within the GamepadList array in which each controller will be stored. Note that you only need to press a button on a given controller once, and for the duration of the page life cycle (until the page -- navigator -- is refreshed) that particular device will be associated with that array element (offset).

Once a controller is "registered" with the navigator, you can query that object directly. Note that Chrome will pull the hardware, so you can't just hold a single reference to the controller object. You will need to call navigator.webkitGetGamepads() each time you want to check the state of each button.

    var controllers = navigator.webkitGetGamepads();
    var controller = controllers[0];

Now the variable controller holds a reference to an object of type Gamepad. This object has a few properties, such as:

    Gamepad {
       axes: Array[6],
       buttons: Array[12],
       id: "(null) Twin USB Joystick (Vendor: 0810 Product: 0001)",
       index: 0,
       timestamp: 2315012
    }

So each time you pull the controller, what you want to do is check the state of the elements of the attributes axes and buttons on the Gamepad object. On my PlayStation 2 controller, which as you can see is connected to my machine through a "Twin USB Joystick" device, the default button configuration relative to the Gamepad object is as follows:

    Gamepad.axes[0] // Right/Left buttons
       // -1 when left arrow button is pressed
       //+1 when right arrow button is pressed
    
    Gamepad.axes[1] // Up/Down buttons
       // -1 when up arrow button is pressed
       //+1 when down arrow button is pressed
    
    Gamepad.buttons[0] // Triangle button
    Gamepad.buttons[1] // Circle button
    Gamepad.buttons[2] // X button
    Gamepad.buttons[3] // Square button
    Gamepad.buttons[4] // L2 button
    Gamepad.buttons[5] // R1 button
    Gamepad.buttons[6] // L1 button
    Gamepad.buttons[7] // R1 button
    Gamepad.buttons[8] // Select button
    Gamepad.buttons[9] // Start button

## HTML5 Gamepad Demo

From the information listed above, we shouldn't have too much trouble coming up with a demo that we can run on the browser, and make things move using a good old gamepad... and that's exactly my goal for this coming week =)

<img src="/images/blank.gif" data-echo="/content/uploads/2013/04/8bit-super-mario-brothers-html5.jpg" alt="8bit-super-mario-brothers-html5" width="100%" />

The three things I'm planning on accomplishing for this demo are:

 + Abstract out the webkitGamepad API - so we can also use other browser-specific interfaces
 + Add a configuration interface, so the player can choose how to map action button to their specific controller
 + Make Mario and Luigi walk around, run, and jump

Want to see the final result? Stay tuned!