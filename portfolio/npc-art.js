window.NPCArt = (() => {
  const descriptions = {
    poppy: 'Mint beret, long braids, walking boots, and a map satchel',
    june: 'Short curls, square glasses, teal overalls, and a tablet',
    bea: 'High bun, lilac artist apron, striped sleeves, and a camera',
    lumi: 'Postal cap, silver bob, navy uniform, and a letter bag',
  };
  function draw(c, id, x, y, t = 0, scale = 1) {
    const type = id.replace('npc-', ''),
      motion = typeof reduced !== 'undefined' && !reduced;
    const bob = motion
      ? Math.round(Math.sin(t * ({ poppy: 2, june: 1.3, bea: 2.5, lumi: 1.7 }[type] || 1)))
      : 0;
    c.save();
    c.translate(Math.round(x), Math.round(y));
    c.scale(scale, scale);
    c.imageSmoothingEnabled = false;
    const r = (x, y, w, h, col) => {
        c.fillStyle = col;
        c.fillRect(x, y, w, h);
      },
      ink = '#51465b',
      paper = '#fff0d9',
      shoe = '#75566a';
    r(-12, 1, 25, 4, '#66526533');
    if (type === 'poppy') {
      const skin = '#eac0a0',
        hair = '#87513f',
        mint = '#8cbaa3';
      r(-6, -7, 4, 10, skin);
      r(3, -7, 4, 10, skin);
      r(-8, 1, 8, 4, shoe);
      r(2, 1, 8, 4, shoe);
      r(-7, 0, 5, 2, '#ad8790');
      r(3, 0, 5, 2, '#ad8790');
      r(-8, -28, 17, 17, mint);
      r(-10, -16, 21, 10, mint);
      r(-7, -25, 3, 13, '#bdd8b9');
      r(-1, -26, 2, 18, '#658d7c');
      r(-2, -25, 4, 4, paper);
      r(0, -17, 2, 2, paper);
      r(0, -11, 2, 2, paper);
      r(-11, -25, 4, 13, mint);
      r(9, -25, 4, 10, mint);
      r(-11, -12, 4, 5, skin);
      r(9, -15, 4, 5, skin);
      r(-9, -41, 19, 18, hair);
      r(-7, -38, 14, 13, skin);
      r(-9, -41, 19, 7, hair);
      r(-8, -37, 4, 8, hair);
      r(-9, -28, 4, 12, hair);
      r(7, -29, 4, 13, hair);
      for (let i = 0; i < 3; i++) {
        r(-9, -27 + i * 4, 2, 2, '#bc8260');
        r(8, -27 + i * 4, 2, 2, '#bc8260');
      }
      r(-10, -17, 6, 3, '#d390ae');
      r(7, -17, 6, 3, '#d390ae');
      r(-4, -32, 2, 2, ink);
      r(3, -32, 2, 2, ink);
      r(-1, -27, 3, 1, '#b66d80');
      r(-10, -44, 18, 5, '#719c85');
      r(-6, -47, 13, 5, mint);
      r(-12, -41, 24, 3, '#a8cfb6');
      r(1, -49, 3, 3, '#719c85');
      for (let i = 0; i < 10; i++) r(-7 + i * 2, -25 + i * 2, 2, 3, '#b98a67');
      r(6, -13, 10, 13, '#bc8b69');
      r(7, -14, 8, 4, '#e1bd90');
      r(10, -7, 3, 2, paper);
      r(-16, -15, 8, 10, paper);
      r(-13, -15, 1, 10, '#96bdb1');
      r(-15, -12, 3, 2, '#da9bba');
    }
    if (type === 'june') {
      const skin = '#bd896f',
        hair = '#3e3a50',
        teal = '#608b94';
      r(-8, -17, 7, 20, teal);
      r(3, -17, 7, 20, teal);
      r(-9, 1, 9, 5, ink);
      r(2, 1, 10, 5, ink);
      r(-8, 2, 7, 1, paper);
      r(4, 2, 6, 1, paper);
      r(-6, -13, 2, 12, '#8db1b4');
      r(5, -13, 2, 12, '#8db1b4');
      r(-10, -32, 21, 17, paper);
      r(-6, -30, 4, 17, teal);
      r(4, -30, 4, 17, teal);
      r(-7, -22, 16, 13, teal);
      r(-3, -19, 8, 6, '#8fb0b0');
      r(-5, -25, 2, 2, '#d7bd85');
      r(6, -25, 2, 2, '#d7bd85');
      r(-13, -30, 4, 12, paper);
      r(11, -30, 4, 11, paper);
      r(-13, -18, 4, 7, skin);
      r(11, -19, 4, 7, skin);
      r(-7, -44, 15, 14, skin);
      r(-9, -47, 19, 9, hair);
      for (const [xx, yy] of [
        [-10, -45],
        [-7, -49],
        [-1, -50],
        [5, -48],
        [9, -44],
      ]) {
        r(xx, yy, 5, 5, hair);
        r(xx + 1, yy, 2, 1, '#696078');
      }
      r(-9, -40, 3, 7, hair);
      r(8, -40, 3, 7, hair);
      r(-7, -39, 7, 6, ink);
      r(2, -39, 7, 6, ink);
      r(-6, -38, 5, 3, '#a7c9c3');
      r(3, -38, 5, 3, '#a7c9c3');
      r(0, -37, 2, 2, ink);
      r(-3, -30, 6, 1, '#8e5863');
      r(8, -23, 11, 17, ink);
      r(10, -21, 7, 12, '#b7dbd1');
      r(11, -18, 5, 1, '#67939d');
      r(11, -15, 4, 1, '#d28eaf');
      r(12, -7, 3, 1, paper);
      r(7, -16, 4, 4, skin);
      r(-8, -44, 2, 2, '#f4d39b');
    }
    if (type === 'bea') {
      const skin = '#f2c8b0',
        hair = '#ad754f',
        lilac = '#aa86bc';
      r(-6, -6, 4, 9, skin);
      r(3, -6, 4, 9, skin);
      r(-8, 1, 8, 4, lilac);
      r(2, 1, 8, 4, lilac);
      r(-7, 1, 5, 1, paper);
      r(3, 1, 5, 1, paper);
      r(-9, -25, 19, 16, paper);
      r(-12, -23, 4, 13, paper);
      r(10, -23, 4, 13, paper);
      for (let yy = -21; yy < -10; yy += 4) {
        r(-12, yy, 4, 2, '#c1a6ce');
        r(10, yy, 4, 2, '#c1a6ce');
      }
      r(-12, -10, 4, 5, skin);
      r(10, -10, 4, 5, skin);
      r(-6, -24, 13, 18, lilac);
      r(-9, -12, 19, 7, lilac);
      r(-7, -6, 3, 2, paper);
      r(-1, -6, 3, 2, paper);
      r(5, -6, 3, 2, paper);
      r(-4, -21, 2, 3, '#d7c5df');
      r(4, -21, 2, 3, '#d7c5df');
      r(-4, -12, 10, 5, '#cdb3d6');
      r(2, -11, 2, 2, '#d77b9c');
      r(-9, -39, 19, 16, hair);
      r(-7, -36, 14, 12, skin);
      r(-9, -39, 19, 6, hair);
      r(-9, -34, 3, 10, hair);
      r(7, -34, 4, 10, hair);
      r(-6, -45, 10, 7, hair);
      r(-4, -48, 6, 4, hair);
      r(-6, -41, 13, 3, lilac);
      r(-3, -45, 2, 4, '#d3a27c');
      r(-4, -30, 2, 2, ink);
      r(3, -30, 2, 2, ink);
      r(-6, -27, 3, 2, '#e9a5a6');
      r(4, -27, 3, 2, '#e9a5a6');
      r(-1, -25, 3, 1, '#ba748a');
      r(-5, -22, 2, 8, ink);
      r(5, -22, 2, 8, ink);
      r(-7, -17, 16, 10, ink);
      r(-6, -18, 5, 3, ink);
      r(-3, -16, 8, 8, '#9ea4bb');
      r(-1, -14, 4, 4, '#526e82');
      r(0, -14, 2, 2, '#d0e3db');
      r(6, -16, 2, 2, paper);
      r(-17, -7, 6, 10, '#d8b68a');
      r(-16, -12, 1, 8, ink);
      r(-13, -10, 1, 5, roseColor());
    }
    if (type === 'lumi') {
      const skin = '#d4a080',
        silver = '#d7c8cc',
        navy = '#68718f',
        accent = '#d58eab';
      r(-7, -12, 6, 15, navy);
      r(2, -12, 6, 15, navy);
      r(-8, 1, 9, 5, ink);
      r(2, 1, 9, 5, ink);
      r(-5, -10, 1, 12, '#909bb2');
      r(4, -10, 1, 12, '#909bb2');
      r(-10, -29, 21, 19, navy);
      r(-13, -27, 4, 12, navy);
      r(11, -27, 4, 12, navy);
      r(-13, -15, 4, 5, skin);
      r(11, -15, 4, 5, skin);
      r(-4, -28, 10, 4, paper);
      r(0, -25, 3, 10, accent);
      r(-7, -17, 5, 3, '#8993aa');
      r(0, -12, 2, 2, '#eac58d');
      r(0, -18, 2, 2, '#eac58d');
      r(7, -25, 3, 3, '#eac58d');
      r(-10, -39, 21, 16, silver);
      r(-7, -38, 15, 12, skin);
      r(-11, -37, 4, 13, silver);
      r(8, -37, 4, 13, silver);
      r(-8, -40, 18, 5, silver);
      r(-10, -29, 3, 3, '#b8a6b3');
      r(9, -29, 3, 3, '#b8a6b3');
      r(-4, -32, 2, 2, ink);
      r(4, -32, 2, 2, ink);
      r(-1, -27, 4, 1, '#a35f76');
      r(-10, -45, 21, 7, navy);
      r(-7, -48, 15, 4, navy);
      r(-12, -39, 25, 4, ink);
      r(-9, -41, 20, 2, accent);
      r(-2, -45, 5, 3, '#eac58d');
      for (let i = 0; i < 10; i++) r(-8 + i * 2, -28 + i * 2, 2, 3, '#a67b65');
      r(7, -16, 13, 16, '#b18c78');
      r(8, -17, 11, 5, '#d0ae93');
      r(8, -12, 12, 2, '#8d6a63');
      r(11, -9, 4, 3, '#eac58d');
      r(-18, -20, 11, 8, paper);
      r(-17, -19, 8, 1, '#c996a8');
      r(-15, -17, 5, 1, '#c996a8');
      r(-10, -19, 2, 2, accent);
    }
    if (bob && type === 'poppy') r(-15, -11 + bob, 4, 1, '#d28ead');
    c.restore();
  }
  function roseColor() {
    return '#c97899';
  }
  function portrait(canvas, id) {
    const c = canvas.getContext('2d');
    c.clearRect(0, 0, canvas.width, canvas.height);
    draw(c, id, 32, 65, 0, 1.15);
  }
  return { draw, portrait, description: (id) => descriptions[id.replace('npc-', '')] };
})();
