---
layout: demo
title: Textured Cube
parentUrl: /my-first-webgl-3d-demos-hello-world-of-opengl
parentTitle: From OpenGl to WebGL - My first 3D demos in JavaScript
---

## Description

This WebGL demo renders a spinning cube with an old school Super Mario Brothers texture on it. The purpose of this demo was for me to learn the ways of WebGL textures. One thing I learned after 1 hour of debugging is this: the width and height of your texture file must be a power of 2.

<canvas id="canvas_window" style="width: 100%;"></canvas>
<script src="/js/webgl-utils.js"></script>
<script src="/js/glmatrix-0.9.5-min.js"></script>
<script id="shader-vs" type="x-shader/x-vertex"></script>
<script id="shader-fs" type="x-shader/x-fragment"></script>
<script>
var gl;
var shaderProg;
var vbo = [ {cube: {x:0, y:-1.75, z:-1.0}}];
var pMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];

/**************************************************
* Load shader content from the server
**************************************************/
function loadShaderContent(pFilename, pScriptId, cb)
{
    $.ajax({
        url: '/demo-deps/' + pFilename,
        success: function(data){
            document.querySelector('#' + pScriptId).innerText = data;
        },
    });
    cb();
}


/**************************************************
* Attempt to initialize a WebGL context
**************************************************/
function initGL(pCanvas)
{
    try
    {
        gl = pCanvas.getContext('experimental-webgl');
        gl.viewportWidth = pCanvas.width;
        gl.viewportHeight = pCanvas.height;
    }
    catch(e){}

    if(!gl)
        throw new Error('Could not initialize WebGL: ' + e);
}


/**************************************************
* Create, compile, and return a shader object
**************************************************/
function getShader(pGl, pShaderId, pFilename)
{
    var shaderScript = document.querySelector('#' + pShaderId);
    var shaderContent;

    shaderContent = shaderScript.text;

    var shader;

    if(shaderScript.type == 'x-shader/x-vertex')
        shader = pGl.createShader(pGl.VERTEX_SHADER);
    else if(shaderScript.type == 'x-shader/x-fragment')
        shader = pGl.createShader(pGl.FRAGMENT_SHADER);

    // Ignore attempts to create geometry shaders for now
    else
        return null;

    pGl.shaderSource(shader, shaderContent);
    pGl.compileShader(shader);

    // Check that compilation was awesome, throw error if not so
    if(!pGl.getShaderParameter(shader, pGl.COMPILE_STATUS))
        throw new Error(pGl.getShaderInfoLog(shader));

    return shader;
}


/**************************************************
* Create a shader program
**************************************************/
function initShaders(pParam)
{
    var gl = pParam.gl;

    var vertexShader = getShader(gl, pParam.vert.scriptId, pParam.vert.filename);
    var fragmentShader = getShader(gl, pParam.frag.scriptId, pParam.frag.filename);

    shaderProg = gl.createProgram();
    gl.attachShader(shaderProg, vertexShader);
    gl.attachShader(shaderProg, fragmentShader);
    gl.linkProgram(shaderProg);
    
    if(!gl.getProgramParameter(shaderProg, gl.LINK_STATUS))
        throw new Error('Error: Could not initialize shaders');

    gl.useProgram(shaderProg);

    // Link attribute locations
    shaderProg.vertexPositionAttribute = gl.getAttribLocation(shaderProg, 'aVertexPosition');
    gl.enableVertexAttribArray(shaderProg.vertexPositionAttribute);
    
    shaderProg.vertexTextureAttribute = gl.getAttribLocation(shaderProg, 'aTextureCoord');
    gl.enableVertexAttribArray(shaderProg.vertexTextureAttribute);

    // Link uniform locations
    shaderProg.pMatrixUniform = gl.getUniformLocation(shaderProg, 'uPMatrix');
    shaderProg.mvMatrixUniform = gl.getUniformLocation(shaderProg, 'uMVMatrix');
    shaderProg.samplerUniform = gl.getUniformLocation(shaderProg, 'uSampler');
}


/**************************************************
* Create a Vertex Buffer Object
**************************************************/
function initVbo(pGl, pVbo, pVerts, pTextures, pIndices)
{
    var gl = pGl;

    pVbo.gl_verts = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pVbo.gl_verts);
    gl.bufferData(gl.ARRAY_BUFFER, 
                    new Float32Array(pVerts),
                    gl.STATIC_DRAW);

    pVbo.gl_textures = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pVbo.gl_textures);
    gl.bufferData(gl.ARRAY_BUFFER, 
                    new Float32Array(pTextures),
                    gl.STATIC_DRAW);
                    
    pVbo.gl_indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pVbo.gl_indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pIndices), gl.STATIC_DRAW);
}


function handleLoadedTexture(pGl, pTexture)
{
    var gl = pGl;
    
    gl.bindTexture(gl.TEXTURE_2D, pTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pTexture.img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function initTexture(pGl, pFile)
{
    var gl = pGl;
    texture = gl.createTexture();
    texture.img = new Image();
    
    texture.img.onload = function()
    {
        handleLoadedTexture(gl, texture);
    };
    
    texture.img.src = pFile;
}


/**************************************************
* Send uniforms to shader program
**************************************************/
function setMatrixUniforms()
{
    gl.uniformMatrix4fv(shaderProg.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProg.mvMatrixUniform, false, mvMatrix);
}


var PI_DIV_180 = Math.PI / 180;
function degToRad(pDeg)
{
    return pDeg * PI_DIV_180;
}

var xRot = 45;
var yRot = 0;
/**************************************************
* Draw the scene
**************************************************/
function drawScene()
{
    requestAnimationFrame(drawScene);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    //
    // Draw triangle 1
    //
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0.0, 0.0, -20.0]);
    mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
    mat4.scale(mvMatrix, [5.0, 5.0, 5.0]);
    
    yRot += 1 % 360;
    xRot += 0.75 % 360;

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[0].cube.gl_verts);
    gl.vertexAttribPointer(shaderProg.vertexPositionAttribute, 
                            vbo[0].cube.verts.itemSize,
                            gl.FLOAT,
                            false,
                            0, 0);
                            
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[0].cube.gl_textures);
    gl.vertexAttribPointer(shaderProg.vertexTextureAttribute, 
                            vbo[0].cube.texture.itemSize,
                            gl.FLOAT,
                            false,
                            0, 0);
                            
                            
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(shaderProg.samplerUniform, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo[0].cube.gl_indices);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, vbo[0].cube.indices.totalIndices, gl.UNSIGNED_SHORT, 0);
}


function webGLInit()
{
    //
    // Set canvas
    //
    var canvas = document.querySelector('#canvas_window');
    var w = $('body').width();
    canvas.width = w * 0.75;
    canvas.height = canvas.width / 2.75;
    canvas.style.display = 'block';

    initGL(canvas);

    //
    // Create shader program
    //
    initShaders({
        gl: gl,
        vert: {
            scriptId: 'shader-vs',
            // Use a '@@' to represent a '/' because it'll be part of the URI
            filename: 'shaders@@texture-vertex-shader.glsl'
        },
        frag: {
            scriptId: 'shader-fs',
            filename: 'shaders@@texture-fragment-shader.glsl'
        }
    });

    //
    // Create VBO
    //
    var cubeVerts = [
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
    ];
    
    var cubeTextures = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    
    var cubeIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    

    vbo[0].cube.verts = {};
    vbo[0].cube.texture = {};
    vbo[0].cube.indices = {};
    
    vbo[0].cube.verts.itemSize = 3 /* (x, y, z) */;
    vbo[0].cube.verts.totalVerts = cubeVerts.length / vbo[0].cube.verts.itemSize;
    
    vbo[0].cube.texture.itemSize = 2 /* (r, b, g, a) */;
    vbo[0].cube.texture.totalTextures = cubeTextures.length / vbo[0].cube.texture.itemSize;
    
    vbo[0].cube.indices.itemSize = 1; /* one row of each buffer */
    vbo[0].cube.indices.totalIndices = cubeIndices.length;

    vbo[0].cube.gl_verts = null;
    vbo[0].cube.gl_textures = null;
    vbo[0].cube.gl_indices = null;

    initVbo(gl, vbo[0].cube, cubeVerts, cubeTextures, cubeIndices);
    initTexture(gl, '/images/textures/mario-block.png');
    
    //
    // Setup scene attributes
    //
    gl.clearColor(0.13, 0.13, 0.13, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    //
    // draw scene
    //
    drawScene();
}

// Load shader content from shader async
var progsLoaded = 0;
function checkProgs() {
   if (++progsLoaded === 2) {
      setTimeout(webGLInit, 1000);
   }
}
loadShaderContent('texture-vertex-shader.glsl', 'shader-vs', checkProgs);
loadShaderContent('texture-fragment-shader.glsl', 'shader-fs', checkProgs);
</script>
