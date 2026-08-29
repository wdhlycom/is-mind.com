/* ============================================================
   Flow Field — colorful drifting particle streams
   ------------------------------------------------------------
   A lightweight canvas engine. Particles ride a smoothly varying
   noise field and leave fading trails, so the background reads as
   flowing light rather than static geometry.

   Used by:
     · homepage hero      (#phoenix-canvas)
     · section atmosphere layers (tarot / psych / energy / ...)

   Behaviour:
     · respects prefers-reduced-motion (renders one static frame)
     · pauses while the tab is hidden
     · particle count scales with viewport area, capped for mobile
     · picks a palette that stays legible on light OR dark backgrounds
     · pointer adds a gentle swirl (no click needed)
   ============================================================ */
(function () {
  'use strict';

  var TAU = Math.PI * 2;

  var PALETTES = {
    // deep midnight backdrops — luminous, additive
    dark: [
      [232, 164, 176], // rose gold
      [200, 182, 255], // cosmic lavender
      [243, 229, 171], // champagne
      [248, 249, 250], // starlight
      [159, 224, 208], // mint veil
      [168, 200, 255], // sky iris
      [214, 162, 232], // orchid
    ],
    // pale backdrops — deeper inks so the streams stay visible
    light: [
      [168, 96, 116],
      [116, 96, 186],
      [166, 138, 66],
      [86, 74, 116],
      [64, 132, 116],
      [80, 116, 182],
      [142, 88, 164],
    ],
  };

  var reduceQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

  /* ---------- helpers ---------------------------------------------------- */

  // Walk up the tree for the first non-transparent background so the palette
  // matches whatever the section actually paints behind the canvas.
  function isDarkBackdrop(el) {
    var node = el;
    while (node && node !== document.documentElement) {
      var bg = getComputedStyle(node).backgroundColor || '';
      var m = bg.match(/rgba?\(([^)]+)\)/);
      if (m) {
        var parts = m[1].split(',').map(function (v) {
          return parseFloat(v);
        });
        var alpha = parts.length > 3 ? parts[3] : 1;
        if (alpha > 0.05 && parts.length >= 3) {
          var lum = 0.299 * parts[0] + 0.587 * parts[1] + 0.114 * parts[2];
          return lum < 140;
        }
      }
      node = node.parentElement;
    }
    // Site default is the midnight theme.
    return !document.documentElement.classList.contains('light');
  }

  // Smooth pseudo-noise field: layered sines give us organic curls without
  // shipping a full Perlin implementation.
  function fieldAngle(x, y, t) {
    var s = 0.0016;
    return (
      Math.sin(x * s + t) * 1.4 +
      Math.cos(y * s * 1.3 - t * 0.8) * 1.4 +
      Math.sin((x + y) * s * 0.7 + t * 0.5) * 0.9
    ) * Math.PI;
  }

  /* ---------- engine ----------------------------------------------------- */

  function createEngine(canvas, opts) {
    opts = opts || {};

    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var W = 0;
    var H = 0;
    var dpr = 1;
    var particles = [];
    var raf = null;
    var t = 0;
    var mouse = { x: -9999, y: -9999 };
    var dark = true;
    var palette = PALETTES.dark;

    var density = opts.density || 13000; // px² per particle (higher = fewer)
    var maxCount = opts.max || 110;
    var minCount = opts.min || 26;
    var speed = opts.speed || 1;
    var alphaScale = opts.alpha || 1;

    // 'stream' — particles leave fading ribbon trails (section pages)
    // 'dot'    — each particle is a single soft circular mote (homepage overlay)
    var dot = opts.render === 'dot';
    var thrust = dot ? 0.13 : 0.26;
    var capSpeed = dot ? 0.85 : 1.7;
    var drift = dot ? 0.0009 : 0.0016;
    // Multiplies the mote radius (dot mode only). 1 => roughly 2.3px across.
    var dotScale = opts.dotScale || 1;

    function targetCount() {
      if (!W || !H) return minCount;
      var byArea = Math.round((W * H) / density);
      var cap = W < 700 ? Math.round(maxCount * 0.45) : maxCount;
      return Math.max(minCount, Math.min(cap, byArea));
    }

    function reset(p, fresh) {
      p.x = Math.random() * W;
      p.y = Math.random() * H;
      p.vx = 0;
      p.vy = 0;
      p.hist = [];
      p.maxLife = 220 + Math.random() * 420;
      p.life = fresh ? p.maxLife * Math.random() : p.maxLife;
      p.c = palette[(Math.random() * palette.length) | 0];
      p.w = 0.6 + Math.random() * 1.5;
      p.tail = 6 + ((Math.random() * 9) | 0);
      p.r = (1.2 + Math.random() * 2.2) * dotScale;
      p.base = (0.22 + Math.random() * 0.4) * alphaScale;
    }

    function sync() {
      var want = targetCount();
      while (particles.length > want) particles.pop();
      while (particles.length < want) {
        var p = {};
        reset(p, true);
        particles.push(p);
      }
    }

    function measure() {
      var host = canvas.parentElement;
      var fixed = getComputedStyle(canvas).position === 'fixed';

      if (fixed) {
        // Full-viewport overlay: size to the window, not to a parent box.
        W = window.innerWidth;
        H = window.innerHeight;
      } else {
        if (!host) return false;
        var rect = host.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;
        W = rect.width;
        H = rect.height;
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dark = isDarkBackdrop(host || document.body);
      palette = dark ? PALETTES.dark : PALETTES.light;
      canvas.style.mixBlendMode = dark ? 'screen' : 'multiply';

      sync();
      return true;
    }

    function step() {
      t += drift;

      ctx.clearRect(0, 0, W, H);
      // Additive glow reads as light on midnight; normal blending keeps the
      // deeper inks visible on pale sections.
      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.life -= 1;
        if (
          p.life <= 0 ||
          p.x < -60 || p.x > W + 60 ||
          p.y < -60 || p.y > H + 60
        ) {
          reset(p, false);
          continue;
        }

        var a = fieldAngle(p.x, p.y, t);
        p.vx += Math.cos(a) * thrust * speed;
        p.vy += Math.sin(a) * thrust * speed;

        // Pointer swirl — a soft eddy, not a hard push.
        if (mouse.x > -9000) {
          var dx = p.x - mouse.x;
          var dy = p.y - mouse.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 22000 && d2 > 1) {
            var f = (1 - d2 / 22000) * 0.5;
            var d = Math.sqrt(d2);
            p.vx += (-dy / d) * f;
            p.vy += (dx / d) * f;
          }
        }

        var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        var cap = capSpeed * speed;
        if (sp > cap) {
          p.vx = (p.vx / sp) * cap;
          p.vy = (p.vy / sp) * cap;
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        if (!dot) {
          p.hist.push(p.x, p.y);
          if (p.hist.length > p.tail * 2) p.hist.splice(0, 2);
        }

        // Fade in on birth, out on death, so nothing pops.
        var fade = Math.min(1, p.life / 45, (p.maxLife - p.life) / 40 + 0.12);
        var alpha = p.base * Math.max(0, fade);

        if (dot) {
          // A single round mote: soft core, feathered edge, no trail.
          var grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          grd.addColorStop(
            0,
            'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' +
              Math.min(1, alpha + 0.3) + ')'
          );
          grd.addColorStop(
            0.5,
            'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + alpha * 0.6 + ')'
          );
          grd.addColorStop(
            1,
            'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',0)'
          );
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, TAU);
          ctx.fill();
        } else {
          if (p.hist.length >= 4) {
            ctx.beginPath();
            ctx.moveTo(p.hist[0], p.hist[1]);
            for (var j = 2; j < p.hist.length; j += 2) {
              ctx.lineTo(p.hist[j], p.hist[j + 1]);
            }
            ctx.strokeStyle =
              'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + alpha + ')';
            ctx.lineWidth = p.w;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w * 0.85, 0, TAU);
          ctx.fillStyle =
            'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' +
            Math.min(1, alpha + 0.22) + ')';
          ctx.fill();
        }
      }
    }

    function loop() {
      step();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (raf || !W) return;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    /* ---------- events --------------------------------------------------- */

    var resizeTimer = null;
    function scheduleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        measure();
      }, 160);
    }

    var ro = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      ro = new ResizeObserver(scheduleResize);
      ro.observe(canvas.parentElement);
    }
    window.addEventListener('resize', scheduleResize);
    window.addEventListener('orientationchange', scheduleResize);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (!isReduced()) start();
    });

    if (opts.pointer) {
      window.addEventListener(
        'pointermove',
        function (e) {
          var rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        },
        { passive: true }
      );
      window.addEventListener('pointerleave', function () {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }

    // Re-pick the palette if the site theme flips.
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(function () {
        var wasDark = dark;
        if (measure()) {
          if (wasDark !== dark) {
            particles.forEach(function (p) {
              p.c = palette[(Math.random() * palette.length) | 0];
            });
            if (isReduced()) step();
          }
        }
      }).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      });
    }

    function isReduced() {
      return !!(reduceQuery && reduceQuery.matches);
    }

    /* ---------- boot ----------------------------------------------------- */

    if (!measure()) {
      // Host not laid out yet (fonts, hydration) — try once more shortly.
      setTimeout(function () {
        if (measure()) {
          if (isReduced()) step();
          else start();
        }
      }, 220);
    } else if (isReduced()) {
      // Respect the OS setting: one static frame, no animation loop.
      step();
    } else {
      start();
    }

    return { start: start, stop: stop, remeasure: measure };
  }

  /* ---------- public API ------------------------------------------------- */

  var mounted = [];

  function mount(selector, opts) {
    var list =
      typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : [selector];
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (!el) continue;
      var engine = createEngine(el, opts || {});
      if (engine) mounted.push(engine);
    }
    return mounted;
  }

  window.FlowField = { mount: mount, engines: mounted };

  // Homepage overlay: one full-viewport field of slow round motes drifting
  // across every section, not just the hero.
  window.initFlowField = function () {
    var canvas = document.getElementById('flow-fullscreen');
    if (!canvas) return;
    mounted.forEach(function (e) {
      e.stop();
    });
    mounted.length = 0;
    createEngine(canvas, {
      render: 'dot',
      density: 9000, // ~140 motes on a 1440×900 viewport
      max: 140,
      min: 40,
      speed: 0.2,
      dotScale: 2.4, // ~5.5px across
      alpha: 0.85,
      pointer: true,
    });
  };
})();
