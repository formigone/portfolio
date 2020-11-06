(function main(doc, containerId) {
  let globalTimer;
  let stepTimer;

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
  function start(target, populationSize = 1000) {
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
    let population = initPopulation(populationSize, target.length);

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

      const totalFitness = population.reduce((acc, instance) => acc + (1 / instance.totalFitness), 0);
      const fitnessProbs = population.map((instance) => (1 / instance.totalFitness) / totalFitness);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      plotLineGroup(Y, ctx, { strokeStyle: '#84ccb3', lineWidth: 25, lineCap: 'round', miterLimit: 100 });
      population.slice(population.length - 20).forEach((instance, j) => {
        plotLineGroup(instance.map((row) => row.pt), ctx, {
          strokeStyle: `rgba(150, 120, 120, ${j / 20 - 0.45})`,
          lineWidth: 45,
          lineCap: 'round',
          miterLimit: 100
        });
      });
      population.slice(population.length - 50, population.length - 40).forEach((instance, j) => {
        plotLineGroup(instance.map((row) => row.pt), ctx, {
          strokeStyle: `rgba(150, 100, 100, ${j / 18 - 0.45})`,
          lineWidth: 35,
          lineCap: 'round',
          miterLimit: 100
        });
      });
      population.slice(20, 30).forEach((instance, j) => {
        plotLineGroup(instance.map((row) => row.pt), ctx, {
          strokeStyle: `rgba(50, 10, 10, ${j / 10 - 0.5})`,
          lineWidth: 25,
          lineCap: 'round',
          miterLimit: 100
        });
      });
      population.slice(0, 10).forEach((instance, j) => {
        plotLineGroup(instance.map((row) => row.pt), ctx, {
          strokeStyle: `rgba(10, 0, 0, ${1 - j / 10})`,
          lineWidth: 3,
          lineCap: 'round',
          miterLimit: 100
        });
      });

      label.textContent = ` Fitness: ${Number.parseInt(population[0].totalFitness)}; Generation: ${i}`;
      population = crossover(population, fitnessProbs);

      stepTimer = setTimeout(() => {
        step(i + 1, total);
      }, 10);
    }

    step(0, Number.MAX_SAFE_INTEGER - 100);
  }

  /**
   *
   * @param {Array<Object>} population
   * @param {Array<number>} probs List of probabilities for each instance of the population
   */
  function crossover(population, probs) {
    return population.map(() => {
      const A = weight_random(population, probs);
      let B = A;
      while (A === B) {
        B = weight_random(population, probs);
      }

      return A.map((row, i) => {
        let gene = Object.assign({}, row);
        if (i % 2 === 0) {
          gene = Object.assign({}, B[i]);
        }

        if (Math.random() > 0.985) {
          gene.distance = Number.parseInt(Math.random() * 600 - 300);
        }

        if (Math.random() > 0.985) {
          gene.angle = Number.parseInt(Math.random() * 350);
        }

        return gene;
      });
    });
  }

  /**
   * Returns a value from `values` with a probability of values[n] := probs[n]
   * @param {Array<number>} values
   * @param {Array<number>} probs
   * @returns {number}
   */
  function weight_random(values, probs) {
    console.assert(values.length === probs.length);
    let rnd = Math.random();
    let i = 0;
    while (rnd >= 0 && i < values.length) {
      rnd -= probs[i];
      i += 1;
    }
    return values[i - 1];
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
        distance: Number.parseInt(Math.random() * 600 - 300),
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

  let Y = [];
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

  let touchDown = false;

  const setTouch = (val) => (event) => {
    if (val) {
      document.body.style.overflow = 'hidden';
      Y = [];
      clearTimeout(globalTimer);
      clearTimeout(stepTimer);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      document.body.style.overflow = 'auto';
      if (Y.length === 0) {
        return;
      }

      const Y2 = Y.reduce((acc, row, i) => {
        if (i % 2 === 0 || i === Y.length - 1) {
          acc.push(row);
        }
        return acc;
      }, []);

      start(Y2);
    }
    touchDown = val;
  };

  const onTouchMove = (event) => {
    if (!touchDown) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (!event.clientX && event.touches) {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
    }
    Y.push({
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    });

    plotLineGroup(Y, ctx, { strokeStyle: '#84ccb3', lineWidth: 25, lineCap: 'round', miterLimit: 100 });
  };

  canvas.addEventListener('touchstart', setTouch(true));
  canvas.addEventListener('mousedown', setTouch(true));
  canvas.addEventListener('touchend', setTouch(false));
  canvas.addEventListener('mouseup', setTouch(false));

  canvas.addEventListener('touchmove', onTouchMove);
  canvas.addEventListener('mousemove', onTouchMove);

  const btnStart = doc.createElement('button');
  btnStart.type = 'button';
  btnStart.style.background = '#ddd';
  btnStart.style.padding = '0.5em';
  btnStart.style.margin = '0 0 1em';
  btnStart.textContent = 'Start';

  const btnStop = doc.createElement('button');
  btnStop.type = 'button';
  btnStop.style.background = '#ddd';
  btnStop.style.padding = '0.5em';
  btnStop.style.margin = '0 0 1em';
  btnStop.textContent = 'Stop';

  btnStop.addEventListener('click', () => {
    clearTimeout(globalTimer);
    clearTimeout(stepTimer);
  });
  btnStart.addEventListener('click', () => {
    clearTimeout(globalTimer);
    clearTimeout(stepTimer);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plotLine(0, Y, ctx, { strokeStyle: '#84ccb3', lineWidth: 25, lineCap: 'round', miterLimit: 100 }, () => {
      const Y2 = Y.reduce((acc, row, i) => {
        if (i % 3 === 0 || i === Y.length - 1) {
          acc.push(row);
        }
        return acc;
      }, []);

      start(Y2);
    });
  });

  const label = doc.createElement('span');

  container.appendChild(btnStart);
  container.appendChild(btnStop);
  container.appendChild(label);
  container.appendChild(canvas);
}(document, 'demoContainer'));
