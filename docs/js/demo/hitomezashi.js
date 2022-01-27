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

  document.getElementById(containerId).appendChild(canvas);
}('demoContainer'));
