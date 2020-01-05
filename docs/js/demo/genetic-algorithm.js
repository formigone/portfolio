(function main(doc, containerId) {
  let globalTimer;

  /**
   *
   * @param {number} i
   * @param {Array<Array<number, number>>} line
   * @param ctx
   * @param styles
   * @param {Function} cb
   */
  function plotLine(i, line, ctx, styles, cb) {
    if (i >= line.length) {
      if (cb) {
        cb();
      }
      return;
    }

    if (styles) {
      Object.keys(styles).forEach((key) => {
        ctx[key] = styles[key];
      })
    }

    ctx.beginPath();
    ctx.moveTo(line[Math.max(0, i - 1)].x, line[Math.max(0, i - 1)].y);
    ctx.lineTo(line[i].x, line[i].y);
    ctx.stroke();

    globalTimer = setTimeout(() => {
      plotLine(i + 1, line, ctx, styles, cb);
    }, 1);
  }

  function plotLineGroup(line, ctx, styles) {
    if (styles) {
      Object.keys(styles).forEach((key) => {
        ctx[key] = styles[key];
      })
    }

    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    for (let i = 1; i < line.length; i++) {
      ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
  }

  function pointFrom(x, y, angle, distance) {
    return {
      x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
      y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y),
    };
  }

  /**
   *
   * @param {Array<Array<number, number>>}target
   * @param {number} populationSize
   */
  function start(target, populationSize = 10000) {
    // let x = 100, y = canvas.height / 2;
    // for (let i = 0; i < 10; i += 1) {
    //   let pt = pointFrom(x, y, pts[i][1], pts[i][0]);
    //   ctx.beginPath();
    //   ctx.lineWidth = 10;
    //   ctx.moveTo(x, y);
    //   ctx.lineTo(pt.x, pt.y);
    //   ctx.stroke();
    //   x = pt.x;
    //   y = pt.y;
    // }
    const population = initPopulation(populationSize, target.length);

    function step(i, total) {
      if (i > total) {
        return;
      }

      fit(population, target);

      population.sort((a, b) => {
        if (a.totalFitness > b.totalFitness) {
          return 1;
        }

        if (a.totalFitness < b.totalFitness) {
          return -1;
        }

        return 0;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      plotLineGroup(Y, ctx, { strokeStyle: '#84ccb3', lineWidth: 25, lineCap: 'round', miterLimit: 100 });
      population.forEach((instance, j) => {
        if (j > 25) {
          return;
        }
        plotLineGroup(instance.map((row) => row.pt), ctx, { strokeStyle: `rgba(10, 10, 10, ${1 - j / 25})`, lineWidth: 5, lineCap: 'round', miterLimit: 100 });
      });

      crossover(population);

      label.textContent = ` Fitness: ${Number.parseInt(population[0].totalFitness)}; Generation: ${i}`;
      setTimeout(() => {
        step(i + 1, total);
      }, 100);
    }

    step(0, 5000);
  }

  function crossover(population) {
    population.forEach((instance, i) => {
      if (i > population.length - 2) {
        return;
      }

      const next = population[i + 1];
      instance.forEach((row, j) => {
        if (j % 2 === 0) {
          population[i][j] = next[j];
        }

        if (Math.random() > 0.995) {
          instance[j].distance = (instance[j].distance + 1) % 500;
        }

        if (Math.random() > 0.995) {
          instance[j].angle = (instance[j].angle + 1) % 360;
        }
      });
    });
  }

  function fit(population, target) {
    population.forEach((instance, i) => {
      let x = target[0].x;
      let y = target[0].y;
      let totalFitness = 0;
      instance.forEach((row, j) => {
        if (j === 0) {
          row.fitness = 0;
        } else {
          const tj = target[j];
          const pt = pointFrom(x, y, instance[j - 1].angle, instance[j - 1].distance);
          x = pt.x;
          y = pt.y;
          row.fitness = Math.sqrt(Math.pow(tj.x - pt.x, 2) + Math.pow(tj.y - pt.y, 2));
        }

        row.pt = { x, y };
        totalFitness += row.fitness;
      });

      instance.totalFitness = totalFitness;
    });
  }

  function initPopulation(populationSize, instanceSize) {
    return Array.apply(null, new Array(populationSize)).map(() => {
      return Array.apply(null, new Array(instanceSize)).map(() => ({
        distance: Number.parseInt(Math.random() * 300),
        angle: Number.parseInt(Math.random() * 360),
        fitness: null,
      }));
    });
  }

  const container = doc.getElementById(containerId);
  if (!container) {
    console.error(`Could not find demo container "${containerId}`);
    return;
  }

  const canvas = doc.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 900;
  canvas.style.width = '100%';
  canvas.style.boxShadow = '0 2px 4px #ccc';

  const ctx = canvas.getContext('2d');

  const Y = [];
  for (let i = 0; i <= 1; i += 0.01) {
    if (i > 0.9) {
      break;
    }

    const pt = {
      x: i * canvas.width + canvas.width * 0.05,
      y: Math.sin(i * 25) * canvas.height / 4 + canvas.height / 2,
    };
    Y.push(pt);
  }

  const btn = doc.createElement('button');
  btn.type = 'button';
  btn.style.background = '#ddd';
  btn.style.padding = '0.5em';
  btn.style.margin = '0 0 1em';
  btn.textContent = 'Start';

  btn.addEventListener('click', () => {
    clearTimeout(globalTimer);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plotLine(0, Y, ctx, { strokeStyle: '#84ccb3', lineWidth: 25, lineCap: 'round', miterLimit: 100 }, () => {
      const Y2 = Y.reduce((acc, row, i) => {
        if (i % 3 == 0 || i == Y.length - 1) {
          acc.push(row);
        }
        return acc;
      }, []);

      start(Y2);
    });
  });

  const label = doc.createElement('span');

  container.appendChild(btn);
  container.appendChild(label);
  container.appendChild(canvas);
}(document, 'demoContainer'));
