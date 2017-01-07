---
layout: post
title: A Paper on Cleanroom Software Engineering
author: Rodrigo Silveira
---

The following is a paper I wrote originally as part of a school assignment during my work at Brigham Young University – Idaho. I attended BYU-I between 2010 and 2012, and ultimately earned by Bachelor’s degree in Computer Science.

## A Paper on Cleanroom Software Engineering
-----

## Cleanroom Software Engineering, by Rodrigo Silveira
<img src="/images/blank.gif" data-echo="/content/uploads/2012/04/ibm-cleanroom.jpg" alt="" width="100%" />
### Summary, history, and what it is
Two fundamental differences between computers and humans are that computers don’t forget, and computers don’t vary in the least when repeating an instruction. Thus, when a computer program is executed for the millionth time, the computer still remembers what to do, and does so exactly the same way as it did the first time. In this context, the only way a computer program may come to break, much like a physical machine will eventually break down after repeated use, is by having been built in a way that causes it to break. In other words, the reason a computer program fails is because it was constructed poorly, or better stated, lacking in precision.

In an attempt to prevent programs from being built poorly, or in other words, in an effort to build zero-defect software, Harlan Mills from IBM proposed the incremental Cleanroom software process in the early 1980s [2]. The name for this engineering method was inspired by the way silicon chips are built in the semiconductor industry. In order to prevent the introduction of low level pollutants into the chips, special contaminant-free environments called cleanrooms are used [7].

The goal of Cleanroom is to product is to produce software with no defects during development [7]. The philosophy is to get it right the first time [6]. The process promises to “dramatically improve the quality of software products by allowing their correctness to be formally verified. In order to use this technology, the design must be expressed in a formal representation and verification techniques must be used to verify the design is correct [3].”

The three major components of Cleanroom are software specification, design and code verification, and software quality verification [3]. The specification is intended to describe precisely what the program is to do, and how it is to behave [7]. For specification, the box structures approached is commonly used, where every system is represented by three different views, namely black box, state box, and clear box [4]. The black box view, as the name implies, only exposes its surface to the outside world. Everything inside it, including specific details of how things work under the hood, is kept abstracted out from the user. In other words, a black box behavior specification “precisely defines the inputs, outputs, and behavior of an object [7].” The state box view describes the data, while still maintaining the processing of the data as abstract as possible. Finally, the clear box view describes any algorithmic implementation and processes used [2].

Cleanroom relies on very rigorous activities such as formal correctness verification. The idea is that the problem to be solved is well understood, and the program is so thoroughly and precisely designed, that coding and testing activities have somewhat of a different meaning than they do in traditional software development. In other methodologies, coding is viewed as a way to satisfy the requirements by implementing the specified design. In cleanroom, coding is linked more closely to a translation of the detailed design into a language that can be executed by the machine [3]. Also, whereas testing is normally associated with an activity aimed at finding bugs and defects in software (as testing can never confirm the absence of bugs, but merely expose the presence of such), in Cleanroom testing is merely a means to “measure the quality of the developed software product, and not to test quality in [2].” Testing is the means to certify reliability in the software through statistical testing [3].

Recent examinations of Cleanroom attempt to justify the extreme level of software engineering prescribed by Cleanroom. Since the idea of Cleanroom is to use formal design methods to guarantee highly efficient code, programmers are not allowed to compile and test their own code. Instead, the testing process is completely separated from the development process [5]. It has been pointed out that when Mills proposed Cleanroom, “programming was ego intensive and idiosyncratic. Almost everything was sacrificed to supposed efficiency and memory conservation. There was no distinction between testing and debugging. Notions of what constituted effective testing were primitive compared to what we know today: the “best” testing was generally considered to be exhaustive testing of all possible inputs, which was obviously impractical and often theoretically impossible [1].” In other words, the testing discipline of the day was quite different than the maturing one we know today. Thus, it can be argued that Cleanroom takes things a bit to the extreme, which might be a valid explanation as to why the methodology hasn’t become the standard today.
### Advantages of Clearnroom in Software Engineering
There have been numerous projects and studies done on Cleanroom software engineering. As extreme as the method may seem, there are quite a few advantages to using Cleanroom, as opposed to any of the many alternatives to software development.

Some of the reported benefits experienced through the use of Cleanroom include such things as code verification being much faster, and a deeper understanding of the requirements, design, and code by all verifiers involved [3]. This can be explained by the extra effort on requirements and design, which is a distinguishing characteristic of Cleanroom. It can be easily seem that the more time one puts on coming up with a sound design, the less time one will spend translating such design into code. With code built upon such carefully crafted requirements and design, it follows that verifying said code should be more natural than if the design was vague and incorrect.

Another advantage of Cleanroom is that programs built with it are of higher quality than those built without it. The total amount of defects in a program produced in Cleanroom is significantly smaller. “Although it is theoretically impossible to ever know for certain that a software product has zero defects, it is possible to know that it has zero defects with high probability [4].” This high certainty about the low rate of defects in a program is attributed to the way that Cleanroom uses statistical usage testing. “Statistical reliability testing is based on the idea that, by testing software the way it is expected to be used, an accurate prediction of reliability can be made [2].”

Finally, a significant advantage of Cleanroom is that it can be implemented gradually [8]. While the activities involved in cleanroom are strict, and may seem overly severe, the methodology is incremental, and can be implemented in steps. This is a major plus because any overwhelming goal becomes instantly more manageable when it can be broken down into smaller, more realistic pieces.
### Disadvantages of Cleanroom Software Engineering
In contrast with some of the advantages of the Cleanroom methodology outlined above, there have been reports that Cleanroom is simply too hard. While great in theory, design verification is not always easy enough to justify the extra effort [8]. Similarly, the time it takes to train a team to the point where they are effective and efficient at verifying designs might be too long and expensive.

Other common disadvantages refer to Cleanroom being so out of the norm, and so extreme, that the required drastic change of culture might be too much for companies to handle [8]. Although most changes might seem too risky, and the benefits from changing too far out of reach, once the change is complete and the new is then the norm, the advantages might prove themselves worth the extra efforts. Still, some companies have shown hesitance to make the switch and commitment to Cleanroom. A common fear is that the change will be too drastic, and the resources required to adequately train their staff will be beyond the acceptable level [8]. Although the promised benefits might seem desirable, the perceived risk and challenge involved in attempting the methodology is a major factor that keeps companies from giving Cleanroom a try.
### Works Cited
1. Beizer, B.; , "Cleanroom process model: a critical examination," Software, IEEE , vol.14, no.2, pp.14-16, Mar/Apr 1997
doi: 10.1109/52.582968
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=582968&amp;isnumber=12658">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=582968&amp;isnumber=12658</a>

2. Deck, M.; Hines, B.E.; , "Cleanroom software engineering for flight systems: A preliminary report," Aerospace Conference, 1997. Proceedings., IEEE , vol.4, no., pp.329-347 vol.4, 1-8 Feb 1997
doi: 10.1109/AERO.1997.577519
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=577519&amp;isnumber=12521">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=577519&amp;isnumber=12521</a>

3. Highland, F.; Kornman, B.; , "The use of cleanroom methodology for knowledge based application development," Artificial Intelligence for Applications, 1993. Proceedings., Ninth Conference on , vol., no., pp.361-367, 1-5 Mar 1993
doi: 10.1109/CAIA.1993.366588
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=366588&amp;isnumber=8403">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=366588&amp;isnumber=8403</a>

4. Linger, R.C.; , "Cleanroom software engineering for zero-defect software," Software Engineering, 1993. Proceedings., 15th International Conference on , vol., no., pp.2-13, 17-21 May 1993
doi: 10.1109/ICSE.1993.346060
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=346060&amp;isnumber=8036">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=346060&amp;isnumber=8036</a>

5. Selby, R.W.; Basili, V.R.; Baker, F.T.; , "Cleanroom Software Development: An Empirical Evaluation," Software Engineering, IEEE Transactions on , vol.SE-13, no.9, pp. 1027- 1037, Sept. 1987
doi: 10.1109/TSE.1987.233525
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1702325&amp;isnumber=35891">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=1702325&amp;isnumber=35891</a>

6. Sherer, S.W.; Kouchakdjian, A.; Arnold, P.G.; , "Experience using cleanroom software engineering," Software, IEEE , vol.13, no.3, pp.69-76, May 1996
doi: 10.1109/52.493022
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=493022&amp;isnumber=10620">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=493022&amp;isnumber=10620</a>

7. Spangler, A.; , "Cleanroom software engineering-plan your work and work your plan in small increments," Potentials, IEEE , vol.15, no.4, pp.29-32, Oct/Nov 1996
doi: 10.1109/45.539962
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=539962&amp;isnumber=11598">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=539962&amp;isnumber=11598</a>

8. Trammell, C.J.; Hausler, P.A.; Galbraith, C.E.; , "Incremental implementation of cleanroom practices," System Sciences, 1992. Proceedings of the Twenty-Fifth Hawaii International Conference on , vol.ii, no., pp.437-448 vol.2, 7-10 Jan 1992
doi: 10.1109/HICSS.1992.183257
URL: <a href="http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=183257&amp;isnumber=4717">http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=183257&amp;isnumber=4717</a>