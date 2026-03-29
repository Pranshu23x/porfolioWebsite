"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  dotSize?: number;
}

export const CanvasRevealEffect = ({
  animationSpeed = 3,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[255, 255, 255]],
  dotSize = 6,
}: CanvasRevealEffectProps) => {
  return (
    <DotMatrix
      colors={colors}
      dotSize={dotSize}
      opacities={opacities}
      animationSpeed={animationSpeed}
      center={[0, 0]}
    />
  );
};

interface DotMatrixProps {
  colors: number[][];
  opacities: number[];
  dotSize: number;
  animationSpeed: number;
  center: number[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors,
  opacities,
  dotSize,
  animationSpeed,
}) => {
  const ref = useRef<any>(null);
  const size = useThree((state: any) => state.size);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_colors: { value: colors.map((c) => new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255)) },
        u_opacities: { value: opacities },
        u_dot_size: { value: dotSize },
        u_animation_speed: { value: animationSpeed },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 u_colors[10];
        uniform float u_opacities[10];
        uniform float u_dot_size;
        uniform float u_animation_speed;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
          // Calculate grid coordinates - using a slightly wider spacing than dot size
          float spacing = u_dot_size * 3.0;
          vec2 st = vUv * u_resolution.xy;
          vec2 grid_st = floor(st / spacing);
          vec2 dot_st = fract(st / spacing);

          // Randomness per cell
          float rnd = random(grid_st);
          
          // Draw Sharp Square Dot
          float size = 0.5; // normalized size within cell
          vec2 boundary = abs(dot_st - 0.5);
          float dot_shape = step(boundary.x, size * 0.2) * step(boundary.y, size * 0.2);

          // Complex Twinkle Animation
          float twinkle = sin(u_time * u_animation_speed + rnd * 12.0) * 0.5 + 0.5;
          float flow = sin(grid_st.x * 0.1 + grid_st.y * 0.1 + u_time * u_animation_speed * 0.5) * 0.5 + 0.5;
          
          // Combine for that 'Reveal' flow effect
          float opacity = rnd * (u_opacities[0] + 0.5 * flow) * twinkle;
          
          vec3 color = u_colors[0]; // White dots
          
          gl_FragColor = vec4(color, dot_shape * opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [size, colors, opacities, dotSize, animationSpeed]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[size.width, size.height]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export const CanvasRevealWrapper = (props: CanvasRevealEffectProps) => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90 }}
        dpr={1}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: false
        }}
      >
        <CanvasRevealEffect {...props} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50" />
    </div>
  );
};
