import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface LeafParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
}

// Warna default dedaunan (kombinasi hijau hutan & hijau muda)
const defaultColors: string[] = ["#10B981", "#059669", "#34D399", "#84CC16"];

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(hex.slice(0, 6), 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

/* --- VERTEX SHADER: Efek Daun Jatuh & Meliuk-liuk --- */
const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vAngle;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 5.0;
    
    // 1. Logika Jatuh (Falling Movement)
    float fallSpeed = mix(0.8, 2.0, random.y);
    float fallRange = uSpread * 2.5;
    
    // Posisi Y bergerak ke bawah dan me-repeat dari atas jika mencapai batas bawah
    pos.y = mod(pos.y - uTime * fallSpeed + fallRange * 0.5, fallRange) - fallRange * 0.5;
    
    // 2. Logika Meliuk-liuk (Swaying / Wind effect)
    float swayAmp = mix(0.5, 2.0, random.x);
    float swayFreq = mix(1.0, 3.0, random.z);
    pos.x += sin(uTime * swayFreq + random.w * 6.28) * swayAmp;
    pos.z += cos(uTime * swayFreq * 0.8 + random.x * 6.28) * (swayAmp * 0.5);
    
    // Pass rotasi daun ke fragment shader
    vAngle = sin(uTime * swayFreq + random.w) * 1.5 + random.x * 6.28;
    
    vec4 mvPos = viewMatrix * modelMatrix * vec4(pos, 1.0);

    // Ukuran Partikel
    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }
    
    gl_Position = projectionMatrix * mvPos;
  }
`;

/* --- FRAGMENT SHADER: Menggambar Bentuk Daun --- */
const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vAngle;
  
  // Fungsi Rotasi 2D
  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  }

  void main() {
    // Normalisasi UV dari 0.0-1.0 menjadi -0.5 sampai 0.5
    vec2 st = gl_PointCoord.xy - vec2(0.5);
    
    // Putar UV untuk animasi daun berputar
    st = rotate2D(st, vAngle);

    // 1. Gambar Bentuk Daun (SDF Bentuk Oval Meruncing)
    vec2 p = st * 2.4; 
    // Rumus kurva daun: gabungan kurva melengkung & ujung lancip
    float leafShape = (p.x * p.x) / 0.35 + (p.y * p.y) / (1.2 - abs(p.x) * 0.8);
    
    // Potong piksel di luar area daun
    if (leafShape > 1.0) {
      discard;
    }

    // 2. Bayangan / Detail Serat Daun (Vein)
    float centerVein = smoothstep(0.02, 0.0, abs(p.x));
    vec3 finalColor = mix(vColor, vColor * 1.3, centerVein * 0.4); // Serat agak lebih terang

    // Kelembutan di tepi daun (Anti-aliasing)
    float alpha = smoothstep(1.0, 0.85, leafShape);

    gl_FragColor = vec4(finalColor, alpha * 0.9);
  }
`;

const LeafParticles: React.FC<LeafParticlesProps> = ({
  particleCount = 150,
  particleSpread = 12,
  speed = 0.8,
  particleColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.5,
  particleBaseSize = 140,
  sizeRandomness = 0.8,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: pixelRatio,
      depth: false,
      alpha: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette =
      particleColors && particleColors.length > 0
        ? particleColors
        : defaultColors;

    for (let i = 0; i < count; i++) {
      positions.set(
        [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
        i * 3,
      );
      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4,
      );
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      }

      if (!disableRotation) {
        particles.rotation.y = Math.cos(elapsed * 0.0002) * 0.05;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio,
  ]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`} />
  );
};

export default LeafParticles;
