---
layout: demo
title: A Storm of Triangles
parentUrl: /my-first-webgl-3d-demos-hello-world-of-opengl
parentTitle: From OpenGl to WebGL - My first 3D demos in JavaScript
---

## Description

This WebGL demo renders a cloud of triangles every frame. The triangles are displayed at random positions each time. The main purpose of this demo is to test the limits of your browser. You can add mroe triangles with the keyboard. At what point does Google Chrome or Firefox (or whatever browser you use) slows down enough that the close doesn't even move anymore?!

<canvas id="canvas_window" style="width: 100%;"></canvas>
<div id="console">
<span id="c_total"></span>
<b>Controls:</b> arrow up = zoom in, arrow down = zoom out, m = more triangles, l = less triangles, r = rotate cloud
</div>

<script src="/js/webgl-utils.js"></script>
<script src="/js/glmatrix-0.9.5-min.js"></script>

<script id="shader-vs" type="x-shader/x-vertex"></script>
<script id="shader-fs" type="x-shader/x-fragment"></script>
<script>
var gl;
var shaderProg;
var vbo = {triangle: {x:0, y:-1.75, z:-1.0}};
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

    // Link uniform locations
    shaderProg.pMatrixUniform = gl.getUniformLocation(shaderProg, 'uPMatrix');
    shaderProg.mvMatrixUniform = gl.getUniformLocation(shaderProg, 'uMVMatrix');
}


/**************************************************
* Create a Vertex Buffer Object
**************************************************/
function initVbo(pGl, pVbo, pVerts)
{
    var gl = pGl;

    pVbo.gl = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pVbo.gl);
    gl.bufferData(gl.ARRAY_BUFFER,
                    new Float32Array(pVerts),
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


var rotation_deg = 0;
var MAX_TRIANGLES = 50;
/**************************************************
* Draw the scene
**************************************************/
function drawScene()
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100000.0, pMatrix);


    for(var i = 0; i < MAX_TRIANGLES; i++)
    {
        var rand_x = Math.random() * 200 - 100;
        var rand_y = Math.random() * 50 - 25;
        var rand_z = Math.random() * 100 - 200;

        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, [  vbo.triangle.x + rand_x,
                                    vbo.triangle.y + rand_y,
                                    vbo.triangle.z + rand_z]);

        mvPushMatrix();
        rotateTriangle(rotation_deg, 0, 1, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, vbo.triangle.gl);
        gl.vertexAttribPointer(shaderProg.vertexPositionAttribute,
                                vbo.triangle.itemSize,
                                gl.FLOAT,
                                false,
                                0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, vbo.triangle.totalVerts);
        mvPopMatrix();
    }

    requestAnimFrame(drawScene);
}

function mvPushMatrix()
{
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix()
{
    if (mvMatrixStack.length == 0)
        throw "Invalid popMatrix!";

    mvMatrix = mvMatrixStack.pop();
}

var PI_DIV_180 = Math.PI / 180;
function degToRad(pDeg)
{
    return pDeg * PI_DIV_180;
}

function moveTriangle(pX, pY, pZ)
{
    mat4.translate(mvMatrix, [pX, pY, pZ]);
}

function rotateTriangle(pDeg, pX, pY, pZ)
{
    mat4.rotate(mvMatrix, degToRad(pDeg), [pX, pY, pZ]);
}

function updateConsole()
{
    document.querySelector('#console #c_total').innerText = 'Total triangles: ' + MAX_TRIANGLES;
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
            filename: 'shaders@@simple-vertex-shader.glsl'
        },
        frag: {
            scriptId: 'shader-fs',
            filename: 'shaders@@simple-fragment-shader.glsl'
        }
    });

    //
    // Create VBO
    //
    var triangleVerts = [
        -0.5, 0.5, 0.0,
        0.5, 0.5, 0.0,
        0.0, 1.5, 0.0
    ];

    vbo.triangle.itemSize = 3 /* (x, y, z) */;
    vbo.triangle.totalVerts = triangleVerts.length / vbo.triangle.itemSize;
    vbo.triangle.gl = null;

    initVbo(gl, vbo.triangle, triangleVerts);

    //
    // Setup scene attributes
    //
    gl.clearColor(0.13, 0.13, 0.13, 1.0);
    gl.enable(gl.DEPTH_TEST);



    //
    // draw scene
    //
    drawScene();
    updateConsole();

    var MOVE_BY = 0.25;
    var ROTATE_BY_DEG = 8.5;

    //
    // Register event listeners
    //
    document.body.addEventListener('keydown', function(key){
        switch(key.which)
        {
            case 40: /* Arrow down */
                vbo.triangle.z -= MOVE_BY;
                moveTriangle(vbo.triangle.x,
                    vbo.triangle.y,
                    vbo.triangle.z);
                break;
            case 38: /* Arrow up */
                vbo.triangle.z += MOVE_BY;
                moveTriangle(vbo.triangle.x,
                    vbo.triangle.y,
                    vbo.triangle.z);
                break;
            case 82: /* R */
                rotation_deg += ROTATE_BY_DEG % 360;
                break;
            case 77: /* M */
                MAX_TRIANGLES += parseInt(MAX_TRIANGLES * 0.05);
                updateConsole();
                break;

            case 76 /* L */:
                MAX_TRIANGLES = 100;
                updateConsole();
                break;

        }
    });
}

// Load shader content from shader async
var progsLoaded = 0;
function checkProgs() {
   if (++progsLoaded === 2) {
      setTimeout(webGLInit, 1000);
   }
}

loadShaderContent('simple-vertex-shader.glsl', 'shader-vs', checkProgs);
loadShaderContent('simple-fragment-shader.glsl', 'shader-fs', checkProgs);
</script>
