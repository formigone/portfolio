---
layout: demo
title: Simple Square
parentUrl: /my-first-webgl-3d-demos-hello-world-of-opengl
parentTitle: From OpenGl to WebGL - My first 3D demos in JavaScript
---

## Description

This WebGL demo renders two cubes with each pair of vertices interpolating colors from one to the other. The purpose of this demo is to show how to build two VBO objects that are rendered by the same shader.

<canvas id="canvas_window" style="width: 100%;"></canvas>
<script src="/js/glmatrix-0.9.5-min.js"></script>
<script id="shader-vs" type="x-shader/x-vertex"></script>
<script id="shader-fs" type="x-shader/x-fragment"></script>
<script>
var gl;
var shaderProg;
var vbo = [ {triangle: {x:0, y:-1.75, z:-1.0}},
            {triangle: {x:0, y:-1.75, z:-1.0}}
    ];
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
    
    shaderProg.vertexColorAttribute = gl.getAttribLocation(shaderProg, 'aVertexColor');
    gl.enableVertexAttribArray(shaderProg.vertexColorAttribute);

    // Link uniform locations
    shaderProg.pMatrixUniform = gl.getUniformLocation(shaderProg, 'uPMatrix');
    shaderProg.mvMatrixUniform = gl.getUniformLocation(shaderProg, 'uMVMatrix');
}


/**************************************************
* Create a Vertex Buffer Object
**************************************************/
function initVbo(pGl, pVbo, pVerts, pColors)
{
    var gl = pGl;

    pVbo.gl_verts = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pVbo.gl_verts);
    gl.bufferData(gl.ARRAY_BUFFER, 
                    new Float32Array(pVerts),
                    gl.STATIC_DRAW);

    pVbo.gl_colors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pVbo.gl_colors);
    gl.bufferData(gl.ARRAY_BUFFER, 
                    new Float32Array(pColors),
                    gl.STATIC_DRAW);
}


/**************************************************
* Send uniforms to shader program
**************************************************/
function setMatrixUniforms()
{
    gl.uniformMatrix4fv(shaderProg.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProg.mvMatrixUniform, false, mvMatrix);
}


/**************************************************
* Draw the scene
**************************************************/
function drawScene()
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    //
    // Draw triangle 1
    //
    mat4.identity(mvMatrix);
    mat4.scale(mvMatrix, [5.0, 5.0, 1.0]);
    mat4.translate(mvMatrix, [-1.15, 0.0, -10.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[0].triangle.gl_verts);
    gl.vertexAttribPointer(shaderProg.vertexPositionAttribute, 
                            vbo[0].triangle.verts.itemSize,
                            gl.FLOAT,
                            false,
                            0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[0].triangle.gl_colors);
    gl.vertexAttribPointer(shaderProg.vertexColorAttribute, 
                            vbo[0].triangle.colors.itemSize,
                            gl.FLOAT,
                            false,
                            0, 0);
                            
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, vbo[0].triangle.verts.totalVerts);


    //
    // Draw triangle 2
    //
    mat4.identity(mvMatrix);
    mat4.scale(mvMatrix, [5.0, 5.0, 1.0]);
    mat4.translate(mvMatrix, [1.15, 0.0, -10.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[0].triangle.gl_verts);
    gl.vertexAttribPointer(shaderProg.vertexPositionAttribute, 
                            vbo[0].triangle.verts.itemSize,
                            gl.FLOAT,
                            false,
                            0, 0);
                            
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[0].triangle.gl_colors);
    gl.vertexAttribPointer(shaderProg.vertexColorAttribute, 
                            vbo[0].triangle.colors.itemSize,
                            gl.FLOAT,
                            false,
                            0, 0);
                            
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, vbo[0].triangle.verts.totalVerts);
}

function webGLInit()
{
    //
    // Set canvas
    //
    var canvas = document.querySelector('#canvas_window');
    var w = document.body.clientWidth;
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
            filename: 'color-vertex-shader.glsl'
        },
        frag: {
            scriptId: 'shader-fs',
            filename: 'color-fragment-shader.glsl'
        }
    });

    //
    // Create VBO
    //
    var triangleVerts = [
        0.5, 0.5, 0.0,  // 1
        -0.5, 0.5, 0.0, // 2
        -0.5, -0.5, 0.0,// 3
        0.5, 0.5, 0.0,  // 1
        0.5, -0.5, 0.0, // 4
        -0.5, -0.5, 0.0 // 3
    ];
    
    var triangleColors = [
        0.8, 0.05, 0.05, 1.0,
        0.05, 0.8, 0.05, 1.0,
        0.05, 0.05, 0.8, 1.0,
        0.8, 0.05, 0.05, 1.0,
        0.75, 0.75, 0.05, 1.0,
        0.05, 0.05, 0.8, 1.0
    ];

    vbo[0].triangle.verts = {};
    vbo[0].triangle.colors = {};
    
    vbo[0].triangle.verts.itemSize = 3 /* (x, y, z) */;
    vbo[0].triangle.verts.totalVerts = triangleVerts.length / vbo[0].triangle.verts.itemSize;
    
    vbo[0].triangle.colors.itemSize = 4 /* (r, b, g, a) */;
    vbo[0].triangle.colors.totalColors = triangleColors.length / vbo[0].triangle.colors.itemSize;

    vbo[0].triangle.gl_verts = null;
    vbo[0].triangle.gl_colors = null;

    initVbo(gl, vbo[0].triangle, triangleVerts, triangleColors);

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
loadShaderContent('color-vertex-shader.glsl', 'shader-vs', checkProgs);
loadShaderContent('color-fragment-shader.glsl', 'shader-fs', checkProgs);
</script>