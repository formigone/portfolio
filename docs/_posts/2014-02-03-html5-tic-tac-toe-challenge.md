---
layout: post
title: HTML5 Tic Tac Toe Challenge
author: Rodrigo Silveira
---

Today I had a very weird, yet profound thought to myself: <strong>How fast can I code an entire Tic Tac Toe game in HTML?</strong>

## HTML5 Tic Tac Toe Challenge
-----

Today I had a very weird, yet profound thought to myself: <strong>How fast can I code an entire Tic Tac Toe game in HTML?</strong>

So I came home and started writing it as fast as I could.
<h2>The Challenge</h2>

<iframe width="550" height="309" src="http://www.youtube.com/embed/Uz7QU3hc-5o" frameborder="0" allowfullscreen></iframe>

The rules are simple: create a functioning Tic Tac Toe game using nothing but HTML, CSS, and Javascript. The game must work in at least one modern web browser. A complete list of requirements and restriction follows:
<ul>
	<li>You are not allowed to use anything but Notepad (or whatever crude text editor your system may provide)</li>
	<li>Your text editor may not do any typing for you (code completing, etc)</li>
	<li>You are not allowed to use any libraries, plugins, etc. (no jQuery, CSS Bootstrap, etc.)</li>
	<li>You are not allowed to use any existing code (not even code you previously wrote for this same Tic Tac Toe coding challenge)</li>
	<li>You must use the timestamp set by the system to calculate your total time (once the game is finished, tested, and follows all the rules of the game)</li>
	<li>The game must work as expected (account for wins and draws)</li>
	<li>The game must provide some sort of indication (text or audio) about the following events:</li>
</ul>
<ol>
	<li>Whose turn it is</li>
	<li>Who won (if someone won the game)</li>
	<li>The game ended on a draw (if that's the case)</li>
	<li>If an invalid move was attempted (example, the player tries to check an already occupied square)</li>
</ol>
<ul>
	<li><span style="line-height: 13px;">The game must stop once it ends (no squares should be marked/unmarked once the game is over)</span></li>
</ul>
<div></div>
<div><span style="line-height: 13px;">My current stats ares as follows:</span></div>
<div>
<ul>
	<li>Current version: 1.0</li>
	<li>Release date: 10/20/2012</li>
	<li>Time taken: 33 minutes</li>
	<li>Current best time: 33 minutes</li>
	<li>Previous version: N/A</li>
</ul>
&nbsp;
<h2>My Current HTML Tic Tac Toe game:</h2>
<a href="http://rodrigo-silveira.com/html5-tic-tac-toe-challenge.html">Play my latest version of the game</a> or look below to see the complete source code of the current version.

&nbsp;
<h2>The code</h2>

<div class="i_code"><pre>
&lt;style>
#game {
  overflow: auto;
  width: 300px
  height: 300px;
  border: 1px solid #ddd;
  background: #eee;
  padding: 10px;
}

#game div {
  clear: both;
}

#game button {
  display: block;
  float: left;
  width: 50px;
  height: 50px;
  margin: 5px 10px;
}

#gameActionDisplay {
  padding: 20px 10px;
}
&lt;/style>

&lt;div id="game">

&lt;div>
  &lt;button>&lt;/button>
  &lt;button>&lt;/button>
  &lt;button>&lt;/button>
&lt;/div>

&lt;div>
  &lt;button>&lt;/button>
  &lt;button>&lt;/button>
  &lt;button>&lt;/button>
&lt;/div>

&lt;div>
  &lt;button>&lt;/button>
  &lt;button>&lt;/button>
  &lt;button>&lt;/button>
&lt;/div>
&lt;/div>

&lt;div id="gameActionDisplay">&lt;/div>
&lt;/div>

&lt;script>
// ------------------------------------------------------------
// Tic Tac Toe Game
// Copyright (r) Rodrigo Silveira. All rights reserved.
//
// @author Rodrigo Silveira
// @date 10/20/2012
// @url http://www.rodrigo-silveira.com
//
// The purpose of this very simple HTML game was for me to see
// how fast I could create a complete Tic Tac Toe game in HTML.
// My time today (including testing and bug fixes, as well as
// styling, and everything else seen on the page) was:
// -> 33 minutes
// Think you can honestly beat me? Let me know!
// ------------------------------------------------------------
var Display = function(displayElement) {
  var display = displayElement;
  function setText(message) {
    display.innerText = message;
  }

  return {setMessage: setText};
};

function isValid(btn) {
  return btn.innerText.length == 0;
}

function checkScore(btn, squares) {
  console.log("click");
  console.log(btn);
  console.log(squares);
}

function setMark(btn, players, currentTurn) {
  btn.innerText = players[currentTurn];
}

function checkForWinner(squares, players, currentTurn) {
  if (squares[0].innerText == players[currentTurn] &&
      squares[1].innerText == players[currentTurn] &&
      squares[2].innerText == players[currentTurn])
    return true;

  if (squares[3].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[5].innerText == players[currentTurn])
    return true;

  if (squares[6].innerText == players[currentTurn] &&
      squares[7].innerText == players[currentTurn] &&
      squares[8].innerText == players[currentTurn])
    return true;

  if (squares[0].innerText == players[currentTurn] &&
      squares[3].innerText == players[currentTurn] &&
      squares[6].innerText == players[currentTurn])
    return true;

  if (squares[1].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[7].innerText == players[currentTurn])
    return true;

  if (squares[2].innerText == players[currentTurn] &&
      squares[5].innerText == players[currentTurn] &&
      squares[8].innerText == players[currentTurn])
    return true;

  if (squares[0].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[8].innerText == players[currentTurn])
    return true;

  if (squares[2].innerText == players[currentTurn] &&
      squares[4].innerText == players[currentTurn] &&
      squares[6].innerText == players[currentTurn])
    return true;

  return false;
}

function isFullBoard(squares) {
  for (var i = 0, len = squares.length; i < len; i++)
    if (squares[i].innerText.length == 0)
      return false;

  return true;
}

function isDraw(squares) {
  return (!checkForWinner(squares, ["X"], 0)) && isFullBoard(squares);
}

function main() {
  var squares = document.querySelectorAll("#game button");
  var players = ["X", "O"];
  var currentTurn = 0;
  var isGameOver = false;
  var display = new Display(document.querySelector("#gameActionDisplay"));

  display.setMessage("Player 'X' begins");

  for (var i = 0, len = squares.length; i < len; i++)
    squares[i].addEventListener("click", function(){
      if (isGameOver)
        return;

      if (!isValid(this)) {
        display.setMessage("Invalid choice");
      } else {
        setMark(this, players, currentTurn);

        isGameOver = checkForWinner(squares, players, currentTurn);
        if (isGameOver) {
          display.setMessage("Player '" + players[currentTurn] + "' WINS!");
          return;
        }

        if (isDraw(squares)) {
          display.setMessage("DRAW!");
          return;
        }

        currentTurn += 1;
        currentTurn %= 2;

        display.setMessage("Player '" + players[currentTurn] + "' to move");
      }

    });
}

(function(){ main();})();
&lt;/script>
</pre></div>

</div>