"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function GridPoints() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create a grid of points
  const count = 40;
  const spacing = 1.5;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        pos[idx] = (i - count / 2) * spacing;
        pos[idx + 1] = (j - count / 2) * spacing;
        pos[idx + 2] = 0;
      }
    }
    return pos;
  }, [count, spacing]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Subtle wave motion
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        const x = (i - count / 2) * spacing;
        const y = (j - count / 2) * spacing;
        
        // Z-motion based on sine waves
        const dist = Math.sqrt(x * x + y * y);
        const z = Math.sin(dist * 0.5 - time * 0.5) * 0.2;
        ref.current.geometry.attributes.position.setZ(i * count + j, z);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    // Mouse interaction - slight rotation
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouseX, 0.1);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -mouseY, 0.1);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: true }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <GridPoints />
      </Canvas>
    </div>
  );
}
