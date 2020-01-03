(function main(doc, containerId) {
  let globalTimer;

  /**
   *
   * @param {number} i
   * @param {Array<Array<number, number>>} line
   * @param ctx
   * @param styles
   */
  function plotLine(i, line, ctx, styles) {
    if (i >= line.length) {
      return;
    }

    if (styles) {
      Object.keys(styles).forEach((key) => {
        ctx[key] = styles[key];
      })
    }

    ctx.beginPath();
    ctx.moveTo(line[Math.max(0, i - 1)][0], line[Math.max(0, i - 1)][1]);
    ctx.lineTo(line[i][0], line[i][1]);
    ctx.stroke();

    globalTimer = setTimeout(() => {
      plotLine(i + 1, line, ctx, styles);
    }, 1);
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

  // const Y = [[canvas.width / 10, canvas.height / 2]];
  const Y = [];
  for (let i = 0; i <= 1; i += 0.01) {
    if (i > 0.9) {
      break;
    }

    const pt = [i * canvas.width + canvas.width * 0.05];
    pt.push(Math.sin(i * 25) * canvas.height / 4 + canvas.height / 2);
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
    plotLine(0, Y, ctx, { strokeStyle: '#c00', lineWidth: 5, lineCap: 'round' });
  });

  container.appendChild(btn);
  container.appendChild(canvas);
}(document, 'demoContainer'));
