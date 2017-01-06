---
layout: post
title: CS 238 Exploration 2 - Slight Progress
author: Rodrigo Silveira
---

<p>This calculates the total payments with the extra payments, but it's not using the start and end dates for the extra payments (as optional parameters passed into the app).</p>

## CS 238 Exploration 2 - Slight Progress
-----

<p>This calculates the total payments with the extra payments, but it's not using the start and end dates for the extra payments (as optional parameters passed into the app).</p>
<p>There's an earlier post with <a href="http://rodrigo-silveira.com/cs-238-exploration-2/">some code</a> if you're interested, even though the following is more complete.</p>

<pre class="i_code">

/****************************************************************
 * Program:
 *    Exploration 2, Recurrence
 *    Brother Neff, CS 238
 * Author:
 *    Rodrigo Silveira
 * Summary:
 *    Amortization Program, exploring a practical recurrence relation.
 ***********************************************************************/
#include <cmath>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <streambuf>
#include <iomanip>
#include <sstream>
#include <vector>
using namespace std;

#include "properties.h"


/***********************************************************************
 * See http://www.drcalculator.com/mortgage/ for one example of an
 * online mortgage calculator that works better in many ways.
 ***********************************************************************/
class Amortize
{
private:
   int reducedTerm;
   int shorterBy;
   float totalPayments;
   float extraPayments;
   float totalInterest;
   float totalSavings;
   float interest;

   double mPrincipal; // principal (p)

   int mTermInMonths; // term in months (n)

   double mRate; // annual interest rate (r)

   double mPeriodicRate; // periodic (monthly) rate (i)

   double mMonthlyPayment; // monthly payment (m)

   double mExtraMonthlyPayment; // extra monthly payment (x)

   bool mShowAmortizationSchedule; // verbose (v)

   int mStart; // extra payment starting month number (s)

   int mEnd; // extra payment ending month number (e)

   bool mHavePrincipal;

   bool mHavePeriodicRate;

   bool mHaveTermInMonths;

   bool mHaveMonthlyPayment;

   /***********************************************************************
    * Find p given i, m, n.
    ***********************************************************************/
   void findPrincipal();

   /***********************************************************************
    * Find i given p, m, n.
    ***********************************************************************/
   void findPeriodicRate();

   /***********************************************************************
    * Find m given p, i, n.
    ***********************************************************************/
   void findMonthlyPayment();

   /***********************************************************************
    * Find n given p, i, m.
    ***********************************************************************/
   void findTermInMonths();

   /***********************************************************************
    * Find all missing parameters.
    ***********************************************************************/
   bool findAll()
   {
      if (!mHavePrincipal && mHaveMonthlyPayment &&
          mHavePeriodicRate && mHaveTermInMonths)
      {
         findPrincipal();
         mHavePrincipal = true;
      }
      if (!mHavePeriodicRate && mHavePrincipal &&
          mHaveMonthlyPayment && mHaveTermInMonths)
      {
         findPeriodicRate();
         mHavePeriodicRate = true;
      }
      if (!mHaveTermInMonths && mHavePrincipal &&
          mHaveMonthlyPayment && mHavePeriodicRate)
      {
         findTermInMonths();
         mHaveTermInMonths = true;
      }
      if (!mHaveMonthlyPayment && mHavePrincipal &&
          mHavePeriodicRate && mHaveTermInMonths)
      {
         findMonthlyPayment();
         mHaveMonthlyPayment = true;
      }

      return (mHavePrincipal && mHaveMonthlyPayment &&
              mHavePeriodicRate && mHaveTermInMonths);
   }

   bool zeroToBool(int val);
   void findTotalPayments();
   void printAll();
   void printPretty();

public:
   Amortize();
   void run();
};

// DO NOT CHANGE ANYTHING BELOW THIS LINE!

/****************************************************************
 * Main reads command-line argument(s) as follows:
 *
 *  Name of a file containing parameter settings, or
 *  (3 of the following 4 parameters are required)
 *
 *      p= principal (amount loaned)
 *      n= term in months (number of payments)
 *      r= annual interest rate (in percent)
 *      m= monthly payment amount
 *
 *      v= (optional) 1 = view amortization schedule
 *      x= (optional) extra monthly payment
 *      s= (optional) month extra payment starts
 *      e= (optional) month extra payment ends (default = n)
 ****************************************************************/
int main(int argc, char* argv[])
{
//   argc = 2;
//   argv[1] = "C:/Users/Rokko/byui/cs238/exploration2/recurrence/amortize.2";
   if (argc <= 1)
   {
      cout << "Usage: " << argv[0] << " <filename> or <parameters>" << endl;
      return 0;
   }

   if (argc == 2)
   {
      const char* filename = argv[1];
      string data;
      ifstream ifs(filename, ios_base::in);

      if (ifs)
      {
         while (true)
         {
            ifs >> data;

            if (ifs.eof() || ifs.fail())
            {
               break;
            }
            System.setProperty(data);
         }
         ifs.close();
      }
   }
   else
   {
      for (int i = 1; i < argc; i++)
      {
         string data = argv[i];
         System.setProperty(data);
      }
   }

   Amortize().run();

   return 0;
}


Amortize::Amortize()
{
   mHavePrincipal = System.getProperty("p", "") == "" ? false : true;
   mHavePeriodicRate = System.getProperty("r", "") == "" ? false : true;
   mHaveTermInMonths = System.getProperty("n", "") == "" ? false : true;
   mHaveMonthlyPayment = System.getProperty("m", "") == "" ? false : true;

   mPrincipal = mHavePrincipal ?
      atof(System.getProperty("p", "").c_str()) : 0;

   mTermInMonths = mHaveTermInMonths ?
      atoi(System.getProperty("n", "").c_str()) : 0;

   mRate = mHavePeriodicRate ?
      atof(System.getProperty("r", "").c_str()) : 0;

   mMonthlyPayment = mHaveMonthlyPayment ?
      atof(System.getProperty("m", "").c_str()) : 0;

   mPeriodicRate = mRate / 1200;

   mExtraMonthlyPayment = System.getProperty("x", "") == "" ?
      0 : atof(System.getProperty("x", "").c_str());

   mEnd = System.getProperty("e", "") == "" ?
      mTermInMonths : atof(System.getProperty("e", "").c_str());

   mStart = System.getProperty("s", "") == "" ?
      0 : atof(System.getProperty("s", "").c_str());

   reducedTerm = 0;
   shorterBy = 0;
   totalPayments = 0.0;
   extraPayments = 0.0;
   totalInterest = 0.0;
   totalSavings = 0.0;
   interest = 0.0;
}

void Amortize::run()
{
   findAll();

   //
   // since these values will change in findTotalPayments, let's save
   // them for now, so we can print these original values later (in printPretty)
   //
   double tempPrincipal = mPrincipal;
   int tempTermInMonths = mTermInMonths;
   double tempRate = mRate;
   double tempMonthlyPayment = mMonthlyPayment;
   double tempPeriodicRate = mPeriodicRate;

   findTotalPayments();

   mPrincipal = tempPrincipal;
   mTermInMonths = tempTermInMonths;
   mRate = tempRate;
   mMonthlyPayment = tempMonthlyPayment;
   mPeriodicRate = tempPeriodicRate;

   printPretty();
}

void Amortize::findPrincipal()
{
   // I'm updating the principal in ::findTotalPayments...
}


void Amortize::findPeriodicRate()
{
   if (zeroToBool(mRate))
   {
      mPeriodicRate = mRate / 1200;
      mHavePeriodicRate = true;
   }
}

/**
* c = (rP)/(1-(1+r)^-n)
* r = monthly rate
* P = principal
* n = term (monthly payments)
*/
void Amortize::findMonthlyPayment()
{
   mMonthlyPayment = (mPeriodicRate * mPrincipal) / (1 - pow((1 + mPeriodicRate), -mTermInMonths));
}


void Amortize::findTermInMonths()
{
   mTermInMonths = -log(
         (
            (mPrincipal - (mMonthlyPayment / mPeriodicRate)) /
            (1 - (mMonthlyPayment / mPeriodicRate))
         ) /
         log(1 + mPeriodicRate)
      );
}


/**
 * Wrapper function
 * Just saves a few keystrokes and repetitive conditionals
 */
bool Amortize::zeroToBool(int val)
{
   return val != 0;
}


/**
 * Debug function
 * Prints all the numbers and stuff...
 */
void Amortize::printAll()
{
   cout << "mPrincipal = " << mPrincipal << endl;
   cout << "mHavePrincipal = " << mHavePrincipal << endl;

   cout << "mTermInMonths = " << mTermInMonths << endl;

   cout << "mRate = " << mRate << endl;

   cout << "mPeriodicRate = " << mPeriodicRate << endl;

   cout << "mMonthlyPayment = " << mMonthlyPayment << endl;

   cout << "mExtraMonthlyPayment = " << mExtraMonthlyPayment << endl;

   cout << "mShowAmortizationSchedule = " << mShowAmortizationSchedule << endl;

   cout << "mStart = " << mStart << endl;

   cout << "mEnd = " << mEnd << endl;

   cout << "mHavePeriodicRate = " << mHavePeriodicRate << endl;

   cout << "mHaveTermInMonths = " << mHaveTermInMonths << endl;

   cout << "mHaveMonthlyPayment = " << mHaveMonthlyPayment << endl;
}

void Amortize::printPretty()
{
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

   cout << "   Reduced Term: " << reducedTerm << " months (shorter by " <<
                              shorterBy << " month(s) = " << (int)(shorterBy/12) <<
                              " year(s) " << shorterBy - ((int)(shorterBy/12) * 12) <<
                              " month(s))" << endl;

   cout << setiosflags(ios::fixed) <<

      " Total Payments: " << totalPayments << endl <<
      " Extra Payments:  " << extraPayments << endl <<
      " Total Interest:  " << totalInterest << endl <<
      "  Total Savings:  " << totalSavings << endl <<
      "  Intrst/Prncpl:  " << interest << "%" << endl;
}

/**
 * This makes monthly payments until the balance goes down to zero.
 * This is done by:
 *    1. Finding amount due for the month
 *    2. Making a monthly payment by first paying towards the interest,
 *       then paying the balance against the principal.
 *    3. Principal is recuded accordingly.
 *
 * Known issues:
 *    This does not take the extra payment flags into account. The
 *    extra payments must start and end on the monts indicated by
 *    the [optional] parameters s and e. This implementation
 *    makes extra payments from month 0 to end whenever x is
 *    present.
 *
 *    This does not calculate:
 *        1. Total Savings
 *        2. Intrst/Prncpl
 *
 * Any questions, contact me at <a href="mailto:rodrixar@gmail.com">rodrixar@gmail.com</a> or txt @ 8015103813
 */
void Amortize::findTotalPayments()
{
   int termsPaid = 0;
   double totalExtraPayments = 0;
   double originalPrincipal = mPrincipal;
   bool donePaying = false;

   while (!donePaying)
   {
      findMonthlyPayment();
      findPeriodicRate();

      double paymentMadeThisMonth = (mMonthlyPayment + mExtraMonthlyPayment) - (mPeriodicRate * mPrincipal);

      if (mPrincipal - paymentMadeThisMonth < 0)
      {
         donePaying = true;
         continue;
      }

      mPrincipal -= paymentMadeThisMonth;

      totalPayments += mMonthlyPayment + mExtraMonthlyPayment;
      termsPaid++;
      totalExtraPayments += mExtraMonthlyPayment;
   }

   reducedTerm = termsPaid;
   shorterBy = mTermInMonths - reducedTerm;
   extraPayments = totalExtraPayments;
   totalInterest = totalPayments - originalPrincipal;
}
</pre>

<h2>Share the love</h2>
<p>If you make further progress before this is due, let me know =) </p>