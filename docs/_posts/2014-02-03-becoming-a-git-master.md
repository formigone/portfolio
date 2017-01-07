---
layout: post
title: Becoming a Git Master
author: Rodrigo Silveira
---

I made the full switch to Git about 6 months ago, and I see no reason to ever go back to SVN. For the most part, everything is going great, and I've had no problems adapting. The idea of branches, fast forwarding, etc. is pretty intuitive and easy to follow. Any time I've messed stuff up, it's mostly been a matter of thinking through git's model to fix the problem. From there, it's just a matter of finding out what the commands are.

## Becoming a Git Master
-----

<img src="/images/blank.gif" data-echo="/content/uploads/2013/02/poptocat-300x300.jpg" alt="poptocat" width="100%" />

Here are a few basic principles and best practices that I wish I had known from day one. Following these ideas will help you to, if not just transition into git, become a git master!

## 1. Always keep Master clean

The master branch should never be incomplete and have pieces of code not ready for production. If you're going to be working on a bug fix, a new feature, or just refactor existing code, checkout a new branch first and work there. When you're done working on that branch, merge the work into master, and delete the temporary branch.

## 2. Always keep a copy of your temporary branches remotely

Following the previous point, as soon as you create that new branch where you'll be working, be sure to push that branch to the remote server. The reason is so that if your computer gets by a bus on your way to work the next day, you don't lose your precious work. And if you're the one dying before that bug fix is done and merged, your coworkers don't lose anything either.

## 3. Be paranoid and commit often

Instead of commenting out code all over the place in case you need it later, just commit your code often and keep it clean. If you need old code later, you can always rewind through your commits. And while you're at it, make sure you comment each commit appropriately. I have found that more detailed commits are better than super brief ones, so don't be afraid. I would even say that there is no such thing as commenting your commits too much.
