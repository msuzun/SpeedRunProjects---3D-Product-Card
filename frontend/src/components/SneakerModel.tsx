import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
import { damp } from 'three/src/math/MathUtils';
import { setHovered } from '../store/uiSlice';

// Placeholder URL for a sneaker model
const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb';

export default function SneakerModel() {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(MODEL_URL) as any;
  const dispatch = useDispatch();
  const { viewport, size } = useThree();

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false);

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

    // Auto-rotation when not hovered
    if (!state.pointer.x && !state.pointer.y && !isMobile) {
      group.current.rotation.y += delta * 0.2; // Slow auto-rotation
    }

    // Mouse interaction logic
    if (!isMobile) {
      // Calculate target rotation based on mouse X position
      // Map viewport width to a rotation range (e.g., -PI/4 to PI/4)
      // state.pointer.x is normalized (-1 to 1)

      // If hovered (we can track this via local state or just check pointer activity if needed, 
      // but the requirement says "On onPointerOver (hover), the automatic rotation stops.")
      // Actually, the requirement says: "As the user moves the mouse left/right across the card, the shoe should rotate smoothly to follow."
      // And "On onPointerOver (hover), the automatic rotation stops."

      // Let's use a local ref to track if we are currently hovering the canvas/object area effectively.
      // However, the prompt implies the interaction is "across the card". 
      // Usually 3D canvas covers the card.

      // Let's implement the specific logic:
      // 1. Auto rotate if idle (we'll assume idle means not hovered).
      // 2. If hovered, stop auto rotate and map mouse X to rotation Y.
    }
  });

  // We need to handle the "isHovered" state for the logic.
  // The requirement says: "Dispatch the isHovered state to the uiSlice when the mouse enters/leaves the canvas area."
  // But strictly speaking, we are inside the Canvas here. The Canvas events are usually on the Canvas component or a wrapper.
  // However, we can use `onPointerOver` and `onPointerOut` on a mesh or a large invisible plane, OR we can rely on the parent to handle the "Canvas area" hover.
  // BUT, the prompt says "Integrate Redux: Dispatch the isHovered state to the uiSlice when the mouse enters/leaves the canvas area."
  // AND "On onPointerOver (hover), the automatic rotation stops."

  // Let's refine the useFrame logic based on a local hover state that syncs with Redux.
  const [hovered, setLocalHover] = useState(false);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (hovered && !isMobile) {
      // Map mouse X (-1 to 1) to rotation Y (-PI/2 to PI/2 for full visibility or less)
      // damp(current, target, lambda, delta)
      // Using a simple lerp or damp helper. 
      // Threejs MathUtils.damp is deprecated/removed in some versions or not available directly as 'damp'.
      // Usually we use `damp` from `maath` or just simple lerp: current + (target - current) * factor
      // The prompt asks for "damp for smooth inertial rotation".
      // We can use `THREE.MathUtils.lerp` with a factor that depends on delta.

      const targetRotationY = state.pointer.x * (Math.PI / 2); // Rotate up to 90 degrees left/right

      // Smoothly interpolate
      // 4 * delta is a common speed factor for damping
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotationY, 4, delta);

      // Also maybe tilt slightly on X axis based on Y pointer for extra "3D feel"
      const targetRotationX = -state.pointer.y * 0.2;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotationX, 4, delta);

    } else {
      // Auto rotate
      group.current.rotation.y += delta * 0.5;

      // Reset X rotation
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0, 4, delta);
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
        scale={1.5} // Adjust scale as needed
      >
        <primitive object={nodes.scene || nodes.Scene || nodes} />
      </group>

      <ContactShadows position={[0, -0.8, 0]} opacity={0.5} scale={10} blur={1.5} far={0.8} />
    </>
  );
}

// Preload the model
useGLTF.preload(MODEL_URL);
