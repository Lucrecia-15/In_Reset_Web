import React, { useEffect, useRef } from 'react';

// --- Perlin Noise Implementation (Compact) ---
const PerlinNoise = function() {
  this.p = new Array(512);
  this.permutation = new Array(256);

  for (let i = 0; i < 256; i++) {
    this.permutation[i] = i;
  }

  for (let i = 0; i < 256; i++) {
    const r = Math.floor(Math.random() * (256 - i)) + i;
    const aux = this.permutation[i];
    this.permutation[i] = this.permutation[r];
    this.permutation[r] = aux;
  }

  for (let i = 0; i < 512; i++) {
    this.p[i] = this.permutation[i % 256];
  }
};

PerlinNoise.prototype = {
  grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  },

  noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = x * x * (3 - 2 * x);
    const v = y * y * (3 - 2 * y);
    const w = z * z * (3 - 2 * z);

    const A = this.p[X] + Y;
    const AA = this.p[A] + Z;
    const AB = this.p[A + 1] + Z;
    const B = this.p[X + 1] + Y;
    const BA = this.p[B] + Z;
    const BB = this.p[B + 1] + Z;

    return this.lerp(
      w,
      this.lerp(
        v,
        this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)),
        this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z))
      ),
      this.lerp(
        v,
        this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)),
        this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1), this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))
      )
    );
  },

  lerp(t, a, b) {
    return a + t * (b - a);
  }
};

const NetworkAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const nodesRef = useRef([]);
  const perlin = useRef(new PerlinNoise());

  const config = {
    nodeCount: 100,
    maxDistance: 120,
    nodeSize: 2.5,
    speed: 0.004,
    mouseInfluence: 300,
    mouseRepulsionForce: 0.015,
    mouseZInfluence: 0.2,
    depthRange: 600,
    fov: 400,
    tunnelSpeed: 1.5,

    shadowBaseOffsetY: 15,
    shadowDepthOffsetYScale: 0.3,
    shadowNearBlur: 1,
    shadowFarBlur: 8,
    shadowNearOpacity: 0.4,
    shadowFarOpacity: 0.05,

    colors: {
      background: '#0a0a0a',
      nodes: [
        '#8B5CF6',
        '#A855F7',
        '#C084FC',
        '#DDD6FE',
        '#E879F9',
        '#F0ABFC',
        '#7C3AED',
        '#9333EA',
        '#FF69B4',
        '#EE82EE'
      ],
      connections: {
        base: 'rgba(124, 22, 128, 0.07)'
      }
    }
  };

  class Node {
    constructor(canvas, perlinNoiseInstance) {
      this.canvas = canvas;
      this.perlin = perlinNoiseInstance;
      this.reset();
      this.color = config.colors.nodes[Math.floor(Math.random() * config.colors.nodes.length)];
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.noiseOffsetX = Math.random() * 1000;
      this.noiseOffsetY = Math.random() * 1000;
      this.noiseOffsetZ = Math.random() * 1000;
      this.shapeOscillationPhase = Math.random() * Math.PI * 2;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.z = Math.random() * config.fov * 2 - config.fov / 2;

      this.vx = (Math.random() - 0.5) * config.speed * 20;
      this.vy = (Math.random() - 0.5) * config.speed * 20;
    }

    update(time) {
      const noiseX = this.perlin.noise(this.noiseOffsetX + time * 0.00005, 0, 0);
      const noiseY = this.perlin.noise(0, this.noiseOffsetY + time * 0.00005, 0);

      this.x += noiseX * 0.5 + this.vx;
      this.y += noiseY * 0.5 + this.vy;

      this.z -= config.tunnelSpeed;

      if (mouseRef.current.isHovering) {
        const projectedScale = config.fov / (config.fov + this.z);
        const projectedX = this.x * projectedScale;
        const projectedY = this.y * projectedScale;

        const dx = mouseRef.current.x - projectedX;
        const dy = mouseRef.current.y - projectedY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseInfluence) {
          const force = (config.mouseInfluence - distance) / config.mouseInfluence;
          this.vx -= dx * force * config.mouseRepulsionForce;
          this.vy -= dy * force * config.mouseRepulsionForce;
          this.z += (Math.random() - 0.5) * force * config.mouseZInfluence;
        }
      }

      this.vx *= 0.98;
      this.vy *= 0.98;

      const projectedScale = config.fov / (config.fov + this.z);
      const projectedX = this.x * projectedScale;
      const projectedY = this.y * projectedScale;

      if (
        this.z < -config.fov ||
        projectedX < -50 ||
        projectedX > this.canvas.width + 50 ||
        projectedY < -50 ||
        projectedY > this.canvas.height + 50
      ) {
        this.reset();
        this.z = config.depthRange;
      }
    }

    draw(ctx, time) {
      const projectedScale = config.fov / (config.fov + this.z);
      const x = this.x * projectedScale;
      const y = this.y * projectedScale;
      const size = config.nodeSize * projectedScale;

      if (size < 0.5) return;

      const pulse = Math.sin(time * 0.002 + this.pulsePhase) * 0.3 + 0.7;
      const finalSize = size * pulse;

      const shapeOscillation = Math.sin(time * 0.001 + this.shapeOscillationPhase) * 0.3 + 1;
      const rotation = Math.sin(time * 0.0005 + this.shapeOscillationPhase) * Math.PI / 8;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const normalizedZ = (this.z + config.depthRange / 2) / config.depthRange;

      const shadowBlur = config.shadowNearBlur + (config.shadowFarBlur - config.shadowNearBlur) * normalizedZ;
      const shadowOpacity = config.shadowNearOpacity + (config.shadowFarOpacity - config.shadowNearOpacity) * normalizedZ;

      const r = parseInt(this.color.substring(1, 3), 16);
      const g = parseInt(this.color.substring(3, 5), 16);
      const b = parseInt(this.color.substring(5, 7), 16);
      const shadowColor = `rgba(${Math.floor(r * 0.5)}, ${Math.floor(g * 0.5)}, ${Math.floor(b * 0.5)}, ${shadowOpacity})`;

      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = config.shadowBaseOffsetY * (this.z / (config.depthRange / 2)) * config.shadowDepthOffsetYScale;
      ctx.shadowOffsetY = config.shadowBaseOffsetY;

      ctx.fillStyle = this.color;

      ctx.beginPath();
      const sides = 3 + Math.floor(shapeOscillation * 2);
      for (let i = 0; i < sides; i++) {
        const angle = ((i / sides) * 2 * Math.PI);
        const px = Math.cos(angle) * finalSize;
        const py = Math.sin(angle) * finalSize;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    resize();

    // Crear nodos
    nodesRef.current = [];
    for (let i = 0; i < config.nodeCount; i++) {
      nodesRef.current.push(new Node(canvas, perlin.current));
    }

    let lastTime = performance.now();

    function animate(time) {
      animationRef.current = requestAnimationFrame(animate);

      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fondo
      ctx.fillStyle = config.colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar nodos
      nodesRef.current.forEach(node => node.update(time));
      nodesRef.current.forEach(node => node.draw(ctx, time));

      // Dibujar conexiones limitando a 5 conexiones por nodo
      for (let i = 0; i < nodesRef.current.length; i++) {
        let connectionsCount = 0;
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          if (connectionsCount >= 5) break;

          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];

          const projectedA = {
            x: nodeA.x * (config.fov / (config.fov + nodeA.z)),
            y: nodeA.y * (config.fov / (config.fov + nodeA.z))
          };
          const projectedB = {
            x: nodeB.x * (config.fov / (config.fov + nodeB.z)),
            y: nodeB.y * (config.fov / (config.fov + nodeB.z))
          };

          const dx = projectedA.x - projectedB.x;
          const dy = projectedA.y - projectedB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.maxDistance) {
            connectionsCount++;

            const opacityZ = 1 - Math.abs(nodeA.z + nodeB.z) / (2 * config.depthRange);
            const opacity2D = 1 - distance / config.maxDistance;
            const finalOpacity = Math.min(opacityZ, opacity2D) * 0.4;

            ctx.beginPath();
            ctx.moveTo(projectedA.x, projectedA.y);
            ctx.lineTo(projectedB.x, projectedB.y);
            ctx.strokeStyle = `rgba(124, 22, 128, ${finalOpacity.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseEnter() {
      mouseRef.current.isHovering = true;
    }
    function onMouseLeave() {
      mouseRef.current.isHovering = false;
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', background: config.colors.background }}
    />
  );
};

export default NetworkAnimation;
