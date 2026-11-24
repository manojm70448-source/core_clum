'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Compass, RotateCw } from 'lucide-react';

interface TradeHub {
  name: string;
  lat: number;
  lng: number;
  country: string;
  type: 'origin' | 'destination';
}

const TRADE_HUBS: TradeHub[] = [
  { name: 'Pattukkottai & Tuticorin Port', lat: 10.43, lng: 79.32, country: 'India (Origin)', type: 'origin' },
  { name: 'Dubai / Jebel Ali', lat: 25.2, lng: 55.27, country: 'UAE', type: 'destination' },
  { name: 'Port of Rotterdam', lat: 51.92, lng: 4.48, country: 'Netherlands', type: 'destination' },
  { name: 'Port of Singapore', lat: 1.35, lng: 103.82, country: 'Singapore', type: 'destination' },
  { name: 'London Gateway', lat: 51.5, lng: -0.12, country: 'UK', type: 'destination' },
  { name: 'Port of New York & NJ', lat: 40.71, lng: -74.0, country: 'USA', type: 'destination' },
  { name: 'Port of Klang', lat: 3.0, lng: 101.4, country: 'Malaysia', type: 'destination' },
  { name: 'Dammam Port', lat: 26.43, lng: 50.1, country: 'Saudi Arabia', type: 'destination' },
];

interface InteractiveGlobe3DProps {
  className?: string;
  height?: number;
}

export const InteractiveGlobe3D: React.FC<InteractiveGlobe3DProps> = ({
  className = '',
  height = 360,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredHub, setHoveredHub] = useState<TradeHub | null>(null);

  // Rotation angles in radians
  const rotYRef = useRef<number>(-1.2);
  const rotXRef = useRef<number>(0.25);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number; clientXGlobal?: number; clientYGlobal?: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0.003, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Convert lat/lng to 3D Cartesian coordinates (unit sphere)
  const latLngToVector3 = (lat: number, lng: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(Math.sin(phi) * Math.cos(theta));
    const z = Math.sin(phi) * Math.sin(theta);
    const y = Math.cos(phi);
    return { x, y, z };
  };

  // Rotate point with current angles
  const rotatePoint = (p: { x: number; y: number; z: number }) => {
    const cosY = Math.cos(rotYRef.current);
    const sinY = Math.sin(rotYRef.current);
    const cosX = Math.cos(rotXRef.current);
    const sinX = Math.sin(rotXRef.current);

    // Rotate Y
    const x1 = p.x * cosY + p.z * sinY;
    const y1 = p.y;
    const z1 = -p.x * sinY + p.z * cosY;

    // Rotate X
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    return { x: x2, y: y2, z: z2 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let heightPx = 0;
    let radius = 0;
    let particleOffset = 0;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      heightPx = rect.height || height;
      canvas.width = width * dpr;
      canvas.height = heightPx * dpr;
      ctx.scale(dpr, dpr);
      radius = Math.min(width, heightPx) * 0.42;
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    if (containerRef.current) ro.observe(containerRef.current);

    // Pre-calculate Hub 3D Vectors
    const hubVectors = TRADE_HUBS.map((hub) => ({
      hub,
      vec: latLngToVector3(hub.lat, hub.lng),
    }));

    const originVec = hubVectors.find((h) => h.hub.type === 'origin') || hubVectors[0];

    const render = () => {
      ctx.clearRect(0, 0, width, heightPx);
      const cx = width / 2;
      const cy = heightPx / 2;

      // Inertia & Auto-spin
      if (!isDraggingRef.current) {
        rotYRef.current += velocityRef.current.x;
        rotXRef.current += velocityRef.current.y;
        // Friction on manual velocity back to standard slow spin
        velocityRef.current.x = velocityRef.current.x * 0.96 + 0.003 * 0.04;
        velocityRef.current.y = velocityRef.current.y * 0.92;
        // Clamp X tilt
        rotXRef.current = Math.max(-0.8, Math.min(0.8, rotXRef.current));
      }

      particleOffset = (particleOffset + 0.015) % 1;

      // 1. Atmospheric Outer Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, 'rgba(5, 150, 105, 0.18)');
      glowGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
      glowGrad.addColorStop(1, 'rgba(5, 150, 105, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Sphere Fill (Dark Luxury Emerald Glass)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, 'rgba(6, 78, 59, 0.85)');
      sphereGrad.addColorStop(0.6, 'rgba(2, 44, 34, 0.95)');
      sphereGrad.addColorStop(1, 'rgba(1, 28, 21, 0.98)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.clip(); // Clip everything inside sphere

      // 3. Draw 3D Latitude Rings
      ctx.lineWidth = 1;
      const lats = [-60, -40, -20, 0, 20, 40, 60];
      lats.forEach((lat) => {
        const radLat = (lat * Math.PI) / 180;
        const rLat = radius * Math.cos(radLat);
        const yLat = radius * Math.sin(radLat);

        ctx.beginPath();
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const px = (rLat * Math.cos(angle)) / radius;
          const pz = (rLat * Math.sin(angle)) / radius;
          const py = -yLat / radius;

          const rotated = rotatePoint({ x: px, y: py, z: pz });
          const screenX = cx + rotated.x * radius;
          const screenY = cy + rotated.y * radius;

          // Fade back hemisphere
          if (rotated.z > -0.15) {
            if (i === 0) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
          }
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(52, 211, 153, 0.35)' : 'rgba(52, 211, 153, 0.14)';
        ctx.stroke();
      });

      // 4. Draw 3D Longitude Meridians
      const lngs = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];
      lngs.forEach((lng) => {
        ctx.beginPath();
        const steps = 40;
        for (let i = 0; i <= steps; i++) {
          const lat = -80 + (i / steps) * 160;
          const v = latLngToVector3(lat, lng);
          const rotated = rotatePoint(v);
          const screenX = cx + rotated.x * radius;
          const screenY = cy + rotated.y * radius;

          if (rotated.z > -0.15) {
            if (i === 0) ctx.moveTo(screenX, screenY);
            else ctx.lineTo(screenX, screenY);
          }
        }
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.12)';
        ctx.stroke();
      });

      // 5. Unclip to draw Arcs and Hubs that project outward
      ctx.restore();

      // Draw Trade Arcs (South India -> Global Ports)
      const rotOrigin = rotatePoint(originVec.vec);
      const originX = cx + rotOrigin.x * radius;
      const originY = cy + rotOrigin.y * radius;

      hubVectors.forEach(({ hub, vec }) => {
        if (hub.type === 'origin') return;
        const rotDest = rotatePoint(vec);
        const destX = cx + rotDest.x * radius;
        const destY = cy + rotDest.y * radius;

        // Draw only if at least one point is on front hemisphere
        if (rotOrigin.z > -0.2 || rotDest.z > -0.2) {
          // Calculate 3D arc apex
          const midX = (rotOrigin.x + rotDest.x) / 2;
          const midY = (rotOrigin.y + rotDest.y) / 2;
          const midZ = (rotOrigin.z + rotDest.z) / 2;
          const len = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
          const elevation = 1.35; // Arc heights above globe
          const arcApexX = cx + (midX / len) * radius * elevation;
          const arcApexY = cy + (midY / len) * radius * elevation;

          const arcAlpha = Math.max(0.1, (rotOrigin.z + rotDest.z) / 2 + 0.4);

          // Draw Arc curve
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.quadraticCurveTo(arcApexX, arcApexY, destX, destY);
          ctx.strokeStyle = `rgba(245, 158, 11, ${arcAlpha * 0.45})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Moving Particle along the Arc
          const t = (particleOffset + (hub.lng / 360)) % 1;
          const invT = 1 - t;
          const partX = invT * invT * originX + 2 * invT * t * arcApexX + t * t * destX;
          const partY = invT * invT * originY + 2 * invT * t * arcApexY + t * t * destY;

          ctx.beginPath();
          ctx.arc(partX, partY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 6. Draw Hub Nodes
      let foundHover: TradeHub | null = null;
      hubVectors.forEach(({ hub, vec }) => {
        const rotated = rotatePoint(vec);
        if (rotated.z > -0.15) {
          const hx = cx + rotated.x * radius;
          const hy = cy + rotated.y * radius;
          const isOrigin = hub.type === 'origin';

          // Pulse effect
          const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;

          if (isOrigin) {
            // Origin Hub (Pattukkottai) - Bright Gold/Emerald Beacons
            ctx.beginPath();
            ctx.arc(hx, hy, 7 + pulse * 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f59e0b';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();

            // Origin Label
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.fillStyle = '#fef3c7';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 4;
            ctx.fillText('Pattukkottai (HQ)', hx + 9, hy + 4);
            ctx.shadowBlur = 0;
          } else {
            // Destination Port Nodes
            ctx.beginPath();
            ctx.arc(hx, hy, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#34d399';
            ctx.strokeStyle = 'rgba(255,255,255,0.8)';
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();

            // Destination Label
            ctx.font = '500 10px Outfit, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fillText(hub.name.split('/')[0].replace('Port of ', ''), hx + 6, hy + 3);
          }

          // Check hover proximity
          const mx = lastMousePosRef.current.x;
          const my = lastMousePosRef.current.y;
          const dist = Math.hypot(mx - hx, my - hy);
          if (dist < 18) {
            foundHover = hub;
          }
        }
      });

      setHoveredHub(foundHover);
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      ro.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [height]);

  // Pointer / Touch Handlers
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: clientX, y: clientY, clientXGlobal: clientX, clientYGlobal: clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastMousePosRef.current.x = clientX - rect.left;
      lastMousePosRef.current.y = clientY - rect.top;
    }

    if (!isDraggingRef.current) return;

    const lastX = lastMousePosRef.current.clientXGlobal ?? clientX;
    const lastY = lastMousePosRef.current.clientYGlobal ?? clientY;
    const dx = clientX - lastX;
    const dy = clientY - lastY;

    const factor = 0.007;
    rotYRef.current += dx * factor;
    rotXRef.current += dy * factor;

    velocityRef.current = {
      x: dx * factor * 0.6,
      y: dy * factor * 0.6,
    };

    lastMousePosRef.current.clientXGlobal = clientX;
    lastMousePosRef.current.clientYGlobal = clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleReset = () => {
    rotYRef.current = -1.2;
    rotXRef.current = 0.25;
    velocityRef.current = { x: 0.003, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-slate-950/80 border border-emerald-500/30 shadow-2xl backdrop-blur-xl ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Top Bar Indicators */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold tracking-wide backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive 3D Maritime Network</span>
        </div>

        <button
          onClick={handleReset}
          className="pointer-events-auto p-1.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 text-white/80 hover:text-white border border-white/15 transition-all text-xs flex items-center gap-1"
          title="Reset 3D Rotation"
          aria-label="Reset 3D Rotation"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px] font-semibold">Reset</span>
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none block"
        onMouseDown={(e) => {
          handlePointerDown(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            const touch = e.touches[0];
            handlePointerDown(touch.clientX, touch.clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) {
            const touch = e.touches[0];
            handlePointerMove(touch.clientX, touch.clientY);
          }
        }}
        onTouchEnd={handlePointerUp}
      />

      {/* Bottom Hint / Info Card */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none text-xs">
        <div className="text-[11px] font-medium text-slate-300/80 bg-slate-900/70 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
          {hoveredHub ? (
            <span className="text-amber-300 font-bold">
              {hoveredHub.name} &bull; {hoveredHub.country}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Touch or drag to rotate 3D routes</span>
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
          <span>50+ Global Destination Ports</span>
        </div>
      </div>
    </div>
  );
};
