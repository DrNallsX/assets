(() => {
  const canvas = document.getElementById('relic');
  const ctx = canvas.getContext('2d');
  const rings = document.getElementById('rings');
  const density = document.getElementById('density');
  const symmetry = document.getElementById('symmetry');
  const palette = document.getElementById('palette');
  const seed = document.getElementById('seed');
  const stateId = document.getElementById('stateId');
  const status = document.getElementById('status');
  const outputs = {
    rings: document.getElementById('ringsOut'),
    density: document.getElementById('densityOut'),
    symmetry: document.getElementById('symmetryOut')
  };

  const palettes = {
    signal: ['#4be7ff','#9c6bff','#ff4dd8','#b8fff4'],
    violet: ['#7c5cff','#a56cff','#e8c9ff','#4c2f90'],
    ember: ['#ff7b54','#ffbe55','#ff4d73','#6a243d'],
    deep: ['#6dd7ff','#146c94','#7f5af0','#0e1b2b']
  };

  function hashString(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function() {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  function params() {
    return {
      rings: +rings.value,
      density: +density.value,
      symmetry: +symmetry.value,
      palette: palette.value,
      seed: seed.value.trim() || 'GENESIS'
    };
  }

  function signature(p) {
    return `${p.seed}|${p.rings}|${p.density}|${p.symmetry}|${p.palette}`;
  }

  function stateCode(p) {
    return 'SR-' + hashString(signature(p)).toString(16).toUpperCase().padStart(8,'0');
  }

  function render() {
    const p = params();
    outputs.rings.value = p.rings;
    outputs.density.value = p.density;
    outputs.symmetry.value = p.symmetry;

    const code = stateCode(p);
    stateId.textContent = code;
    const rng = mulberry32(hashString(signature(p)));
    const colors = palettes[p.palette];
    const w = canvas.width, h = canvas.height;
    const cx = w/2, cy = h/2;

    ctx.clearRect(0,0,w,h);
    const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,w*.72);
    bg.addColorStop(0,'#121528');
    bg.addColorStop(.42,'#090b16');
    bg.addColorStop(1,'#04050a');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,w,h);

    // Subtle grid
    ctx.save();
    ctx.strokeStyle = 'rgba(130,150,210,.055)';
    ctx.lineWidth = 1;
    for (let x=60;x<w;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for (let y=60;y<h;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.restore();

    // Vectors
    ctx.save();
    ctx.translate(cx,cy);
    for (let i=0;i<p.density;i++) {
      const angle = (Math.PI*2*i/p.density) + (rng()-.5)*.02;
      const inner = 115 + rng()*55;
      const outer = 390 + rng()*90;
      const color = colors[i % colors.length];
      ctx.strokeStyle = color + '80';
      ctx.lineWidth = .9 + rng()*2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle)*inner, Math.sin(angle)*inner);
      ctx.lineTo(Math.cos(angle)*outer, Math.sin(angle)*outer);
      ctx.stroke();
    }
    ctx.restore();

    // Rings
    for (let r=0;r<p.rings;r++) {
      const radius = 105 + r*(300/Math.max(1,p.rings-1));
      ctx.strokeStyle = colors[r % colors.length] + (r % 2 ? '8F':'C0');
      ctx.lineWidth = 1.5 + (r%3)*.8;
      ctx.beginPath();
      ctx.arc(cx,cy,radius,0,Math.PI*2);
      ctx.stroke();
    }

    // Symmetry polygon layers
    ctx.save();
    ctx.translate(cx,cy);
    for (let layer=0; layer<4; layer++) {
      const radius = 95 + layer*50;
      ctx.rotate((rng()-.5)*.2);
      ctx.strokeStyle = colors[(layer+1)%colors.length] + 'D0';
      ctx.fillStyle = colors[layer%colors.length] + (layer===0 ? '2A':'10');
      ctx.lineWidth = 2 + layer*.7;
      ctx.beginPath();
      for (let i=0;i<p.symmetry;i++) {
        const a = Math.PI*2*i/p.symmetry - Math.PI/2;
        const rr = radius*(.86 + rng()*.14);
        const x = Math.cos(a)*rr, y = Math.sin(a)*rr;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.fill(); ctx.stroke();
    }
    ctx.restore();

    // Core
    const g = ctx.createRadialGradient(cx,cy,0,cx,cy,95);
    g.addColorStop(0, colors[0]+'E8');
    g.addColorStop(.45, colors[1]+'88');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();ctx.arc(cx,cy,100,0,Math.PI*2);ctx.fill();
    ctx.fillStyle = '#f7fbff';
    ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();

    writeUrl(p);
  }

  function writeUrl(p) {
    const u = new URL(location.href);
    u.searchParams.set('seed',p.seed);
    u.searchParams.set('r',p.rings);
    u.searchParams.set('d',p.density);
    u.searchParams.set('s',p.symmetry);
    u.searchParams.set('p',p.palette);
    history.replaceState(null,'',u);
  }

  function loadUrl() {
    const q = new URLSearchParams(location.search);
    if(q.has('seed')) seed.value = q.get('seed').slice(0,32);
    if(q.has('r')) rings.value = Math.min(12,Math.max(3,+q.get('r')||7));
    if(q.has('d')) density.value = Math.min(96,Math.max(12,+q.get('d')||48));
    if(q.has('s')) symmetry.value = Math.min(12,Math.max(3,+q.get('s')||8));
    if(q.has('p') && palettes[q.get('p')]) palette.value = q.get('p');
  }

  function newSeed() {
    const bytes = new Uint32Array(2);
    crypto.getRandomValues(bytes);
    seed.value = (bytes[0].toString(36)+bytes[1].toString(36)).toUpperCase().slice(0,12);
    render();
    status.textContent = `New deterministic state: ${stateId.textContent}`;
  }

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(location.href);
      status.textContent = `Share link copied for ${stateId.textContent}`;
    } catch {
      status.textContent = 'Copy unavailable. Use your browser Share action.';
    }
  }

  function track(name) {
    try {
      window.dispatchEvent(new CustomEvent('signalrelics:analytics',{detail:{event:name,state:stateId.textContent}}));
    } catch {}
  }

  ['input','change'].forEach(evt => {
    [rings,density,symmetry,palette,seed].forEach(el => el.addEventListener(evt, render));
  });
  document.getElementById('newState').addEventListener('click',()=>{newSeed();track('new_state');});
  document.getElementById('shareState').addEventListener('click',()=>{copyShare();track('share');});
  document.querySelectorAll('[data-track]').forEach(el => el.addEventListener('click',()=>track(el.dataset.track)));

  loadUrl();
  render();
  track('lab_open');
})();
