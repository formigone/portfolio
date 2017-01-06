---
layout: post
title: OpenGL Tutorial Part 1 Parsing OBJ File From Blender
author: Rodrigo Silveira
---

Lately I've been trying to learn OpenGL, shaders, and that soft of stuff. The more I learn about it, the more I get excited about it. My ultimate goal is to get familiar enough with OpenGL and make the slight move into WebGL. I want to learn how to bust out some awesome 3D graphics, games, etc., without the need to use those WebGL frameworks like <a href="http://www.aerotwist.com/tutorials/getting-started-with-three-js/" target="_blank">Three.js</a>. So To get things started, I wrote this simple program that parses out an OBJ file exported from <a href="http://www.blender.org" target="_blank">Blender</a>. There are no colors or textures so far, so the model might look a bit incomplete. My goal for the next few weeks is to master lighting and add that to my model, as well as some textures and such.

## OpenGL Tutorial Part 1 Parsing OBJ File From Blender
-----

Lately I've been trying to learn OpenGL, shaders, and that soft of stuff. The more I learn about it, the more I get excited about it. My ultimate goal is to get familiar enough with OpenGL and make the slight move into WebGL. I want to learn how to bust out some awesome 3D graphics, games, etc., without the need to use those WebGL frameworks like <a href="http://www.aerotwist.com/tutorials/getting-started-with-three-js/" target="_blank">Three.js</a>. So To get things started, I wrote this simple program that parses out an OBJ file exported from <a href="http://www.blender.org" target="_blank">Blender</a>. There are no colors or textures so far, so the model might look a bit incomplete. My goal for the next few weeks is to master lighting and add that to my model, as well as some textures and such.

<iframe src="http://www.youtube.com/embed/UWxp3FC2eNc" frameborder="0" width="560" height="315"></iframe>

To help me stay motivated about this, I decided to record a quick screencast to show what I have so far, but also so hopefully there will be some people asking enough questions and requesting enough help, that I'll have the extra reason to continue learning.

<h1>How to read the OBJ file</h1>
To extract the data form the OBJ file, you need to do the following:

Loop through each line inside your C++ script and look for lines that start with -v -vt -vn and -f

-v = Coordinates for the vertex. This could be two numbers or three numbers. Numbers are separated by a white space

-vt = UV coordinate. There will always be two values here.

-vn = Normal coordinates. Again, there will always be three numbers here

-f = Faces. This is a bit tricky. The faces are in a format like this: 1/2/3 (three integers, separated by a slash), where the first number is the index in the vertices array, the second if the index of the texture coordinate,and the last number is the index within the normals array. The trick is that a face can be in one of the following formats:

1// (only points to a vertex)
1//1 (links a vertex to a normal)
1/1/1 (has all three)

So when you parse that out, keep that in mind.

So in your C++ code, you will need to keep an array for each of those elements (vertices, normals, and UV coordinates). I find it easier to store those in a STL vector, but you can implement it in many ways.

<h1>My C++ OBJ Parser</h1>

There are three files that make up my parser. I'll add detail to explain it as needed, so be sure to post your questions and comments. The files are main.cpp, RokkoParser.h, and its implementation in RokkoParser.cpp.
<h3>main.cpp</h3>
<div class="i_code"><pre>#include <iostream>
#include <string>
#include "RokkoParser.h"

using namespace std;

int main(int argc, char** argv)
{
   if(argc < 3)
      cout << "Usage: " << argv[0] 
           << " [output filename] [input filename] [0|1 = verbose]" 
           << endl;

   string obj_filename;
   string out_filename;

   if(argc > 2)
   {
      out_filename = argv[2];
   }
   else
   {
      cout << "Enter name of output file: ";
      getline(cin, out_filename);
   }

   if(argc > 1)
   {
      out_filename = argv[1];
   }
   else
   {
      cout << "Enter name of input file: ";
      getline(cin, obj_filename);
   }

   bool verbose = false;
   if(argc > 3)
      if(argv[3][0] != '0')
         verbose = true;

   RokkoParser::objToTxt(obj_filename, out_filename, verbose);

   return 0;
}</pre></div>

<h3>RokkoParser.h</h3>
<div class="i_code"><pre>#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <map>

using namespace std;

class RokkoParser
{

public:
   static void objToTxt(const string aInFilename, 
                        const string aOutFilename, 
                        bool aVerbose = false);
   static vector<string> explode(string aStr, char aDelim);
};
</pre></div>

<h3>RokkoParser.cpp</h3>
<div class="i_code"><pre>#include "RokkoParser.h"

vector<string> RokkoParser::explode(string aStr, char aDelim)
{
  vector<string> res;
  string str = aStr.substr(0, aStr.find(aDelim));

  while(str.size() < aStr.size())
  {
    res.push_back(str);
    aStr = aStr.substr(aStr.find(aDelim) + 1);
    str = aStr.substr(0, aStr.find(aDelim));
  }

  res.push_back(str);

  return res;
}

void RokkoParser::objToTxt(const string aInFilename, 
                  const string aOutFilename, 
                  bool aVerbose)
{
  if(aVerbose) cout << "Loading OBJ file <" 
              << aInFilename << ">" << endl;

  // Open file
  ifstream objFile(aInFilename.c_str());

  if(objFile.fail())
  {
    cout << "Error: could not open file <" 
        << aInFilename << ">" << endl;
    exit(1);
  }


  // Extract verts, normals, textures, and faces
  vector<float> verts, norms, textures;
  vector<int> faces;
  map<string, int> faceHash;

  vector<float> finalVerts, finalNorms, finalTextures;
  vector<int> finalFaces;

  string line;
  int hashIndex = 0;

  if(aVerbose) cout << "Extracting values from file" << endl;

  // Visit each line of the obj file
  while(getline(objFile, line))
  {
    // Extract vertex
    // Line starts with v[space]...
    if(line[0] == 'v' && line[1] == ' ')
    {
      string lineVals = line.substr(2);
      float val;

      string val0 = lineVals.substr(0, lineVals.find(' '));
      val = (float)atof(val0.c_str());
      verts.push_back(val);

      string val1 = lineVals.substr(val0.length() + 1, 
                          lineVals.find(' '));
      val = (float)atof(val1.c_str());
      verts.push_back(val);

      string val2 = lineVals.substr(lineVals.find_last_of(' ') + 1);
      val = (float)atof(val2.c_str());
      verts.push_back(val);
    }


    // Extract textures
    // Line starts with vt[space]...
    else if(line[0] == 'v' && line[1] == 't' && line[2] == ' ')
    {
      string lineVals = line.substr(3);
      float val;

      string val0 = lineVals.substr(0, lineVals.find(' '));
      val = (float)atof(val0.c_str());
      textures.push_back(val);

      string val1 = lineVals.substr(val0.length() + 1, 
                          lineVals.find(' '));
      val = (float)atof(val1.c_str());
      textures.push_back(val);
    }


    // Extract normals
    // Line starts with vn[space]...
    else if(line[0] == 'v' && line[1] == 'n' && line[2] == ' ')
    {
      string lineVals = line.substr(3);
      float val;

      string val0 = lineVals.substr(0, lineVals.find(' '));
      val = (float)atof(val0.c_str());
      norms.push_back(val);

      string val1 = lineVals.substr(val0.length() + 1, 
                          lineVals.find(' '));
      val = (float)atof(val1.c_str());
      norms.push_back(val);

      string val2 = lineVals.substr(lineVals.find_last_of(' ') + 1);
      val = (float)atof(val2.c_str());
      norms.push_back(val);
    }


  //
  // 2. Hash faces
  //
    // Extract faces
    // Line starts with f[space]...
    else if(line[0] == 'f' && line[1] == ' ')
    {
      string lineVals = line.substr(2);

      string val0 = lineVals.substr(0, lineVals.find_first_of(' '));

      // If the value for this face includes texture and/or 
      // normal, parse them out
      if(val0.find('/') >= 0)
      {
        // Get first group of values
        string g1 = val0.substr(0, val0.find(' '));
        
        // Get second group of values
        string g2 = line.substr(line.find(' ') + 2);
        g2 = g2.substr(g2.find(' ') + 1);
        g2 = g2.substr(0, g2.find(' '));

        string g3 = line.substr(line.find_last_of(' ') + 1);

        if(aVerbose)
          cout << "Face: (" << g1 << ") (" << g2 << ") (" << g3 << ")" << endl;

        // Just stick all the unique values in this hash and give each key a 
        // unique, increasing value
        map<string, int>::iterator itr;

        //
        // Add key's position to the faces list
        //

        itr = faceHash.find(g1);
        // If key not in map
        if(itr == faceHash.end())
        {
          faceHash[g1] = hashIndex++;
        }
        itr = faceHash.find(g1);
        faces.push_back(itr->second);

        itr = faceHash.find(g2);
        // If key not in map
        if(itr == faceHash.end())
        {
          faceHash[g2] = hashIndex++;
        }
        itr = faceHash.find(g2);
        faces.push_back(itr->second);

        itr = faceHash.find(g3);
        // If key not in map
        if(itr == faceHash.end())
        {
          faceHash[g3] = hashIndex++;
        }
        itr = faceHash.find(g3);
        faces.push_back(itr->second);
      }

      // Only verts in file
      else
      {
        // Push faces straight up -- converting to 
        // base zero in the process
      }
    }
  } /* end getline(file, line) */

  if(aVerbose) cout  << "Finished extracting values from file" << endl
            << "Quick count check:" << endl
            << "\tVerts = " << verts.size() << endl
            << "\tNorms = " << norms.size() << endl
            << "\tTexts = " << textures.size() << endl
            << "\tFaces = " << faces.size() << endl;
  
  objFile.close();

  if(aVerbose) cout << "Preparing to build faces" << endl;
  
  //
  // 3. Fill verts, texts, and norms lists so it can be indexed directly. 
  //   Length = hash.size
  //
  for(int i = 0; i < faceHash.size() * 2; i++)
    finalTextures.push_back(0.0f);

  for(int i = 0; i < faceHash.size() * 3; i++)
  {
    finalVerts.push_back(0.0f);
    finalNorms.push_back(0.0f);
  }


  // 5. Walk through hash, extract each value in current key
  // * Remember to make faces array zero based
  //
  // Cases for keys:
  //    1. ## ## ## (verts only)
  //    2. ##/## ##/## ##/## (verts and textures)
  //    3. ##//## ##//## ##//## (verts and normals)
  //    4. ##// ##// ##// (verts only)
  //

  if(aVerbose) cout << "Hashing list of unique vertices" << endl;

  if(aVerbose) cout << faceHash.size() << " unique vertices found" << endl;

  map<string, int>::iterator hashItr = faceHash.begin();
  int faceCounter = 0;
  while(hashItr != faceHash.end())
  {
    string faceHashKey = hashItr->first;
    int faceHashVal = hashItr->second;

    if(aVerbose) cout << "Unique face #" << faceHashVal 
                << " = " << faceHashKey << endl;

    // Default values
    float v0 = (float)0.0f;
    float v1 = (float)0.0f;
    float v2 = (float)0.0f;

    float t0 = (float)0.0f;
    float t1 = (float)0.0f;

    float n0 = (float)0.0f;
    float n1 = (float)0.0f;
    float n2 = (float)0.0f;

    vector<string> vals = RokkoParser::explode(faceHashKey, '/');

    v0 = (float)verts[(atoi(vals[0].c_str()) - 1) * 3];
    v1 = (float)verts[(atoi(vals[0].c_str()) - 1) * 3 + 1];
    v2 = (float)verts[(atoi(vals[0].c_str()) - 1) * 3 + 2];

    if(vals.size() > 1 && vals[1].size() > 0)
    {
      t0 = (float)textures[(atoi(vals[1].c_str()) - 1) * 2];
      t1 = (float)textures[(atoi(vals[1].c_str()) - 1) * 2 + 1];
    }

    if(vals.size() > 2 && vals[2].size() > 0)
    {
      n0 = (float)norms[(atoi(vals[2].c_str()) - 1) * 3];
      n1 = (float)norms[(atoi(vals[2].c_str()) - 1) * 3 + 1];
      n2 = (float)norms[(atoi(vals[2].c_str()) - 1) * 3 + 2];
    }


    finalVerts.at(faceHashVal * 3) = v0;
    finalVerts.at(faceHashVal * 3 + 1) = v1;
    finalVerts.at(faceHashVal * 3 + 2) = v2;

    finalTextures.at(faceHashVal * 2) = t0;
    finalTextures.at(faceHashVal * 2 + 1) = t1;

    finalNorms.at(faceHashVal * 3) = n0;
    finalNorms.at(faceHashVal * 3 + 1) = n1;
    finalNorms.at(faceHashVal * 3 + 2) = n2;


    if(aVerbose) cout  << "  Vert: " << finalVerts.at(faceHashVal * 3) 
                  << " " << finalVerts.at(faceHashVal * 3 + 1) 
                  << " " 
                  << finalVerts.at(faceHashVal * 3 + 2)
                  << "  Text: " << finalTextures.at(faceHashVal * 2) 
                  << " " 
                  << finalTextures.at(faceHashVal * 2 + 1)
                  << "  Norm: " << finalNorms.at(faceHashVal * 3) 
                  << " " 
                  << finalNorms.at(faceHashVal * 3 + 1) 
                  << " " 
                  << finalNorms.at(faceHashVal * 3 + 2)
              << endl;

    hashItr++;
  }

  ofstream out(aOutFilename.c_str());

  if(out.fail())
  {
    cout << "Error: could not create output file " << aOutFilename << endl;
    exit(1);
  }

  if(aVerbose) cout << "Saving data to " << aOutFilename << endl;

  int len;

  // Verts
  out << "{"
    << "\"Verts\": [";

  len = finalVerts.size();
  for(int i = 0; i < len; i++)
  {
    out << finalVerts[i];

    if(i < len - 1)
      out << ",";
  }
  
  out << "]";

  // Normals
  out << ",\"Normals\": [";

  len = finalNorms.size();
  for(int i = 0; i < len; i++)
  {
    out << finalNorms[i];

    if(i < len - 1)
      out << ",";
  }
  
  out << "]";


  // Textures
  out << ",\"Textures\": [";

  len = finalTextures.size();
  for(int i = 0; i < len; i++)
  {
    out << finalTextures[i];

    if(i < len - 1)
      out << ",";
  }
  
  out << "]";


  // Textures
  out << ",\"Textures\": [";

  len = finalTextures.size();
  for(int i = 0; i < len; i++)
  {
    out << finalTextures[i];

    if(i < len - 1)
      out << ",";
  }
  
  out << "]";


  // Faces
  out << ",\"Faces\": [";

  len = faces.size();
  for(int i = 0; i < len; i++)
  {
    out << faces[i];

    if(i < len - 1)
      out << ",";
  }
  
  out << "]";


  out << "}";

  if(aVerbose) cout << "All done!" << endl;
  out.close();
}
</pre></div>