---
layout: post
title: CS 238 Exploration 2
author: Rodrigo Silveira
---

I can't quite remember which course CS 238 was at BYU-Idaho, but I found this post in my archives. From what I can gather, I had posted this in order to collaborate with my mates for this assignment.  

## CS 238 Exploration 2
-----

Hey guys... Here's my code so far. Let me know if you have any questions about it.

## Display Results

Displays all the numbers in the proper format

    void Amortize::displayResults() {
    cout << endl <<
          "##############################################" << endl << endl;
    
       cout.precision(2);
       cout << setiosflags(ios::fixed) <<
          "      Principal: " << mPrincipal << endl <<
          "           Term: " << mTermInMonths << " months" << endl;
    
       cout.precision(3);
       cout <<
          "     Annual Rate " << mRate << "%" << endl;
    
       cout.precision(7);
       cout <<
          "   Periodic Rate " << mPeriodicRate << endl << endl;
    
       cout.precision(2);
       cout << setiosflags(ios::fixed) <<
    
          "Monthly Payment:   " << mMonthlyPayment << endl <<
          "  Extra Payment:   " << mExtraMonthlyPayment << endl << endl;
    
       cout << "   Reduced Term: "
             << reducedTerm << " months (shorter by "
             << shorterBy << " month(s) = " << (int)(shorterBy/12)
             << " year(s) " << shorterBy - ((int)(shorterBy/12) * 12)
             << " month(s))" << endl;
    
       cout << setiosflags(ios::fixed) <<
    
          " Total Payments: " << totalPayments << endl <<
          " Extra Payments:   " << extraPayments << endl <<
          " Total Interest:   " << totalInterest << endl <<
          "  Total Savings:   " << totalSavings << endl <<
          "  Intrst/Prncpl:   " << interest << "%" << endl;
    }

## Find Monthly Payments

Um... finds the monthly payments...
    /**
    * c = (rP)/(1-(1+r)^-n)
    * r = monthly rate
    * P = principal
    * n = term (monthly payments)
    */
    void Amortize::findMonthlyPayment()
    {
       mMonthlyPayment = (mPeriodicRate * mPrincipal)
                         / (1 - pow((1 + mPeriodicRate), -mTermInMonths));
    }

## Zero to Bool

A subtle wrapper that converts a string (if the string can be coerced into an int) to bool

    bool Amortize::zeroToBool(int val)
    {
       return val != 0;
    }

## Find Periodic Rate

Breaks the APR into the monthly rate

    void Amortize::findPeriodicRate()
    {
       // returns true if mRate is not zero
       if (zeroToBool(mRate))
       {
          mPeriodicRate = mRate / 1200;
          mHavePeriodicRate = true;
       }
    }
