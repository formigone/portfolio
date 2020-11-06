function calculatePath(map, startPos, targetPos, algorithm) {
    function Queue(optElements) {
        if (optElements instanceof Array) {
            this.items = optElements;
        } else {
            this.items = [];
        }

        this.length = this.items.length;
    }

    Queue.prototype.enqueue = function (item) {
        this.length += 1;
        return this.items.push(item);
    };

    Queue.prototype.dequeue = function () {
        if (this.length > 0) {
            this.length -= 1;
        }

        return this.items.shift();
    };

    function Stack() {
        this.items = [];
        this.length = this.items.length;
    }

    Stack.prototype.push = function (item) {
        this.length += 1;
        return this.items.push(item);
    };

    Stack.prototype.pop = function () {
        if (this.length > 0) {
            this.length -= 1;
        }

        return this.items.pop();
    };

    Stack.prototype.top = function () {
        if (this.length > 0) {
            return this.items[this.length - 1];
        }

        return undefined;
    };

    var Node = function (id, adj) {
        this.id = id;
        this.adj = adj;
    };

    function makeGraph(map, width, height) {
        var graph = [];

        for (var y = 1; y < height - 1; y++) {
            for (var x = 1; x < width - 1; x++) {
                if (map[y][x] === 1) {
                    continue;
                }

                var adj = [];

                if (map[y - 1][x] === 0) {
                    adj.push('' + x + ',' + (y - 1));
                }

                if (map[y + 1][x] === 0) {
                    adj.push('' + x + ',' + (y + 1));
                }

                if (map[y][x - 1] === 0) {
                    adj.push('' + (x - 1) + ',' + y);
                }

                if (map[y][x + 1] === 0) {
                    adj.push('' + (x + 1) + ',' + y);
                }

                graph.push(new Node('' + x + ',' + y, adj));
            }
        }

        return graph;
    }

    function getNodeById(graph, nodeId) {
        return graph.reduce(function (out, node) {
            if (node.id === nodeId) {
                out = node;
            }

            return out;
        });
    }

    var graph = makeGraph(map.data, map.width, map.height);
    var startNode = getNodeById(graph, startPos);
    var targetNode = getNodeById(graph, targetPos);
    var path = [];
    var curNode = startNode;

// depth-first
    if (algorithm === 'depth-first') {
        var stack = new Stack();
        stack.push(startNode);

        while (true) {
            curNode = stack.top();
            path.push(curNode.id);
            curNode.visited = true;

            if (curNode.id === targetNode.id) {
                break;
            }

            var unvisited = 0;
            curNode.adj.forEach(function (id) {
                var node = getNodeById(graph, id);
                if (!node.visited) {
                    stack.push(node);
                    unvisited += 1;
                }
            });

            if (unvisited === 0) {
                stack.pop();
            }
        }
    } else if (algorithm === 'breadth-first') {
        var queue = new Queue();
        queue.enqueue(startNode);

        while (true) {
            curNode = queue.dequeue();
            curNode.visited = true;
            path.push(curNode.id);

            if (curNode.id === targetNode.id) {
                break;
            }

            curNode.adj.forEach(function (id) {
                var node = getNodeById(graph, id);

                if (!node.visited) {
                    node.visited = true;
                    queue.enqueue(node);
                }
            });
        }
    }

    return path;
}

function fetchMaze(path) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.responseText);
            }
        };

        xhr.open('get', path, true);
        xhr.send();
    });
}


function makeRenderer(map, primaryColor, secondaryColor) {
    var canvas = document.createElement('canvas');
    canvas.width = map.cellWidth * map.width;
    canvas.height = map.cellHeight * map.height;

    return {
        canvas: canvas,
        ctx: canvas.getContext('2d'),
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
    };
}

function makeMap(mapData, cellWidth, cellHeight) {
    return {
        data: mapData,
        width: mapData[0].length,
        height: mapData.reduce(function (acc, row) {
            return acc + 1;
        }, 0),
        cellWidth: cellWidth,
        cellHeight: cellHeight
    };
}

function drawMap(renderer, map) {
    var ctx = renderer.ctx;
    var canvas = renderer.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < map.height; y++) {
        for (var x = 0; x < map.width; x++) {
            var cellType = map.data[y][x];

            if (cellType === 1) {
                ctx.fillStyle = renderer.secondaryColor;//'#333';
            } else {
                ctx.fillStyle = renderer.primaryColor;//'#c00';
            }

            ctx.fillRect(x * map.cellWidth, y * map.cellHeight, map.cellWidth, map.cellHeight);
        }
    }
}

function makePoint(pt) {
    return pt.split(',')
        .map(function (v) {
            return v | 0;
        });
}

function drawPath(renderer, point, width, height, color) {
// var point = makePoint(obj.path[index]);
    renderer.ctx.fillStyle = color;//'#fff';
    renderer.ctx.fillRect(point[0] * width, point[1] * height, width, height);
}

function drawPoint(renderer, point, width, height, useOnColor, onColor, offColor) {
    var ctx = renderer.ctx;
    var color = offColor;

    ctx.save();
    ctx.globalAlpha = 1.0;

    if (useOnColor) {
        color = onColor;
    }

    drawPath(renderer, point, width, height, color);
    ctx.restore();
}

function go(slider, path, renderer, map, start, target) {
    var pos = 0;

    function render() {
        if (pos < path.length) {
            drawPath(renderer, makePoint(path[pos]), map.cellWidth, map.cellHeight, '#fff');
        } else {
            drawPath(renderer, target, map.cellWidth, map.cellHeight, '#0f0');
            return;
        }

        pos += 1;
        setTimeout(render, slider.value);

        drawPoint(renderer, target, map.cellWidth, map.cellHeight, pos % 50 > 30, '#0c0', '#c00');
    }

    renderer.ctx.globalAlpha = 0.55;

    return render();
}

const _maps = [
    'maze-001.json',
    'maze-002.json',
    'maze-003.json',
];

const _targetPos = [
    '1,25',
    '17,27',
    '17,17',
];

let rndIndex = parseInt(Math.random() * 1000) % _maps.length;
const _map = _maps[rndIndex];
const targetPos = _targetPos[rndIndex];

const _startPos = [
    '1,1',
    '15,17',
    '37,29',
    '20,39',
    '39,39',
];
rndIndex = parseInt(Math.random() * 1000) % _startPos.length;
const startPos = _startPos[rndIndex];

fetchMaze(`/js/demo/${_map}`)
    .then(function (mapData) {
        var map = makeMap(JSON.parse(mapData), 19, 19);
        var renderer = makeRenderer(map, '#c00', '#333');
        var algorithm = 'depth-first';

        var path = [];//calculatePath(map, startPos, targetPos, algorithm);

        document.getElementById('demo').appendChild(renderer.canvas);
        drawMap(renderer, map);
        drawPath(renderer, makePoint(startPos), map.cellWidth, map.cellHeight, '#fff');
        drawPath(renderer, makePoint(targetPos), map.cellWidth, map.cellHeight, '#0f0');

        var btn01 = document.createElement('button');
        btn01.textContent = 'Depth-first';
        btn01.addEventListener('click', start.bind(null, 'depth-first'));
        document.getElementById('ctrls').appendChild(btn01);

        var btn01 = document.createElement('button');
        btn01.textContent = 'Breadth-first';
        btn01.addEventListener('click', start.bind(null, 'breadth-first'));
        document.getElementById('ctrls').appendChild(btn01);

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.step = 5;
        slider.value = 10;
        document.getElementById('ctrls').appendChild(slider);

        var label = document.createElement('span');
        label.textContent = slider.value;
        document.getElementById('ctrls').appendChild(label);

        slider.addEventListener('change', function () {
            label.textContent = this.value;
        });

        // go(50, path, renderer, map, makePoint(startPos), makePoint(targetPos));

        function start(algorithm) {
            path = calculatePath(map, startPos, targetPos, algorithm);
            go(slider, path, renderer, map, makePoint(startPos), makePoint(targetPos));
        }
    });
