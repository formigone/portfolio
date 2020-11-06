/**
 * @overview The purpose of this demonstration is to illustrate one of the benefits that can be gained by being able
 * to specify a custom fragment shader into the CanvasRenderingContext2D object.
 *
 * What the following application does is simulate such functionality by using functions as post-processors,
 * which, when set, perform some transformation to the pixel data contained in a CanvasRenderingContext2D.
 * Ideally, this would all be done at the GPU, by means of a user-specified fragment shader.
 *
 * @author Rodrigo Silveira <webmaster@rodrigo-sileira.com>
 */


/**
 * Make it so references to this function kind of look like a GLSL file
 *
 * @type {Object.<string, Function>}
 */
var allBlackShader = {};
allBlackShader.glsl = function () {
    var img = this.getImageData(0, 0, WIDTH, HEIGHT);
    var data = img.data;

    for (var i = 0, len = data.length; i < len; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = 255 - data[i + 3];
    }

    this.putImageData(img, 0, 0);

    setTimeout(function () {
        doThunder = false;
    }, 150);
};

var allWhiteShader = {};
allWhiteShader.glsl = function () {
    var img = this.getImageData(0, 0, WIDTH, HEIGHT);
    var data = img.data;

    for (var i = 0, len = data.length; i < len; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = data[i + 3];
    }

    this.putImageData(img, 0, 0);

    setTimeout(function () {
        doThunder = false;
    }, 150);
};

var defShader = {};
defShader.glsl = function () {
    return 0;
};

/**
 * Some application-level convenience function that determines what shader is wanted based on some condition
 *
 * @param {string} name
 * @returns {Function}
 */
function getAppropriateShaderProgram(name) {
    if (doThunder) {
        if (name === Layers.BACKGROUND) {
            return CanvasRenderingContext2D.customShaderPrograms[name];
        }

        if (name === Layers.FOREGROUND) {
            return CanvasRenderingContext2D.customShaderPrograms[name];
        }
    }

    return CanvasRenderingContext2D.customShaderPrograms[0];
}

//
// What this API could possibly look like... why not?!
//

/**
 * Set up default shader program. Note the fake reference to a GLSL "file"
 *
 * @type {Array.<Function>}
 */
CanvasRenderingContext2D.customShaderPrograms = [defShader.glsl];

/**
 * Each canvas context has its own custom shader. Note the cute addition of the fake [and out of place] dev prefix =)
 *
 * @type {Function}
 */
CanvasRenderingContext2D.prototype["-rokko-customShader"] = defShader;

/**
 * Some "internal" hook for the custom shader to run (only needed in the implementation of this demo.
 * The dream is that each draw call on the ctx instance would be done using whatever program is currently bound
 *
 */
CanvasRenderingContext2D.prototype.runCustomShader = function () {
    this["-rokko-customShader"].call(this);
};

/**
 * Compile a shader program and return a pointer to it
 *
 * @param {Function} fragmentShader
 * @param {null} vertexShader
 * @returns {number}
 */
CanvasRenderingContext2D.prototype.compileCustomShader = function (fragmentShader, vertexShader) {
    CanvasRenderingContext2D.customShaderPrograms.push(fragmentShader);
    return CanvasRenderingContext2D.customShaderPrograms.length - 1;
};

CanvasRenderingContext2D.prototype.bindCustomShader = function (shaderProgram) {
    this["-rokko-customShader"] = shaderProgram;
};


var WIDTH = 800;
var HEIGHT = 600;
var MAX_RAIN = 108;
var isPaused = false;
var doThunder = false;
var shaders = {};
var Layers = {};

function main() {
    var canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    var ctx = canvas.getContext("2d");
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;


    var canvas2 = document.createElement("canvas");
    canvas2.width = WIDTH;
    canvas2.height = HEIGHT;
    var ctx2 = canvas2.getContext("2d");
    ctx2.webkitImageSmoothingEnabled = false;
    ctx2.mozImageSmoothingEnabled = false;
    ctx2.msImageSmoothingEnabled = false;
    ctx2.imageSmoothingEnabled = false;

    /**
     * Compiile shader program and hold on to its pointer
     *
     * @type {number}
     */
    shaders.allBlack = ctx2.compileCustomShader(allWhiteShader.glsl);
    shaders.allWhite = ctx.compileCustomShader(allBlackShader.glsl);

    Layers.FOREGROUND = shaders.allWhite;
    Layers.BACKGROUND = shaders.allBlack;

    var imgs = {
        rain: new Image(),
        mm: new Image(),
        floor: new Image(),
        bg: new Image()
    };
    imgs.rain.src = "/images/demo/rain.png";
    imgs.mm.src = "/images/demo/8bitmm.gif";
    imgs.floor.src = "/images/demo/mm-level-4.png";
    imgs.bg.src = "/images/demo/mm-level-4.png";

    var megaman = {
        x: WIDTH * 0.25,
        y: 426,
        width: 64,
        height: 64,
        speed: 3,
        scale: 3,
        currFrame: 0,
        frames: [
            {
                pos: {
                    x: 190,
                    y: 11
                },
                size: {
                    w: 24,
                    h: 24
                },
                freq: 100
            },
            {
                pos: {
                    x: 220,
                    y: 11
                },
                size: {
                    w: 16,
                    h: 24
                },
                freq: 100
            },
            {
                pos: {
                    x: 241,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 100
            }
        ]
    };

    function createBlock(x, y, w, h) {
        return block = {
            x: x,
            y: y,
            width: w,
            height: h,
            pos: {
                x: 168,
                y: 120
            },
            size: {
                w: 48,
                h: 102
            }
        };
    }

    function createSky(x, y, w, h) {
        return block = {
            x: x,
            y: y,
            width: w,
            height: h,
            pos: {
                x: 2,
                y: 2
            },
            size: {
                w: 150,
                h: 150
            }
        };
    }

    var MAX_FLOOR = 20;
    var floor = [];
    for (var i = 0; i < MAX_FLOOR; i++) {
        floor[i] = createBlock(i * 48, 600 - 102, 48, 102);
    }

    var bg = createSky(0, 0, 600, 500);
    var bg2 = createSky(600, 0, 600, 500);
    var rains = [];
    for (var i = 0; i < MAX_RAIN; i++) {
        rains[i] = {
            width: parseInt(Math.random() * 1 + 1),
            height: parseInt(Math.random() * 55 + 10),
            x: parseInt(Math.random() * WIDTH),
            y: parseInt(Math.random() * HEIGHT),
            speed: Math.random() * 10 + 3
        }
    }

    var lastTime = 0;
    var freq = 1000 / 30;

    var soundFX = {
        rain: new Audio("/sound/rain.mp3"),
        thunder: [
            new Audio("/sound/thunder2.mp3"),
            new Audio("/sound/thunder3.mp3")
        ]
    };
    soundFX.rain.loop = true;

    var btnThunder = document.createElement("button");
    btnThunder.textContent = "Thunder";
    btnThunder.addEventListener("click", function () {
        doThunder = !doThunder;
        if (doThunder) {
            soundFX.thunder[0].currentTime = 0.40;
            soundFX.thunder[0].volume = 1.00;
            soundFX.thunder[0].play();
            doThunder = false;
            setTimeout(function () {
                doThunder = true;
            }, 500);
        }
    }, false);

    var btnRun = document.createElement("button");
    btnRun.textContent = "Pause";
    btnRun.addEventListener("click", function () {
        isPaused = !isPaused;
        render(0);
    }, false);

    var btnStart = document.createElement("button");
    btnStart.textContent = "Start";
    btnStart.addEventListener("click", function () {
        soundFX.rain.volume = 0.5;
        soundFX.rain.play();
        btnStart.disabled = true;

        document.getElementById("ctrls").appendChild(btnThunder);
        document.getElementById("ctrls").appendChild(btnRun);
        render(0);
    }, false);

    document.getElementById("ctrls").appendChild(btnStart);
    document.getElementById("demo").appendChild(canvas2);
    document.getElementById("demo").appendChild(canvas);

    function renderBackground(time) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
//        ctx2.fillStyle = "000";
//        ctx2.fillRect(0, 0, WIDTH, HEIGHT);
//        ctx2.fill();
        ctx2.drawImage(imgs.bg, bg.pos.x, bg.pos.y, bg.size.w, bg.size.h, bg.x, bg.y, bg.width, bg.height);
        ctx2.drawImage(imgs.bg, bg2.pos.x, bg2.pos.y, bg2.size.w, bg2.size.h, bg2.x, bg2.y, bg2.width, bg2.height);

        ctx2.runCustomShader();
    }

    function renderForeground(time) {

        for (var i = 0; i < MAX_FLOOR; i++) {
            ctx.drawImage(imgs.floor, floor[i].pos.x, floor[i].pos.y, floor[i].size.w, floor[i].size.h, floor[i].x, floor[i].y, floor[i].width, floor[i].height);
        }

        var frame = megaman.frames[megaman.currFrame];
        if (time - lastTime >= frame.freq) {
            megaman.currFrame = (megaman.currFrame + 1) % megaman.frames.length;
            lastTime = time;
        }

        megaman.x += megaman.speed;
        if (megaman.x > WIDTH + megaman.width) {
            megaman.x = 0 - megaman.width;
        }

        ctx.drawImage(imgs.mm, frame.pos.x, frame.pos.y, frame.size.w, frame.size.h, megaman.x, megaman.y, frame.size.w * megaman.scale, frame.size.h * megaman.scale);

        for (var i = 0, rain; i < MAX_RAIN; i++) {
            rain = rains[i];
            rain.y = (rain.y + rain.speed) % (HEIGHT + rain.height);
            ctx.drawImage(imgs.rain, rain.x, rain.y, rain.width, rain.height);
        }

        ctx.runCustomShader();
    }

    function render(time) {
        if (!isPaused) {
            requestAnimationFrame(render);
        }

        if (time - lastTime >= freq) {
            ctx2.bindCustomShader(getAppropriateShaderProgram(Layers.BACKGROUND));
            renderBackground(time);

            ctx.bindCustomShader(getAppropriateShaderProgram(Layers.FOREGROUND));
            renderForeground(time);
        }
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

main();