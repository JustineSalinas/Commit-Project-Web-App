"use client";

import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const dots: { x: number; y: number; originalOpacity: number }[] = [];
    const spacing = 35;
    const dotSize = 1;

    const initDots = () => {
      dots.length = 0;
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          dots.push({
            x,
            y,
            originalOpacity: 0.08,
          });
        }
      }
    };

    initDots();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const radius = 300;

      // Draw background glow
      const bgGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius);
      bgGlow.addColorStop(0, "rgba(0, 255, 170, 0.03)");
      bgGlow.addColorStop(1, "rgba(0, 255, 170, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00FFAA";

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distSq = dx * dx + dy * dy;

        let opacity = dot.originalOpacity;
        let size = dotSize;

        if (distSq < radius * radius) {
          const dist = Math.sqrt(distSq);
          const factor = 1 - dist / radius;
          opacity = dot.originalOpacity + factor * 0.5;
          size = dotSize + factor * 1.2;
          
          if (factor > 0.6) {
            ctx.shadowBlur = factor * 15;
            ctx.shadowColor = "rgba(0, 255, 170, 0.6)";
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
