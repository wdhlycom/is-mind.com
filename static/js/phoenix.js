// ===== Metatron's Cube — Sacred Geometry Animation =====
(function(){
  var canvas = document.getElementById('phoenix-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, cx, cy, R;
  var time = 0;
  var lightParticles = [];
  var NUM_PARTICLES = 60;

  // Colors inspired by chakra spectrum — rich, luminous
  var colors = [
    [255, 210, 70],   // Gold
    [100, 180, 255],  // Sky blue
    [180, 120, 255],  // Violet
    [255, 120, 160],  // Rose
    [90, 210, 170],   // Teal
    [255, 180, 90],   // Amber
    [140, 200, 255],  // Ice blue
  ];

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    cx = W / 2;
    cy = H / 2;
    R = Math.min(W, H) * 0.32;
  }
  resize();
  window.addEventListener('resize', resize);

  // === Geometry: 13 points of Metatron's Cube ===
  function getPoints() {
    var pts = [];
    // Center
    pts.push([cx, cy]);
    // Inner ring — 6 petals at distance 2R/3
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI / 180) * (60 * i - 90);
      pts.push([cx + (2*R/3) * Math.cos(a), cy + (2*R/3) * Math.sin(a)]);
    }
    // Outer ring — 6 at distance 2R/3 * sqrt(3) ≈ 1.155*R
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI / 180) * (60 * i - 60);
      pts.push([cx + (2*R/3)*Math.sqrt(3) * Math.cos(a), cy + (2*R/3)*Math.sqrt(3) * Math.sin(a)]);
    }
    return pts;
  }

  // === Build line segments (edges connecting all adjacent nodes) ===
  function getEdges(pts) {
    var edges = [];
    // Connect all center to inner
    for (var i = 1; i <= 6; i++) edges.push([0, i]);
    // Connect inner ring neighbors
    for (var i = 1; i <= 6; i++) {
      edges.push([i, i === 6 ? 1 : i + 1]);
    }
    // Connect inner to outer
    for (var i = 1; i <= 6; i++) {
      var oi = i + 6;
      // Each inner connects to two outer
      edges.push([i, oi]);
      edges.push([i, i === 6 ? 7 : oi + 1]);
    }
    // Connect outer ring neighbors
    for (var i = 7; i <= 12; i++) {
      edges.push([i, i === 12 ? 7 : i + 1]);
    }
    // Outer ring to outer ring (skip one)
    for (var i = 7; i <= 12; i++) {
      var skip = i + 2;
      if (skip > 12) skip -= 6;
      edges.push([i, skip]);
    }
    // Outer to center
    for (var i = 7; i <= 12; i++) edges.push([0, i]);
    return edges;
  }

  // === Light particles moving along edges ===
  function createParticle(edges, pts) {
    var e = edges[Math.floor(Math.random() * edges.length)];
    var t = Math.random();
    return {
      edge: e,
      t: t,
      speed: Math.random() * 0.004 + 0.002,
      color: colors[Math.floor(Math.random() * colors.length)],
      tail: []
    };
  }

  function initParticles() {
    lightParticles = [];
    var pts = getPoints();
    var edges = getEdges(pts);
    for (var i = 0; i < NUM_PARTICLES; i++) {
      lightParticles.push(createParticle(edges, pts));
    }
  }
  initParticles();

  var pts, edges;

  function getEdgePos(edge, t) {
    var a = pts[edge[0]], b = pts[edge[1]];
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  }

  function drawBackground() {
    ctx.fillStyle = 'rgba(0,0,0,0.0)';
    ctx.clearRect(0, 0, W, H);
  }

  function drawGeometry() {
    ctx.save();

    // Slow rotation
    var rot = time * 0.0004;
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.translate(-cx, -cy);

    pts = getPoints();
    edges = getEdges(pts);

    var baseAlpha = 0.15 + Math.sin(time * 0.01) * 0.04;

    // === Circles at each node ===
    for (var i = 0; i < 13; i++) {
      var r = (i === 0) ? R * 0.12 : (i <= 6 ? R * 0.12 : R * 0.12);
      // Glow
      var grad = ctx.createRadialGradient(pts[i][0], pts[i][1], r*0.3, pts[i][0], pts[i][1], r*1.8);
      grad.addColorStop(0, 'rgba(255,220,100,0.15)');
      grad.addColorStop(0.4, 'rgba(180,150,220,0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pts[i][0], pts[i][1], r*1.8, 0, Math.PI*2);
      ctx.fill();

      // Circle stroke
      ctx.strokeStyle = 'rgba(200,180,150,' + (baseAlpha + 0.08) + ')';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(pts[i][0], pts[i][1], r, 0, Math.PI*2);
      ctx.stroke();

      // Node glow dot
      var nodeGrad = ctx.createRadialGradient(pts[i][0], pts[i][1], 0, pts[i][0], pts[i][1], r*0.25);
      nodeGrad.addColorStop(0, 'rgba(255,235,160,0.9)');
      nodeGrad.addColorStop(0.5, 'rgba(255,210,90,0.4)');
      nodeGrad.addColorStop(1, 'rgba(255,180,40,0)');
      ctx.fillStyle = nodeGrad;
      ctx.beginPath();
      ctx.arc(pts[i][0], pts[i][1], r*0.25, 0, Math.PI*2);
      ctx.fill();
    }

    // === Outer bounding circle ===
    ctx.strokeStyle = 'rgba(200,180,150,' + (baseAlpha + 0.1) + ')';
    ctx.lineWidth = 2.0;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI*2);
    ctx.stroke();
    ctx.setLineDash([]);

    // === Edge lines ===
    for (var i = 0; i < edges.length; i++) {
      var a = pts[edges[i][0]], b = pts[edges[i][1]];
      ctx.strokeStyle = 'rgba(180,160,140,' + (baseAlpha + 0.05) + ')';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
    }

    // === Center sun ===
    var sunGrad = ctx.createRadialGradient(cx, cy, R*0.03, cx, cy, R*0.15);
    sunGrad.addColorStop(0, 'rgba(255,240,180,0.7)');
    sunGrad.addColorStop(0.3, 'rgba(255,210,100,0.3)');
    sunGrad.addColorStop(0.6, 'rgba(200,150,60,0.08)');
    sunGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R*0.15, 0, Math.PI*2);
    ctx.fill();

    // Pulse ring
    var pulseAlpha = 0.12 + Math.sin(time * 0.015) * 0.06;
    ctx.strokeStyle = 'rgba(255,220,120,' + pulseAlpha + ')';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R*0.18, 0, Math.PI*2);
    ctx.stroke();

    ctx.restore();
  }

  function drawLightParticles() {
    var rot = time * 0.0004;
    for (var i = 0; i < lightParticles.length; i++) {
      var p = lightParticles[i];
      p.t += p.speed;
      if (p.t > 1.0) {
        p.t = 0;
        p.edge = edges[Math.floor(Math.random() * edges.length)];
        p.color = colors[Math.floor(Math.random() * colors.length)];
      }

      // Interpolate along edge
      var a = pts[p.edge[0]], b = pts[p.edge[1]];
      var px = a[0] + (b[0] - a[0]) * p.t;
      var py = a[1] + (b[1] - a[1]) * p.t;

      // Apply parent rotation
      var dx = px - cx, dy = py - cy;
      var cosr = Math.cos(rot), sinr = Math.sin(rot);
      px = cx + dx * cosr - dy * sinr;
      py = cy + dx * sinr + dy * cosr;

      var alpha = Math.sin(p.t * Math.PI) * 0.7;
      var c = p.color;

      // Glow trail
      var grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
      grad.addColorStop(0, 'rgba('+c[0]+','+c[1]+','+c[2]+','+alpha+')');
      grad.addColorStop(0.4, 'rgba('+c[0]+','+c[1]+','+c[2]+','+(alpha*0.4)+')');
      grad.addColorStop(1, 'rgba('+c[0]+','+c[1]+','+c[2]+',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI*2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = 'rgba(255,255,255,'+(alpha*0.8)+')';
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function drawAmbientParticles() {
    var rot = time * 0.0004;
    for (var i = 0; i < 40; i++) {
      var angle = (i / 40) * Math.PI * 2 + rot;
      var dist = R * (0.85 + Math.sin(time*0.02 + i*0.5) * 0.08);
      var x = cx + Math.cos(angle) * dist;
      var y = cy + Math.sin(angle) * dist;
      var alpha = 0.04 + Math.sin(time*0.03 + i) * 0.02;
      ctx.fillStyle = 'rgba(200,180,255,'+alpha+')';
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function animate() {
    time++;
    drawBackground();
    drawGeometry();
    drawAmbientParticles();
    drawLightParticles();
    requestAnimationFrame(animate);
  }

  // Responsive
  window.addEventListener('resize', function(){
    resize();
    initParticles();
  });

  animate();
})();
