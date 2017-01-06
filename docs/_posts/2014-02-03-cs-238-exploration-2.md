---
layout: post
title: CS 238 Exploration 2
author: Rodrigo Silveira
---

Hey guys... Here's my code so far. Let me know if you have any questions about it.

## CS 238 Exploration 2
-----

Hey guys... Here's my code so far. Let me know if you have any questions about it.
<h2>Display Results</h2>
Displays all the numbers in the proper format
<pre class="i_code">void Amortize::displayResults() {
cout &lt;&lt; endl &lt;&lt;
      "##############################################" &lt;&lt; endl &lt;&lt; endl;

   cout.precision(2);
   cout &lt;&lt; setiosflags(ios::fixed) &lt;&lt;
      "      Principal: " &lt;&lt; mPrincipal &lt;&lt; endl &lt;&lt;
      "           Term: " &lt;&lt; mTermInMonths &lt;&lt; " months" &lt;&lt; endl;

   cout.precision(3);
   cout &lt;&lt;
      "     Annual Rate " &lt;&lt; mRate &lt;&lt; "%" &lt;&lt; endl;

   cout.precision(7);
   cout &lt;&lt;
      "   Periodic Rate " &lt;&lt; mPeriodicRate &lt;&lt; endl &lt;&lt; endl;

   cout.precision(2);
   cout &lt;&lt; setiosflags(ios::fixed) &lt;&lt;

      "Monthly Payment:   " &lt;&lt; mMonthlyPayment &lt;&lt; endl &lt;&lt;
      "  Extra Payment:   " &lt;&lt; mExtraMonthlyPayment &lt;&lt; endl &lt;&lt; endl;

   cout &lt;&lt; "   Reduced Term: "
         &lt;&lt; reducedTerm &lt;&lt; " months (shorter by "
         &lt;&lt; shorterBy &lt;&lt; " month(s) = " &lt;&lt; (int)(shorterBy/12)
         &lt;&lt; " year(s) " &lt;&lt; shorterBy - ((int)(shorterBy/12) * 12)
         &lt;&lt; " month(s))" &lt;&lt; endl;

   cout &lt;&lt; setiosflags(ios::fixed) &lt;&lt;

      " Total Payments: " &lt;&lt; totalPayments &lt;&lt; endl &lt;&lt;
      " Extra Payments:   " &lt;&lt; extraPayments &lt;&lt; endl &lt;&lt;
      " Total Interest:   " &lt;&lt; totalInterest &lt;&lt; endl &lt;&lt;
      "  Total Savings:   " &lt;&lt; totalSavings &lt;&lt; endl &lt;&lt;
      "  Intrst/Prncpl:   " &lt;&lt; interest &lt;&lt; "%" &lt;&lt; endl;
}</pre>
<h2>Find Monthly Payments</h2>
Um... finds the monthly payments...
<pre class="i_code">/**
* c = (rP)/(1-(1+r)^-n)
* r = monthly rate
* P = principal
* n = term (monthly payments)
*/
void Amortize::findMonthlyPayment()
{
   mMonthlyPayment = (mPeriodicRate * mPrincipal)
                     / (1 - pow((1 + mPeriodicRate), -mTermInMonths));
}</pre>
<h2>Zero to Bool</h2>
A subtle wrapper that converts a string (if the string can be coerced into an int) to bool
<pre class="i_code">bool Amortize::zeroToBool(int val)
{
   return val != 0;
}</pre>
<h2>Find Periodic Rate</h2>
Breaks the APR into the monthly rate
<pre class="i_code">void Amortize::findPeriodicRate()
{
   // returns true if mRate is not zero
   if (zeroToBool(mRate))
   {
      mPeriodicRate = mRate / 1200;
      mHavePeriodicRate = true;
   }
}</pre>