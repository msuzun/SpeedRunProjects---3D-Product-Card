import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
import { setHovered } from '../store/uiSlice';

interface SneakerModelProps {
  modelUrl?: string;
}

export default function SneakerModel({ modelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb' }: SneakerModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(modelUrl) as any;
  const dispatch = useDispatch();

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false);
  // Local hover state for rotation logic
  const [hovered, setLocalHover] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (hovered && !isMobile) {
      const targetRotationY = state.pointer.x * (Math.PI / 2); // Rotate up to 90 degrees left/right

      // Smoothly interpolate using frame-independent damping
      // damp formula: lerp(current, target, 1 - exp(-lambda * dt))
      const lambda = 4;
      const smoothing = 1 - Math.exp(-lambda * delta);

      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, smoothing);

      // Tilt on X axis
      const targetRotationX = -state.pointer.y * 0.2;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, smoothing);

    } else {
      // Auto rotate
      group.current.rotation.y += delta * 0.5;

      // Reset X rotation
      const lambda = 4;
      const smoothing = 1 - Math.exp(-lambda * delta);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, smoothing);
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

      {/* Environment */}
      <Environment preset="city" />

      <group
        ref={group}
        dispose={null}
        onPointerOver={() => {
          setLocalHover(true);
          dispatch(setHovered(true));
        }}
        onPointerOut={() => {
          setLocalHover(false);
          dispatch(setHovered(false));
        }}
        scale={1.5}
      >
        <primitive object={nodes.scene || nodes.Scene || nodes} />
      </group>

      <ContactShadows position={[0, -0.8, 0]} opacity={0.5} scale={10} blur={1.5} far={0.8} />
    </>
  );
}


