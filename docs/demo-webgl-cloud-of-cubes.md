---
layout: demo
title: Super Mario Galaxy
parentUrl: /my-first-webgl-3d-demos-hello-world-of-opengl
parentTitle: From OpenGl to WebGL - My first 3D demos in JavaScript
---

## Description

This WebGL demo renders a universe of spinning Super Mario Brothers mystery cube. The purpose of this demo is to demonstrate the use of a camera matrix, as well as to pay tribute to one of the best video games ever made: Super Mario Galaxy!

<canvas id="canvas_window" style="width: 100%;"></canvas>
<div id="console"><span id="c_total"></span>
<p><b>Controls:</b></p>
<ul>
    <li>arrow up = move forward</li>
    <li>arrow down = move backwards</li>
    <li>M = 5% more cubes</li>
    <li>L = reset total cubes</li>
    <li>R = rotate cloud</li>
</ul>

<script src="/js/webgl-utils.js"></script>
<script src="/js/glmatrix-0.9.5-min.js"></script>
<script id="shader-vs" type="x-shader/x-vertex"></script>
<script id="shader-fs" type="x-shader/x-fragment"></script>
<script>
var gl;
var shaderProg;
var vbo = [{cube: {x:0, y:-1.75, z:-1.0}}];
var pMatrix = mat4.create();
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var cameraMatrix = mat4.create();
var camera_pos = [0, 0, 0];
var texture;

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
    shaderProg.cameraUniform = gl.getUniformLocation(shaderProg, 'uCameraMatrix');
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
    gl.uniformMatrix4fv(shaderProg.cameraUniform, false, cameraMatrix);
}


var PI_DIV_180 = Math.PI / 180;
function degToRad(pDeg)
{
    return pDeg * PI_DIV_180;
}

var xRot = 0;
var yRot = 0;
var MAX_CUBES = 1000;
var cubes_positions = [];
var faux_z = -10;

function initCubes(pLen)
{
    for(var i = 0; i < pLen * 3; i += 3)
    {
        var rand_x = Math.random() * 1000 - 500;
        var rand_y = Math.random() * 800 - 400;
        var rand_z = Math.random() * 1000 * -1 - 10;
        
        cubes_positions[i] = rand_x;
        cubes_positions[i + 1] = rand_y;
        cubes_positions[i + 2] = rand_z;
    }
}


/**************************************************
* Draw the scene
**************************************************/
function drawScene()
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, pMatrix);
    
    mat4.identity(cameraMatrix);
    mat4.translate(cameraMatrix, [camera_pos[0], camera_pos[1], camera_pos[2]]);

    for(var i = 0; i < MAX_CUBES * 3; i += 3)
    {
        //
        // Draw triangle 1
        //
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, [cubes_positions[i], cubes_positions[i+1], cubes_positions[i+2]]);
        mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);

        yRot += 0.0025 % 360;

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
        
        cubes_positions[i+2] += 5;
        if(cubes_positions[i+2] > 100)
            cubes_positions[i+2] = -1000;
        
    }

    requestAnimFrame(drawScene);
}

function updateConsole()
{
    document.querySelector('#console #c_total').innerText = 'Total cubes: ' + MAX_CUBES;
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
            filename: 'shaders@@camera-texture-vertex-shader.glsl'
        },
        frag: {
            scriptId: 'shader-fs',
            filename: 'shaders@@camera-texture-fragment-shader.glsl'
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
    // Setup cubes
    //
    initCubes(MAX_CUBES);
    
    //
    // Register event listeners
    //
    document.body.addEventListener('keydown', 
        function(key)
        {
            
            var MOVE_BY = 20;

            switch(key.which)
            {
                case 40: /* Arrow down */
                    camera_pos[2] -= MOVE_BY;
                    break;
                case 38: /* Arrow up */
                    camera_pos[2] += MOVE_BY / 2;
                    break;
                case 77: /* M */
                    MAX_CUBES += parseInt(MAX_CUBES * 0.05);
                    initCubes(MAX_CUBES);
                    updateConsole();
                    break;
                    
                case 76 /* L */:
                    MAX_CUBES = 100;
                    initCubes(MAX_CUBES);
                    updateConsole();
                    break;
            }
        });
        
        
    //
    // draw scene
    //
    drawScene();
    updateConsole();
}

// Load shader content from shader async
var progsLoaded = 0;
function checkProgs() {
   if (++progsLoaded === 2) {
      setTimeout(webGLInit, 1000);
   }
}
loadShaderContent('camera-texture-vertex-shader.glsl', 'shader-vs', checkProgs);
loadShaderContent('camera-texture-fragment-shader.glsl', 'shader-fs', checkProgs);
</script>
