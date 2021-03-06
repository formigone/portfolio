var formigone = formigone || {};
formigone.linear_regression_painting = function (t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = { i: r, l: !1, exports: {} };
        return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
    }

    var n = {};
    return e.m = t, e.c = n, e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r })
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 1)
}([function (t, e, n) {
    "use strict";

    function r(t, e) {
        for (var n = [], r = 0; r < t; r++) e instanceof Function ? n.push(e(n, r)) : n.push(e);
        return n
    }

    function o(t) {
        return "rgb(" + ((t = parseInt(t, 10)) >> 16 & 255) + "," + (t >> 8 & 255) + "," + (255 & t) + ")"
    }

    function a(t, e, n) {
        return parseInt(String("0" + Number(t).toString(16)).slice(-2) + String("0" + Number(e).toString(16)).slice(-2) + String("0" + Number(n).toString(16)).slice(-2), 16)
    }

    function i(t, e, n, o) {
        var a = r(n * o, 0);
        return a[e * n + t] = 1, a
    }

    function c(t, e) {
        var n = 0;
        return t.some(function (t, e) {
            return n = e, t > 0
        }), [n % e, parseInt(n / e, 10)]
    }

    e.a = r, e.b = o, e.e = a, e.c = i, e.d = c
}, function (t, e, n) {
    "use strict";

    function r(t, e, n) {
        var r = document.createElement("canvas");
        return r.className = n, t > 0 && (r.width = t), e > 0 && (r.height = e), r
    }

    function o(t, e, n, r, a, i) {
        i.logEl || (i.logEl = document.createElement("p"), i.container.appendChild(i.logEl));
        var u = t.width, h = t.height;
        n.train(r, a, {
            maxCost: 1e-6, learningRate: .75, epochs: 5, logCost: 0, logCallback: function (o) {
                i.epoch || (i.epoch = 0, i.costs = []), i.epoch += 50, i.costs.push([i.epoch, o.cost]), i.logEl.textContent = "Epoch: " + i.epoch + ", Cost: " + o.cost + ", Learning Rate: 0.5", r.forEach(function (r) {
                    var o = Object(c.d)(r, t.width), a = n.score(Object(c.c)(o[0], o[1], u, h));
                    e.fillStyle = Object(c.b)(a), e.fillRect(o[0], o[1], 1, 1)
                }), s && (i.costsTable ? i.costsTable.addRows([[i.epoch, o.cost]]) : (i.costs.unshift(["Epoch", "Cost"]), i.costsTable = google.visualization.arrayToDataTable(i.costs), i.chartContainer = document.createElement("div"), i.container.appendChild(i.chartContainer), i.chart = new google.visualization.LineChart(i.chartContainer)), i.epoch % 1e3 == 0 && (i.costs = [["Epoch", "Cost"]].concat(i.costs.slice(-10)), i.costsTable = google.visualization.arrayToDataTable(i.costs), i.chart = new google.visualization.LineChart(i.chartContainer)), i.chart.draw(i.costsTable, { curveType: "function" }))
            }
        }), i.running && i.costs[i.costs.length - 1][1] > 1e-6 ? setTimeout(function () {
            o(t, e, n, r, a, i)
        }, 10) : console.log("Done")
    }

    function a(t, e) {
        e instanceof HTMLElement || (e = document.body);
        var n = { running: !0, container: e }, a = document.createElement("button");
        a.textContent = "Start", a.setAttribute("disabled", "true"), a.style = "display: block;", e.appendChild(a);
        var u = new Image;
        u.addEventListener("load", function (t) {
            var s = r(this.width, this.height, "lin-reg-canvas"), u = s.getContext("2d");
            u.drawImage(this, 0, 0);
            var h = u.getImageData(0, 0, s.width, s.height);
            e.appendChild(s);
            for (var l = r(this.width, this.height, "lin-reg-canvas"), p = l.getContext("2d"), g = new i.a(this.width * this.height), f = [], d = [], m = 0, v = 0, b = h.data; m < h.height; m++) for (var C = 0; C < h.width; C++) v = 4 * m * h.width + 4 * C, f.push(Object(c.c)(C, m, this.width, this.height)), d.push([Object(c.e)(b[v], b[v + 1], b[v + 2])]);
            e.appendChild(l), a.removeAttribute("disabled"), a.addEventListener("click", function () {
                "Start" === a.textContent ? (o(l, p, g, f, d, n), a.textContent = "Pause") : "Pause" === a.textContent ? (n.running = !1, a.textContent = "Continue") : "Continue" === a.textContent && (n.running = !0, a.textContent = "Pause", o(l, p, g, f, d, n))
            })
        }), u.src = t, google.charts.load("current", { packages: ["corechart"] }), google.charts.setOnLoadCallback(function () {
            s = !0
        })
    }

    Object.defineProperty(e, "__esModule", { value: !0 });
    var i = n(2), c = n(0), s = !1;
    e.default = a
}, function (t, e, n) {
    "use strict";

    function r(t) {
        this.params = Object(o.a)(t + 1, function () {
            return Math.random()
        })
    }

    var o = n(0);
    r.prototype.train = function (t, e, n) {
        var r = this, o = n.epochs || 10, a = 0, i = n.maxCost || .05, c = n.learningRate || .05, s = n.logCost || 100,
            u = n.logCallback || function () {
            }, h = t.length, l = c / h, p = 1 / (2 * h);
        for (t = t.map(function (t) {
            return [1].concat(t)
        }); a++ < o;) {
            var g = t.map(function (t) {
                return r.score(t, !0)
            });
            if (s > 0 && a % s == 1) {
                var f = g.reduce(function (t, n, r) {
                    var o = n - e[r][0];
                    return t + o * o
                }, 0), d = p * f;
                if (Number.isNaN(d)) throw new Error("Cost exploded");
                if (d < i) break;
                u({ model: this, cost: d, epoch: a })
            }
            var m = g.map(function (t, n) {
                return t - e[n][0]
            });
            this.params = this.params.map(function (e, n) {
                return e - l * m.reduce(function (e, r, o) {
                    return e + r * t[o][n]
                }, 0)
            })
        }
    }, r.prototype.score = function (t, e) {
        if (e || (t = [1].concat(t)), t.length !== this.params.length) throw new Error("Input size mismatch. Your input must have length of " + this.params.length);
        var n = this.params;
        return t.reduce(function (t, e, r) {
            return t + e * n[r]
        }, 0)
    }, r.prototype.getParams = function () {
        return this.params
    }, r.prototype.setParams = function (t) {
        if (t.length !== this.params.length) throw new Error("Parameters size mismatch. Your list of parameters must have length of " + this.params.length);
        this.params = t
    }, e.a = r
}]);