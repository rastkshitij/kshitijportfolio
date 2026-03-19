import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
// Ensure you have this model in your public folder or use a valid URL
function Soldier({ mode = 'idle' }: { mode?: 'idle' | 'walk' | 'run' }) {
  const group = useRef<THREE.Group>(null);
  // Using the official Three.js example model URL
  const { scene, animations } = useGLTF('/models/soldier.glb') ;
  const { actions } = useAnimations(animations, group);
  const activeAction = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (actions) {
      const animName = mode === 'idle' ? 'Idle' : mode === 'walk' ? 'Walk' : 'Run';
      const nextAction = actions[animName];
      
      if (nextAction && nextAction !== activeAction.current) {
        const prevAction = activeAction.current;
        
        // Smooth transition logic
        nextAction.reset();
        nextAction.setEffectiveTimeScale(1);
        nextAction.setEffectiveWeight(1);
        nextAction.fadeIn(0.5);
        nextAction.play();
        
        if (prevAction) {
          prevAction.fadeOut(0.5);
        }
        
        activeAction.current = nextAction;
      }
    }
  }, [actions, mode]);

  useFrame((state) => {
    if (group.current) {
      // Rotate to face front (camera is at +Z)
      // The model usually faces -Z, so rotate 180 degrees (Math.PI)
      group.current.rotation.y = Math.PI + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -2.5, 0]} scale={2.5}>
      <primitive object={scene} />
    </group>
  );
}

export default function ThreeBackground({ mode = 'idle' }: { mode?: 'idle' | 'walk' | 'run' }) {
  // Force dark theme colors as requested for the background
  const bgColor = '#020617';
  const fogColor = '#020617';
  const accentColor = '#10b981';

  return (
    <div className="fixed inset-0 -z-10 bg-transparent pointer-events-none transition-opacity duration-1000">
      <Canvas shadows camera={{ position: [2, 2, 8], fov: 45 }}>
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          color={accentColor}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={accentColor} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Soldier mode={mode} />
          </Float>
          
          {/* Ground plane as in the example but styled for dark theme */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.2} />
          </mesh>

          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.6} 
            scale={20} 
            blur={2.5} 
            far={4.5} 
          />
          <ambientLight intensity={0.5} />
<directionalLight position={[5, 5, 5]} intensity={1.5} />
        </Suspense>
      </Canvas>
      
      {/* Subtle scanline overlay for futuristic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,4px_100%] pointer-events-none opacity-20" />
      
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />
    </div>
  );
}
