<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Love Heart</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #000;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="c"></canvas>

  <script>
    const canvas = document.getElementById("c");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let angle = 0;

    const NUM_STEPS = 70;
    const SCALE = 10;
    const TEXT = "I love you";

    function heartX(t) {
      return 16 * Math.pow(Math.sin(t), 3);
    }

    function heartY(t) {
      return (
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < NUM_STEPS; i++) {
        const t = angle + (Math.PI * 2 * i) / NUM_STEPS;

        const x = heartX(t) * SCALE;
        const y = -heartY(t) * SCALE;

        const hue = (i * 5 + angle * 50) % 360;

        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;

        ctx.fillText(TEXT, cx + x, cy + y);
      }

      angle += 0.02;

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  </script>
</body>
</html>