"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  strength?: number; // ripple power
};

export default function WaterTouchHover({
  className = "",
  strength = 1.2,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Ripple buffers
    let current: Float32Array;
    let previous: Float32Array;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      w = parent.clientWidth;
      h = parent.clientHeight;

      canvas.width = w;
      canvas.height = h;

      current = new Float32Array(w * h);
      previous = new Float32Array(w * h);
    };

    resize();
    window.addEventListener("resize", resize);

    // Add ripple on mouse move
    const disturb = (x: number, y: number) => {
      const radius = 20;
      for (let j = -radius; j < radius; j++) {
        for (let i = -radius; i < radius; i++) {
          const dx = x + i;
          const dy = y + j;
          if (dx < 1 || dx >= w - 1 || dy < 1 || dy >= h - 1) continue;

          const idx = dx + dy * w;
          previous[idx] = strength * 255;
        }
      }
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      disturb(x, y);
    };

    canvas.addEventListener("mousemove", handleMove);

    const render = () => {
      // simulate ripples
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = x + y * w;

          current[idx] =
            (previous[idx - 1] +
              previous[idx + 1] +
              previous[idx - w] +
              previous[idx + w]) /
              2 -
            current[idx];

          current[idx] *= 0.985; // damping
        }
      }

      // draw subtle distortion overlay (water shine)
      const img = ctx.createImageData(w, h);
      const data = img.data;

      for (let i = 0; i < w * h; i++) {
        const v = current[i];
        const c = 128 + v;

        data[i * 4 + 0] = c; // R
        data[i * 4 + 1] = c; // G
        data[i * 4 + 2] = c; // B
        data[i * 4 + 3] = 40; // alpha (very subtle)
      }

      ctx.putImageData(img, 0, 0);

      // swap buffers
      const temp = previous;
      previous = current;
      current = temp;

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  );
}
