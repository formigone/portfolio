---
layout: post
title: A paper on abstraction in Software Development
author: Rodrigo Silveira
---

The following is a paper I wrote originally as part of a school assignment during my work at Brigham Young University – Idaho. I attended BYU-I between 2010 and 2012, and ultimately earned by Bachelor’s degree in Computer Science.

## Abstraction in Software Development
-----

## Abstraction in Software Development, by Rodrigo Silveira
### Introduction
Modern software has evolved to become so complicated that it has become impossible to engineer an enterprise system on a scale simple enough to be completely internalized in human memory.  To better illustrate these systems and their functionality, software engineers have turned to abstraction to bring order to what was once one single implementation.  By creating a clear distinction within program logic, its behavior, and its data, expertly applied abstraction can transform software into a solution which is both easily maintainable and easily understood.

These distinctions made through the use of abstraction can support the development of a product, making its structure more easily visualized than if it were to be tightly coupled with itself with no distinct classes of behavior.

The application of abstraction is an essential part of modern programming, and is relevant even to the smallest software.  As software becomes more complicated through the evolution of computer science, the application of abstraction in design is paramount for developing robust software.
### What is Abstraction?
In practice, abstraction is the means by which a particular thought or concept is implemented into a more granular interpretation.  This is the basis by which humans interpret the world around them, and is the means that allow us to manage and manipulate vast quantities of information effortlessly.  We don’t need to know how something works to use it.  We just need to know what it does and what we need to do in order to make it work.

Abstraction in computing is an identical application, where the implementation of a particular interface is separated from its design.  The interface can be a data structure or a framework.  An API, for example, is literally an <em>application programming interface</em>, providing a “deeper discussion of the relations among types, data abstraction, and polymorphism [2].”<em> </em>

Abstraction is imperative for modeling both large and complex systems, such as enterprise solutions, where development relies upon more than a single developer [8].  With careful preparation, design and development can be scheduled according to interfaces that can be developed independent of one another [1].  The byproduct should result in software that is simpler to understand, easier to budget, and affordable to maintain.
### Why Abstraction is Important
Abstraction in computer programming is an evolution that resulted out of the necessity of reducing complexity for users as well as engineers [1] and to quantify and to simplify new applications of existing paradigms.  The iteration to this new style provides a technique for programming and a way to write “good” programs to solve a given problem in an organized, portable, and reusable way.

Object-oriented programming, for example, is an abstraction which provides an interface to user defined types.  According to Bjarne Stroustrup, the creator of C++, “if the term ‘object-oriented programming language’ means anything, it must mean a programming language that provides mechanisms that support the object-oriented style of programming well [10].” Writing good code is extremely difficult because it must account for how well people other than the original author of the code can read and understand what was written.The proper description of the interfaces available is extremely important, and allows a programmer to identify how to create a solution without delving into the actual code.
### Applications and Examples of Abstraction in Computing<strong> </strong>
However, the concept of abstraction by itself isn’t enough to product outstanding software.  Utilizing the right amount of abstraction when designing software is just as important as actually applying abstraction.  It should be used with caution and prudence.  Abstraction doesn’t evolve out of nothing and doesn’t always come naturally, as explained by Jeff Kramer of Imperial College in London.  Applying the right degree of abstraction, says he, “requires some degree of awareness and experience [5].”

Code that utilizes abstraction to separate its interfaces from implementation has a high degree of reusability [6], is easier to scale [7], and allows the possibility to provide a drop-in replacement which can be used to alter performance depending on the task at hand.  These facts define abstraction as an important fundamental concept in modern software.

Figure 1.0 illustrates this concept by abstracting a class used to describe a vehicle.  Note that implementation is not a concern at this point.  The crucial technical details (code) that make an air freighter work is not as important in abstracting this plane class as the fact, in this example, that the air freighter belongs to the plane class.  The plane class, in turn, is part of the class air vehicle, and therefore inherits the characteristics and features of that class.  Finally, an air vehicle class is a subset of a vehicle.
<img title="abstraction-of-car-structure" src="/images/blank.gif" data-echo="/content/uploads/2012/04/abstraction-of-car-structure.png" alt="" width="100%" />
**Figure 1.0.  The abstraction structure of vehicles [9].**

Once the vehicle class has been properly implemented, reusing it for, say, a land vehicle becomes very natural and intuitive.  Likewise, implementing a custom-made passenger aircraft would be a more manageable task once the plane class has been abstracted accurately.

Although the instructions contained in software source code are followed effortlessly by a machine, the development, maintenance, and cost of upgrades is retained by people.  Therefore, code needs to be readable and understandable by the programmers who deal with it.  By applying proper abstraction to the design and implementation phases of software development, the byproduct of such work is simpler to understand and maintain.  Not only is abstraction a key component of software development, but “abstraction is fundamental to mathematics and engineering in general” as well as “playing a critical part in the production of models for analysis and in the production of sound engineering solutions [4].”

Once a good technique is acquired, the tendency is for such technique to be used abundantly.  With abstraction, however, there are times when applying less abstraction yields the optimal solution.  Orit Hazzan hypothesized that by increasing the exposure a person has with an object, the more concrete that object is to the person [3].  By reducing abstraction, a person is able to focus more on the details related to solving the problem.  By this we can see that the abstraction requires experience to apply properly.   Dr.  Hazzan confirms: “The knowledge of [applying] different levels of abstraction does not, however, always come naturally, and requires some degree of awareness and experience [5].”

Simply being able to abstract the significant information is of great benefit; being able to separate the design from the different ways it may be implemented is an asset.  A logical outcome is that it simplifies debugging.  When a problem is clearly defined, even when only partially understood, the process of resolving such predicament is more directed and focused.  Debugging software that has been designed with a <em>sufficient</em> level of abstraction can be significantly simplified.  Matthias Zenger, from Google’s Research and Development team, explains how one might scale a system through abstract type members by hiding imperative information about the internal workings of the system, allowing a programmer to express the required components of a service through the use of an abstract pointer such as <em>this</em>.  He goes on to say that “both abstraction are scalable, in the sense that they can describe very small as well as very large components.  Scalability is ensured by the principle that the result of a composition should have the same fundamental properties as its constituents [7].
### Conclusion and Final Thoughts
Without proper abstraction and separation of data and the operations associated with them, starting a project with raw code is clearly counterproductive.  The use of abstraction in software development is important in designing, implementing, debugging, and understanding the logic upon which the program or system is built.

The evolution of software in computer science is accomplished by building upon existing research to produce new and innovative solutions.  The concepts established by this change are realized through the use of abstraction by creating a self-contained model for further application.  Without abstraction, software would continue to become exceedingly complex until it can no longer be maintained.  The future of this evolution will be achieved through further generalization of existing interfaces, the aggregation of data and modularization, all of which is made possible through abstraction.

Abstraction is what allows modern software to be written at a staggering scale.  This is what makes software modular, portable, replaceable, and readily tested independent of the original logic.  This evolution in computing sets it apart as a new paradigm and makes programming through the use of high level abstractions the new precursor for future innovative software design.
### Sources

 1. Berzins, V., Gray, M., and Naumann, D. 1986. Abstraction-based software development. Commun. ACM 29, 5 (May. 1986), 402-415. DOI= <a href="http://doi.acm.org/10.1145/5689.5691">http://doi.acm.org/10.1145/5689.5691</a>
 2. Cardelli, L. and Wegner, P. 1985. On understanding types, data abstraction, and polymorphism. ACM Comput. Surv. 17, 4 (Dec. 1985), 471-523. DOI= <a href="http://doi.acm.org/10.1145/6041.6042">http://doi.acm.org/10.1145/6041.6042</a>
 3. Hazzan, O. 2002. Reducing abstraction level when learning computability theory concepts. SIGCSE Bull. 34, 3 (Sep. 2002), 156-160. DOI= <a href="http://doi.acm.org/10.1145/637610.544461">http://doi.acm.org/10.1145/637610.544461</a>
 4. Kramer, J. 2007. Is abstraction the key to computing?. Commun. ACM 50, 4 (Apr. 2007), 36-42. DOI= <a href="http://doi.acm.org/10.1145/1232743.1232745">http://doi.acm.org/10.1145/1232743.1232745</a>
 5. Kramer, J. and Hazzan, O. 2006. The role of abstraction in software engineering. In Proceedings of the 2006 international Workshop on Role of Abstraction in Software Engineering (Shanghai, China, May 21 - 21, 2006). ROA '06. ACM, New York, NY, 1-2. DOI= <a href="http://doi.acm.org/10.1145/1137620.1137621">http://doi.acm.org/10.1145/1137620.1137621</a>
 6. Krueger, C. W. 1992. Software reuse. ACM Comput. Surv. 24, 2 (Jun. 1992), 131-183. DOI= <a href="http://doi.acm.org/10.1145/130844.130856">http://doi.acm.org/10.1145/130844.130856</a>
 7. Odersky, M. and Zenger, M. 2005. Scalable component abstractions. SIGPLAN Not. 40, 10 (Oct. 2005), 41-57. DOI= <a href="http://doi.acm.org/10.1145/1103845.1094815">http://doi.acm.org/10.1145/1103845.1094815</a>
 8. Perry, D. E. 2008. "Large" abstractions for software engineering. In Proceedings of the 2nd international Workshop on the Role of Abstraction in Software Engineering (Leipzig, Germany, May 11 - 11, 2008). ROA '08. ACM, New York, NY, 31-33. DOI= <a href="http://doi.acm.org/10.1145/1370164.1370172">http://doi.acm.org/10.1145/1370164.1370172</a>
 9. Smith, J. M. and Smith, D. C. 1977. Database abstractions: aggregation and generalization. <em>ACM Trans. Database Syst.</em> 2, 2 (Jun. 1977), 105-133. DOI= http://doi.acm.org/10.1145/320544.320546
 10. CITATION NEEDED (The C++ Programming Language - Third Edition)