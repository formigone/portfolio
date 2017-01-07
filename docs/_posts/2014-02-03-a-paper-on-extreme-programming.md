---
layout: post
title: A Paper on Extreme Programming
author: Rodrigo Silveira
---

The following is a paper I wrote originally as part of a school assignment during my work at Brigham Young University – Idaho. I attended BYU-I between 2010 and 2012, and ultimately earned by Bachelor’s degree in Computer Science

## A Paper on Extreme Programming
-----


## Extreme Programming, by Rodrigo Silveira
### Summary, history, and what it is
Extreme Programming is a software development method created by Kent Beck in 1996 [4, 6]. It is considered an incremental development method, meaning that a project is completed in small, incremental cycles, where more functionality is added to the software as the project progresses [2]. A typical cycle lasts between one and four weeks [3]. The method contrasts with the popular Waterfall life-cycle model for software development in that it focuses on producing code primarily, as opposed to producing documentation upon which to base the coding efforts [4]. Contrary to popular belief, however, Extreme Programming does focus in the production of complete and accurate documentation. The difference between documentation produced in a Waterfall approach and the documentation produced by Extreme Programming is that, while Waterfall provides careful documentation to guide coding efforts, Extreme Programming (XP) uses documentation as a means to explain and justify design decisions [7]. In other words, in XP, design documents “serve a different purpose. [They are] not [templates] or [blueprints] for future construction. Instead, [they] can be a guide for understanding why certain decisions were made. In this regard, [design documents are] a biography of the development, not a plan of action [7].”

Another focus of XP is involving the customer throughout the development process. Ideally, the customer is involved from the beginning of the development effort, and stays with the development team until the project is complete. That is, a “person or group who represents the users, [is/are] responsible for identifying the features (known as stories) that the programmers must implement, providing detailed acceptance tests for those stories and assigning priority to them [4].” Thus, the programmers become responsible for analyzing these stories, providing the customer with estimates regarding time and schedule related to the completion of each story [4]. Once an initial set of requirements have been identified and selected, the programmers implement these requirements within the specified time frame.

Other major characteristics of XP include its specific focus in the following activities: test-driven development, paired programming, accurate configuration management, customer involvement and collaboration, and refactoring of code [2, 8]. A description of each of these activities will follow.

Test-driven development is a method used to ensure that any code written to implement the user requirements is correctly written. That is, “engineers first write automated tests before building the production code [8].” As the code is written, and later modified or refactored, these automated tests ensure that customer requirements are still satisfied by the final code.

Paired programming, simply put, means that two programmers work on the same code, together, and at the same time. In other words, two programmers share one keyboard. “This concept encourages developers to code review (each other) all the time and removes some of a programmer bias towards his or her own code [2].”

Configuration management deals with monitoring and controlling changes in the software. Configuration management “allows for parallel development and reduces the risk of overwriting code [2].” With one of the main goals of Extreme Programming being the fast development of functional software, being able to modularize the various parts that make up the final product is fundamental to the successful achievement of this goal.

The purpose of involving the customer throughout the development process is to ensure that, not only is the software developed right, but also that the right software is developed. Better communication between developers and the customer means that both sides gain a better understanding of what is needed, what the process will be to produce the software to satisfy those needs, and constant and timely feedback enables the product to remain close to the needs of the customer [1].

Finally, code refactoring refers to the process of “improving the quality of the design or implementation of the system without changing its functionality [8].” That is, as the development process progresses, and new and subsequent stories are implemented, “older pieces of code are redesigned to fit to the new pieces that are under development. The idea is that less time is spent designing the system and more time is spent actually building the system [2].” It is important to note that “the process of refactoring should not become the dominant portion of the work being done on the project [2].”
### Advantages of Extreme Programming
The main advantages of Extreme Programming include, when properly and rigorously employed, paired programming, test-driven development, and refactoring. A brief description of each of these advantages will follow.

Ideally, when developing in pairs of programmers, “highly experienced and valuable team members can be paired with new, or inexperienced members. This allows the transfer of knowledge and experience throughout the project team, between pairs. This socialization process minimizes the need for extensive documentation [2].” Doing so also “leads to the efficient exchange of knowledge and experience between the team members. In this way, the risk of turnover is also reduced, since the knowledge about the system is distributed among the members of the team [5].”

The quality control aspect of XP is very advantageous in that it “promotes constant improvement of test coverage quality [1].” As mentioned earlier, instead of writing unit tests to verify and validate the code after some or all of the code has been written, “before adding code to the system, the programmers must write a failing unit test that the new code must make successful. This ensures that as the program grows, a copious suite of tests grows with it. These tests keep the quality of the software high and give the programmers the courage they need to continually rework the code into its simplest form [4].”

Thus, refactoring becomes a great advantage of XP. The idea of writing code that is expected to be reworked in the near future may be of concern to some, as redesigning and rewriting code can quickly lead to confusing, patch-based code. However, “XP is acutely sensitive to poor code quality and addresses it in several ways. First, XP demands simplicity from the programmers—they must leave the code in the simplest possible state that passes all the acceptance tests. Thus, when code is reworked from iteration to iteration, it is also continually reduced to the simplest state the programmers can find [4].” A study comparing Extreme Programming and Waterfall projects revealed that programmers using XP ended up writing a higher “percentage of comments in the source code [7].”
### Disadvantages of Extreme Programming
With one of the main features of XP being the close communication between the customer and the development team, as well as internal communication between team members, one disadvantage of XP is difficulty outsourcing parts of a project to groups of developers physically separated from each other [9]. “The success of an Extreme Programming team relies on a shared common set of values and principles, such as coding standards, test-driven development, and refactoring. However, the specifics of these principles and values can be interpreted differently by each individual. This makes it difficult to outsource portions of a project because physically separating team members makes communication more difficult [9].”

Another disadvantage of XP is the way the method is designed to address change. While anticipating and managing changes are keys point in successful in software development, Extreme Programming takes this too far by placing the responsibility of choosing what features to implement, modify, or remove from a system completely on the hands of the customer [4]. Thus, the development team must follow the dictates of the customer in implementing stories, and working and reworking the code base. Doing so can ultimately lead to “stagnation, [modifying] the finished work, and even [abandoning] the finished work in some cases, and [increasing] the workload, [undermining] the project plan, and [extending] the project cycle [6].”

Finally, since planning for implementation of a particular cycle doesn’t extend beyond that particular development cycle, some programmers may find themselves “spending a lot of time changing the architecture so that [they] can implement the next phase [2].” This can be especially expensive if work done in a particular cycle is found to be an inappropriate foundation for the features expected for a cycle several iterations in the future. This means that a lot more than just a trivial amount of infrastructure and functionality must be changed. Thus, the longer an earlier poor implementation remains undiscovered, the more expensive it becomes to fix it.

### Works Cited

1. Choudhari, J.; Suman, U.; , "Iterative Maintenance Life Cycle Using eXtreme Programming," Advances in Recent Technologies in Communication and Computing (ARTCom), 2010 International Conference on , vol., no., pp.401-403, 16-17 Oct. 2010
doi: 10.1109/ARTCom.2010.52
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=5655582&amp;isnumber=5655294">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=5655582&amp;isnumber=5655294</a>

2. Kivi, J.; Haydon, D.; Hayes, J.; Schneider, R.; Succi, G.; , "Extreme programming: a university team design experience," Electrical and Computer Engineering, 2000 Canadian Conference on , vol.2, no., pp.816-820 vol.2, 2000
doi: 10.1109/CCECE.2000.849579
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=849579&amp;isnumber=18402">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=849579&amp;isnumber=18402</a>

3. Macias, F.; Holcombe, M.; Gheorghe, M.; , "A formal experiment comparing extreme programming with traditional software construction," Computer Science, 2003. ENC 2003. Proceedings of the Fourth Mexican International Conference on , vol., no., pp. 73- 80, 8-12 Sept. 2003
doi: 10.1109/ENC.2003.1232877
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1232877&amp;isnumber=27628">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1232877&amp;isnumber=27628</a>

4. Martin, R.C.; , "eXtreme Programming development through dialog," Software, IEEE , vol.17, no.4, pp.12-13, Jul/Aug 2000
doi: 10.1109/52.854062
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=854062&amp;isnumber=18557">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=854062&amp;isnumber=18557</a>

5. Succi, G.; Stefanovic, M.; Pedrycz, W.; , "Quantitative assessment of extreme programming practices," Electrical and Computer Engineering, 2001. Canadian Conference on , vol.1, no., pp.81-86 vol.1, 2001
doi: 10.1109/CCECE.2001.933661
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=933661&amp;isnumber=20196">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=933661&amp;isnumber=20196</a>

6. Li-li, Zhai; Lian-feng, Hong; Qin-ying, Sun; , "Research on Requirement for High-quality Model of Extreme Programming," Information Management, Innovation Management and Industrial Engineering (ICIII), 2011 International Conference on , vol.1, no., pp.518-522, 26-27 Nov. 2011
doi: 10.1109/ICIII.2011.132
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=6115089&amp;isnumber=6114614">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=6115089&amp;isnumber=6114614</a>

7. Sedano, T.; Feng Ji; , "Comparing extreme programming and Waterfall project results," Software Engineering Education and Training (CSEE&amp;T), 2011 24th IEEE-CS Conference on , vol., no., pp.482-486, 22-24 May 2011
doi: 10.1109/CSEET.2011.5876129
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=5876129&amp;isnumber=5876072">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=5876129&amp;isnumber=5876072</a>

8. Wellington, C.A.; , "Managing a project course using Extreme Programming," Frontiers in Education, 2005. FIE '05. Proceedings 35th Annual Conference , vol., no., pp.T3G-1, 19-22 Oct. 2005
doi: 10.1109/FIE.2005.1611948
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1611948&amp;isnumber=33854">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1611948&amp;isnumber=33854</a>

9. Yap, M.; , "Follow the sun: distributed extreme programming development," Agile Conference, 2005. Proceedings , vol., no., pp. 218- 224, 24-29 July 2005
doi: 10.1109/ADC.2005.26
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1609825&amp;isnumber=33795">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1609825&amp;isnumber=33795</a>