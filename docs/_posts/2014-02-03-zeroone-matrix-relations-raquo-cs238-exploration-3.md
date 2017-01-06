---
layout: post
title: Zero-one Matrix Relations &raquo; CS238 Exploration 3
author: Rodrigo Silveira
---

The purpose of this exploration is for you to explore and enhance an implementation of a representation of relations to discover their basic properties.

## Zero-one Matrix Relations &raquo; CS238 Exploration 3
-----

The purpose of this exploration is for you to explore and enhance an implementation of a representation of relations to discover their basic properties.
<h2>Requirements</h2>
Write a C++ program that takes inputs which are ﬁles containing connection (zero-one) matrices of binary
relations of a set with itself. Determine which properties each relation has. Start with the stub code supplied. Add your code and submit the ﬁle with the same name (relations.cpp). If conditions are right, you can build and test your code in the Linux Lab via the command: <em>make it just so</em>
<h2>What the code does so far</h2>
So far my code does the following:
<ul>
	<li>Determines if <strong>reflexive</strong>, <strong>irreflexive</strong>, and <strong>nonreflexive</strong></li>
</ul>
The way I'm determining reflexiveness is by storing the sum of the main diagonal (mSumOfDiagonal) in a member variable. Then the check for reflexiveness is simple:

<pre class="i_code">
bool isReflexive()
{
   // TRUE if diagonal is all 1
   return mSumOfDiagonal == mSize;
}
</pre>

Check for irreflexiveness is equally obvious:

<pre class="i_code">
bool isIrreflexive()
{
   // TRUE if diagonal is all 0
   return mSumOfDiagonal == 0;
}
</pre>

Finally, test for nonreflexive (main diagonal has 1s and 0s in it) is equally simple:

<pre class="i_code">
bool isNonreflexive()
{
   // TRUE if diagonal is all 1
   return !isReflexive() &amp;&amp; !isIrreflexive;
}
</pre>
<h1>The rest of the code</h1>

<pre  class="i_code">
class Relation operator*(Relation&amp; r1, Relation&amp; r2);

class Relation
{
private:
   bool** mMatrix;
   int mSize;
   int mSumOfDiagonal;

   void init()
   {
      mMatrix = new bool*[mSize];
      for (int i = 0; i &lt; mSize; i++)
      {
         mMatrix[i] = new bool[mSize];
      }
   }

public:
   Relation(int size)
   {
      mSize = size;
      mSumOfDiagonal = 0;
      init();
   }

   Relation&amp; operator=(const Relation&amp; rtSide)
   {
      if (this == &amp;rtSide)
      {
         return *this;
      }
      else
      {
         mSize = rtSide.mSize;
         for (int i = 0; i &lt; mSize; i++)
         {
            delete [] mMatrix[i];
         }
         delete [] mMatrix;
         init();
         for (int x = 0; x &lt; mSize; x++)
         {
            for (int y = 0; y &lt; mSize; y++)
            {
               mMatrix[x][y] = rtSide[x][y];
            }
         }
      }
      return *this;
   }

   Relation(const Relation&amp; relation)
   {
      mSize = relation.getConnectionMatrixSize();
      init();
      *this = relation;
   }

   ~Relation()
   {
      for (int i = 0; i &lt; mSize; i++)
      {
         delete [] mMatrix[i];
      }
      delete [] mMatrix;
   }

   int getConnectionMatrixSize() const
   {
      return mSize;
   }

   bool* operator[](int row) const
   {
      return mMatrix[row];
   }

   bool operator==(const Relation&amp; relation)
   {
      int size = relation.getConnectionMatrixSize();
      if (mSize != size)
      {
         return false;
      }
      for (int i = 0; i &lt; size; i++)
      {
         for (int j = 0; j &lt; size; j++)
         {
            if (mMatrix[i][j] != relation[i][j])
            {
               return false;
            }
         }
      }
      return true;
   }

   bool isReflexive();
   bool isIrreflexive();
   bool isNonreflexive();
   bool isSymmetric();
   bool isAntisymmetric();
   bool isAsymmetric();
   bool isTransitive();
   void describe();

   // Rodrigo's touch
   int sumOfDiagonal();
};

ostream&amp; operator&lt;&lt;(ostream&amp; os, const Relation&amp; relation)
{
   int n = relation.getConnectionMatrixSize();
   for (int i = 0; i &lt; n; i++)
   {
      for (int j = 0; j &lt; n; j++)
      {
         os &lt;&lt; relation[i][j] &lt;&lt; " ";
      }
      os &lt;&lt; endl;
   }
   return os;
}

istream&amp; operator&gt;&gt;(istream&amp; is, Relation&amp; relation)
{
   int n = relation.getConnectionMatrixSize();
   for (int i = 0; i &lt; n; i++)
   {
      for (int j = 0; j &lt; n; j++)
      {
         is &gt;&gt; relation[i][j];
      }
   }
   return is;
}

void Relation::describe()
{
   mSumOfDiagonal = sumOfDiagonal();

   cout &lt;&lt; "\nThe relation represented by the " 
        &lt;&lt; mSize &lt;&lt; "x" &lt;&lt; mSize &lt;&lt; " matrix\n";
   cout &lt;&lt; *this &lt;&lt; "is\n";
   cout &lt;&lt; (isReflexive() ? "" : "NOT ") &lt;&lt; "Reflexive;\n";
   cout &lt;&lt; (isIrreflexive() ? "" : "NOT ") &lt;&lt; "Irreflexive;\n";
   cout &lt;&lt; (isNonreflexive() ? "" : "NOT ") &lt;&lt; "Nonreflexive;\n";
   cout &lt;&lt; (isSymmetric() ? "" : "NOT ") &lt;&lt; "Symmetric;\n";
   cout &lt;&lt; (isAntisymmetric() ? "" : "NOT ") &lt;&lt; "Antisymmetric;\n";
   cout &lt;&lt; (isAsymmetric() ? "" : "NOT ") &lt;&lt; "Asymmetric; and\n";
   cout &lt;&lt; (isTransitive() ? "" : "NOT ") &lt;&lt; "Transitive.\n";
}

/******************************************************
*
* MAIN
*
******************************************************/
int main(int argc, char* argv[])
{
   // __DEBUG__
   argc = 2;
   argv[1] = "../relations/16.15";
   argv[1] = "../relations/16.08";
   argv[1] = "../relations/8.3.32.b";
   // __DEBUG__

   for (int i = 1; i &lt; argc; i++)
   {
      string file = argv[i];
      ifstream inFile(file.c_str());

      if (inFile.is_open())
      {
         int size;
         inFile &gt;&gt; size;
         Relation relation(size);
         inFile &gt;&gt; relation;
         inFile.close();
         relation.describe();
      }
      else
      {
         cout &lt;&lt; "Unable to open " + file;
      }
   }

   return 0;
}

int Relation::sumOfDiagonal()
{
   int sumOfDiagonal = 0;

   // Go through every column
   for(int y = 0; y &lt; mSize; y++)

      // Go through every row
      for(int x = 0; x &lt; mSize; x++)

         // Sum the elements in the main diagonal
         if(x == y)
            sumOfDiagonal += mMatrix[x][y];

cout &lt;&lt; sumOfDiagonal &lt;&lt; endl;
   return sumOfDiagonal;
}

/******************************************************
*
* IS REFLEXIVE
*
* TRUE if main diagonal is all 1. In other words, TRUE
*      when sum of main diagonal is the same as the
*      size of the matrix (4x4 has size of 4)
*
******************************************************/
bool Relation::isReflexive()
{
   return mSumOfDiagonal == mSize;
}

/******************************************************
*
* IS IRREFLEXIVE
*
* TRUE if main diagonal is all 0. In other words, TRUE
*      when sum of main diagonal is zero
*
******************************************************/
bool Relation::isIrreflexive()
{
   return mSumOfDiagonal == 0;
}

/******************************************************
*
* IS NON REFLEXIVE
*
* TRUE if matrix is neither reflexive or irreflexive
*
******************************************************/
bool Relation::isNonreflexive()
{
   return !isIrreflexive() &amp;&amp; !isReflexive();
}

/******************************************************
*
* IS SYMMETRIC
*
******************************************************/
bool Relation::isSymmetric()
{
   return false;
}

/******************************************************
*
* IS ANTISYMMETRIC
*
******************************************************/
bool Relation::isAntisymmetric()
{
   return false;
}

/******************************************************
*
* IS ASYMMETRIC
*
******************************************************/
bool Relation::isAsymmetric()
{
   return false;
}

/******************************************************
*
* IS TRANSITIVE
*
******************************************************/
bool Relation::isTransitive()
{
   return false;
}
</pre>