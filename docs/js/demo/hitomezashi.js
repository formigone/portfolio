(function main(containerId) {
  let ptHor = window.innerWidth / 12;
  let ptVer = window.innerHeight / 12;
  const lineWidth = 1;
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  let rows = [];
  let cols = [];
  let pts = [];
  let init = false;
  let clicked = false;

  async function render() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const hs = canvas.width / ptHor;
    const vs = canvas.height / ptVer;
    ctx.fillStyle = '#aaa';

      if (init) {
        for (let y = 0; y < ptVer; y++) {
          for (let x = 0; x < ptHor; x++) {
            ctx.fillRect(x * hs, y * vs, rows[y] ? (x % 2 === 0 ? lineWidth : vs) : (x % 2 !== 0 ? lineWidth : vs), lineWidth);
            ctx.fillRect(x * hs, y * vs, lineWidth, cols[x] ? (y % 2 === 0 ? lineWidth : hs) : (y % 2 !== 0 ? lineWidth : hs));
          }
        }
      } else {
          let x, y;
          for (let i = 0; i < pts.length; i++) {
            [x, y] = pts[i];
            ctx.fillRect(x * hs, y * vs, rows[y] ? (x % 2 === 0 ? lineWidth : vs) : (x % 2 !== 0 ? lineWidth : vs), lineWidth);
            ctx.fillRect(x * hs, y * vs, lineWidth, cols[x] ? (y % 2 === 0 ? lineWidth : hs) : (y % 2 !== 0 ? lineWidth : hs));
            if (i % 256 === 0) {
              await new Promise((r) => {
                setTimeout(r, 1);
              });
            }
          }
          init = true;
      }
  
  }

  let size = 12;
  let sizeDir = 0.05;

  async function updateState() {
    for (let x = 0; x < ptHor; x++) {
      cols[x] = Math.random() > 0.5;
    }
    
    for (let y = 0; y < ptVer; y++) {
      rows[y] = Math.random() > 0.75;
    }
    
    if (!init) {
      pts = [];
      for (let y = 0; y < ptVer; y++) {
        for (let x = 0; x < ptHor; x++) {
          pts.push([x, y]);
        }
      }
      shuffle(pts);
    }
    render();
  }

  let next = 0;
  let inner = 0;
  canvas.addEventListener('click', () => {
    clicked = true;
    clearTimeout(next);
    clearTimeout(inner);
    next = setTimeout(async () => {
      for (let i = 0; i < 15; i++) {
        size += sizeDir;
        ptHor = window.innerWidth / size;
        ptVer = window.innerHeight / size;
        cols = [];
        rows = [];
        updateState();
        if (size > 25) {
          sizeDir = -0.05;
        } else if (size < 10) {
          sizeDir = 1.05;
        }
        await new Promise((r) => {
          inner = setTimeout(() => r(), 25);
        });
      }
    }, 50);
  });

  updateState();
  render();

    function shuffle(array) {
      let currentIndex = array.length, randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }
  
  function renderRaw(data, ctx) {
      ctx.putImageData(new ImageData(new Uint8ClampedArray(data.data), canvas.width), 0, 0);
    }

    function getVal(data, x, y, width, height) {
      return data[y * width * 4 + x * 4];
    }

    let CT = 0;
    const CACHE = {};
    let renderTimer = 0;
    let iterTimer = 0;

    function fill(data, x, y, newVal, oldVal, width, height) {
      const cacheKey = `${x},${y}`;
      
      clearTimeout(renderTimer);

      renderTimer = setTimeout(() => {
        render({ data }, ctx);
      }, 10);
      
      if (CACHE[cacheKey]) {
        return;
      }

      CACHE[cacheKey] = true;
      CT += 1;

      if (x < 0 || x >= width) {
        return;
      }

      if (y < 0 || y >= height) {
        return;
      }

      const val = getVal(data, x, y, canvas.width, canvas.height);

      if (val === newVal) {
        return;
      }

      if (val !== oldVal) {
        return;
      }

      data[y * width * 4 + x * 4] = newVal;
      data[y * width * 4 + x * 4 + 1] = 10;
      data[y * width * 4 + x * 4 + 2] = 10;

      iterTimer = setTimeout(() => {
        fill(data, x - 1, y, newVal, oldVal, width, height);
        fill(data, x + 1, y, newVal, oldVal, width, height);
        fill(data, x, y - 1, newVal, oldVal, width, height);
        fill(data, x, y + 1, newVal, oldVal, width, height);
      }, 0);
    }
  
  setTimeout(() => {
    if (clicked) {
      return;
    }
    
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    fill(data.data, 4, 4, 250, 255, data.width, data.height);
    console.log('Flooded', CT);
    renderRaw(data, ctx);
  }, 5000);

  document.getElementById(containerId).appendChild(canvas);
}('demoContainer'));
