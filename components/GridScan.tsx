import React, { useEffect, useRef } from 'react';

type GridScanProps = {
  sensitivity?: number;
  lineThickness?: number;
  linesColor?: string;
  gridScale?: number;
  scanColor?: string;
  scanOpacity?: number;
  enablePost?: boolean;
  bloomIntensity?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function GridScan({
  sensitivity = 0.55,
  lineThickness = 1,
  linesColor = '#392e4e',
  gridScale = 0.1,
  scanColor = '#FF9FFC',
  scanOpacity = 0.4,
  enablePost = true,
  bloomIntensity = 0.6,
  noiseIntensity = 0.01,
  className = '',
  style = {},
}: GridScanProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 15, 20, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = linesColor;
      ctx.lineWidth = lineThickness;
      ctx.globalAlpha = 0.6;

      const cellSize = width * gridScale;
      const offsetX = (time * 20) % cellSize;
      const offsetY = (time * 10) % cellSize;

      // Draw vertical lines
      for (let x = -cellSize + offsetX; x < width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = -cellSize + offsetY; y < height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw scan line with glow effect
      ctx.globalAlpha = scanOpacity;
      const scanY = ((time * 30) % height) + (height * 0.2);

      // Glow effect
      const gradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      gradient.addColorStop(0, 'rgba(255, 159, 252, 0)');
      gradient.addColorStop(0.5, scanColor);
      gradient.addColorStop(1, 'rgba(255, 159, 252, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, width, 60);

      // Bright scan line
      ctx.globalAlpha = scanOpacity * 2;
      ctx.strokeStyle = scanColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Add noise for visual interest
      if (noiseIntensity > 0) {
        ctx.globalAlpha = noiseIntensity * 0.3;
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 2;
          ctx.fillStyle = scanColor;
          ctx.fillRect(x, y, size, size);
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, [lineThickness, linesColor, gridScale, scanColor, scanOpacity, noiseIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={style}
    />
  );
}
