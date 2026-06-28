/**
 * Galaxy Spiral — Energy section background
 * 8 tight logarithmic spiral arms, 80,000+ particles.
 * Arms are clearly defined with tight scatter + bright cores.
 * Color-bucketed batch rendering for performance.
 */
(function () {
  var canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, cx, cy, maxR;
  var buckets = {};
  var bucketList = [];
  var rotation = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    cx = W / 2;
    cy = H / 2;
    maxR = Math.max(W, H) * 0.85;
    buildParticles();
  }

  function addParticle(r, g, b, alpha, x, y, size) {
    var aBucket = Math.round(alpha * 8) / 8;
    if (aBucket < 0.008) return;
    var key = r + '_' + g + '_' + b + '_' + aBucket;
    var b2 = buckets[key];
    if (!b2) {
      b2 = { color: 'rgba(' + r + ',' + g + ',' + b + ',' + aBucket + ')', pts: [] };
      buckets[key] = b2;
      bucketList.push(b2);
    }
    b2.pts.push(x, y, size);
  }

  function buildParticles() {
    buckets = {};
    bucketList = [];

    var numArms = 8;
    var turns = 3.0;        // tighter winding for more visible spiral
    var perArm = 9000;      // 8 × 9000 = 72,000

    for (var arm = 0; arm < numArms; arm++) {
      var armOffset = (arm / numArms) * Math.PI * 2;

      for (var i = 0; i < perArm; i++) {
        var t = i / perArm;
        // Logarithmic spiral: angle grows with log of radius
        var angle = t * turns * Math.PI * 2 + armOffset;
        var r = t * maxR * 0.96;

        // TIGHT scatter — key change: much narrower perpendicular spread
        // This keeps particles ON the arm curve, not scattered everywhere
        var scatterScale = 6 + t * 28;     // was 20 + t*75
        var scatter = (Math.random() - 0.5) * 2 * scatterScale;
        var angularJitter = (Math.random() - 0.5) * 0.05;  // was 0.16

        var finalAngle = angle + angularJitter;
        var finalR = Math.max(r + scatter, 2);

        var x = Math.cos(finalAngle) * finalR;
        var y = Math.sin(finalAngle) * finalR;

        // Color zones — arms are BRIGHTER than before to stand out
        var rc, gc, bc, alpha;
        if (t < 0.05) {
          rc = 255; gc = 245; bc = 210;
          alpha = 0.4 - t * 4;
        } else if (t < 0.18) {
          rc = 255; gc = 200; bc = 135;
          alpha = 0.3 - (t - 0.05) * 0.9;
        } else if (t < 0.4) {
          rc = 200; gc = 145; bc = 225;
          alpha = 0.22 - (t - 0.18) * 0.4;
        } else if (t < 0.65) {
          rc = 130; gc = 125; bc = 210;
          alpha = 0.14 - (t - 0.4) * 0.2;
        } else {
          rc = 85; gc = 100; bc = 175;
          alpha = 0.08 - (t - 0.65) * 0.08;
        }

        var size = Math.random() * 1.3 + 0.25;
        addParticle(rc | 0, gc | 0, bc | 0, alpha, x, y, size);
      }
    }

    // Reduced inter-arm dust (3,000 — was 8,000)
    // Less dust = arms stand out more
    for (var i = 0; i < 3000; i++) {
      var a = Math.random() * Math.PI * 2;
      var dBias = Math.pow(Math.random(), 0.6);
      var d = dBias * maxR * 0.98;
      var x2 = Math.cos(a) * d;
      var y2 = Math.sin(a) * d;
      var da = Math.random() * 0.04 + 0.006;   // dimmer dust
      addParticle(150, 145, 195, da, x2, y2, Math.random() * 0.5 + 0.1);
    }

    // Bright "knot" stars along arms (500) — like stellar clusters
    for (var i = 0; i < 500; i++) {
      // Pick a random arm
      var armIdx = Math.floor(Math.random() * numArms);
      var armOff = (armIdx / numArms) * Math.PI * 2;
      var t2 = Math.random();
      var knotAngle = t2 * turns * Math.PI * 2 + armOff;
      var knotR = t2 * maxR * 0.9;
      // Small scatter to stay on arm
      var ks = (Math.random() - 0.5) * 12;
      var ka = (Math.random() - 0.5) * 0.03;
      var kx = Math.cos(knotAngle + ka) * (knotR + ks);
      var ky = Math.sin(knotAngle + ka) * (knotR + ks);

      var kAlpha = Math.random() * 0.15 + 0.05;
      if (t2 < 0.2) {
        addParticle(255, 230, 180, kAlpha, kx, ky, Math.random() * 1.0 + 0.5);
      } else if (t2 < 0.5) {
        addParticle(210, 180, 230, kAlpha, kx, ky, Math.random() * 0.9 + 0.4);
      } else {
        addParticle(180, 180, 230, kAlpha, kx, ky, Math.random() * 0.8 + 0.3);
      }
    }

    // Scattered background stars (300)
    for (var i = 0; i < 300; i++) {
      var a3 = Math.random() * Math.PI * 2;
      var d3 = Math.random() * maxR * 0.95;
      var x3 = Math.cos(a3) * d3;
      var y3 = Math.sin(a3) * d3;
      addParticle(220, 215, 240, Math.random() * 0.1 + 0.03, x3, y3, Math.random() * 0.7 + 0.3);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    rotation += 0.0002;   // slightly faster — more visible rotation

    // Core glow
    var coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.22);
    coreGrad.addColorStop(0, 'rgba(255,235,180,0.1)');
    coreGrad.addColorStop(0.4, 'rgba(255,190,110,0.03)');
    coreGrad.addColorStop(1, 'rgba(255,160,80,0)');
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, W, H);

    // Outer halo
    var haloGrad = ctx.createRadialGradient(cx, cy, maxR * 0.15, cx, cy, maxR * 0.78);
    haloGrad.addColorStop(0, 'rgba(130,95,180,0.02)');
    haloGrad.addColorStop(0.5, 'rgba(75,60,130,0.01)');
    haloGrad.addColorStop(1, 'rgba(45,35,90,0)');
    ctx.fillStyle = haloGrad;
    ctx.fillRect(0, 0, W, H);

    var cosR = Math.cos(rotation);
    var sinR = Math.sin(rotation);

    for (var bi = 0; bi < bucketList.length; bi++) {
      var b = bucketList[bi];
      ctx.fillStyle = b.color;
      var pts = b.pts;
      for (var j = 0; j < pts.length; j += 3) {
        var px = pts[j];
        var py = pts[j + 1];
        var rx = px * cosR - py * sinR + cx;
        var ry = px * sinR + py * cosR + cy;
        if (rx < -2 || rx > W + 2 || ry < -2 || ry > H + 2) continue;
        var s = pts[j + 2];
        ctx.fillRect(rx - s, ry - s, s * 2, s * 2);
      }
    }

    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    animate();
    window.addEventListener('resize', resize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
