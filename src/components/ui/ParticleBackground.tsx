import React, { useEffect, useRef } from 'react';
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let particles: Particle[] = [];
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      type: 'dot' | 'leaf' | 'orb';
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.type =
          Math.random() > 0.95 ? 'orb' : Math.random() > 0.8 ? 'leaf' : 'dot';
        if (this.type === 'orb') {
          this.size = Math.random() * 100 + 50;
          this.speedX = (Math.random() - 0.5) * 0.2;
          this.speedY = (Math.random() - 0.5) * 0.2;
          this.alpha = Math.random() * 0.05 + 0.01;
          this.color = Math.random() > 0.5 ? '44, 76, 26' : '217, 144, 38'; // Dark Sage or Warm Amber
        } else if (this.type === 'leaf') {
          this.size = Math.random() * 5 + 2;
          this.speedX = (Math.random() - 0.5) * 1;
          this.speedY = Math.random() * 1 + 0.5;
          this.alpha = Math.random() * 0.3 + 0.1;
          this.color = '44, 76, 26'; // Dark Sage
        } else {
          this.size = Math.random() * 2;
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.speedY = Math.random() * -0.5 - 0.1; // Float up
          this.alpha = Math.random() * 0.5 + 0.1;
          this.color = Math.random() > 0.5 ? '217, 144, 38' : '150, 150, 150';
        }
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type === 'leaf') {
          // Reset leaf if it goes off bottom
          if (this.y > canvas!.height) {
            this.y = -10;
            this.x = Math.random() * canvas!.width;
          }
        } else {
          // Wrap around for others
          if (this.y < -this.size) this.y = canvas!.height + this.size;
          if (this.y > canvas!.height + this.size) this.y = -this.size;
        }
        if (this.x < -this.size) this.x = canvas!.width + this.size;
        if (this.x > canvas!.width + this.size) this.x = -this.size;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        if (this.type === 'orb') {
          const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size
          );
          gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
          gradient.addColorStop(1, `rgba(${this.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'leaf') {
          ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          // Simple leaf shape approximation
          ctx.ellipse(
            this.x,
            this.y,
            this.size,
            this.size * 2,
            Math.PI / 4,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const init = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    init();
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: 0.6
      }} />);


}