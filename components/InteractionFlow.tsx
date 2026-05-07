"use client";

import { useEffect, useRef } from "react";

export default function InteractionFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let angle = 0;
    let wave = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 15;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 10px Arial";

      for (let i = 0; i < 120; i++) {
        const t =
          i * ((2 * Math.PI) / 120) + (angle * Math.PI) / 180;

        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        const px = x * scale + centerX;
        const py = -y * scale + centerY;

        const fade = (Math.sin(i * 0.1 + wave) + 1) / 2;
        const colorValue = Math.floor(255 * fade);

        ctx.fillStyle = `rgb(${colorValue},0,0)`;

        ctx.fillText("I love you", px, py);
      }

      angle += 0.5;
      wave += 0.09;

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "block",
      }}
    />
  );
}