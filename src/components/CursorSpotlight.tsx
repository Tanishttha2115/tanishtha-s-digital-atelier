import { useEffect, useRef } from "react";

/**
 * Premium cursor spotlight + particle trail.
 * - Uses requestAnimationFrame + transform for GPU-accelerated 60fps motion.
 * - Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const spot = spotRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let sx = mx;
    let sy = my;

    type P = { x: number; y: number; vx: number; vy: number; life: number; hue: number };
    const particles: P[] = [];
    let lastEmit = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const now = performance.now();
      if (now - lastEmit > 22 && particles.length < 90) {
        lastEmit = now;
        particles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          life: 1,
          hue: 220 + Math.random() * 90, // blue → cyan → purple
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      // easing / inertia
      sx += (mx - sx) * 0.12;
      sy += (my - sy) * 0.12;
      spot.style.transform = `translate3d(${sx - 300}px, ${sy - 300}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.005;
        p.life -= 0.018;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const r = 6 * p.life + 1;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${0.35 * p.life})`);
        g.addColorStop(1, "hsla(260, 90%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
      />
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[600px] w-[600px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.22), rgba(59,130,246,0.14) 35%, rgba(6,182,212,0.08) 55%, transparent 70%)",
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}