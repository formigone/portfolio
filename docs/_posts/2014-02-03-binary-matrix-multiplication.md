---
layout: post
title: Binary Matrix Multiplication
author: Rodrigo Silveira
---

I put this code together as part of my CS 238 class (Discrete Math 2). In our current exploration (project), we need to analyze binary (zero-one) matrices for certain properties. One of these properties is transitive. The easiest way to test if a binary matrix is transitive is to square the matrix (multiply it by itself), and see if the result is equal to the original. Pretty easy. 

## Binary Matrix Multiplication
-----

## How to Multiply a Binary Matrix

The strategy we'll use is super easy: Start performing matrix multiplication with the same matrix (adding the sum of a row with a column) to determine each element. Of course, since this is a binary (boolean) matrix, instead of multiplication, you will AND (boolean math) the elements, and instead of adding, you will OR the elements. After you've ANDed all the pairs, remember that having a single TRUE value will cause the entire OR operation to evaluate to TRUE. So as you're ANDing each pair, you can stop checking as soon as you find a TRUE value from the AND operation, and conclude that the resulting element is 1 (TRUE). If you never find a TRUE value from the ANDings, then by default the OR operation will be FALSE, so we don't even need to bother actually checking it.

Here's some sample code that you can use. This code sets up a 4x4 binary matrix (which is indeed transitive, by the way), then traverses it and display it to the screen, and at the same time take the product of it with itself (M x M). After that is done, if both matrices are equal, then the original matrix is in fact transitive.

    int boolProd()
    {
       bool m1[4][4] = { {1,1,0,0},
                         {1,1,0,0},
                         {1,0,1,1},
                         {0,0,0,1}
                      };
    
       // This is the resulting matrix
       bool m2[4][4];
    
       cout << "M1 = " << endl;
    
       /***************************************************
        * Matrix multiplication:
        *
        * M1 = [[a,b]    M2 = [[1,2]
        *       [c,d]]         [3,4]]
        *
        * M1 x M2 = [[(a1+b3), (a2+b4)
        *            [(c1+d3), (c2+d4)]]
        *
        * When multiplying binary matrices,
        * the product is found by the AND operation,
        * and the sum by the OR operation.
        * Thus, if a single TRUE value is found
        * while performing the AND operation,
        * the SUM (OR) will be TRUE no matter what,
        * since a singe TRUE value makes an OR evaluation
        * TRUE.
        ***************************************************/
    
       // Check every column
       for(int x = 0; x < 4; x++)
       {
          // Check every row
          for(int y = 0; y < 4; y++)
          {
             cout << setw(4) << m1[x][y];
    
             // Until proven innocent, the product is guilty (not free)
             bool sum = false;
    
             // Go through the entire row/column and check each element
             for(int j = 0; j < 4; j++)
             {
                // A single true is enough to make it all true
                if(m1[j][y] && m1[x][j])
                {
                   // Set the product to true
                   sum = true;
    
                   // No need to keep checking. Set the it free!
                   break;
                }
             }
    
             m2[x][y] = sum;
          }
    
          cout << endl;
       }
    
       cout << endl;
       cout << "M2 = " << endl;
       for(int x = 0; x < 4; x++)
       {
          for(int y = 0; y < 4; y++)
          {
             cout << setw(4) << m2[x][y];
          }
    
          cout << endl;
       }
    
       return 0;
    }

## Boolean Product

The output of this program is simple. It prints the matrix M1:

    1, 1, 0, 0
    1, 1, 0, 0
    0, 0, 1, 1
    0, 0, 1, 1

And the boolean product of M1 x M1, which in this case is equal to M1 (thus showing that M1 is transitive).
