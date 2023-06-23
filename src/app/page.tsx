"use client";
import Tank from "@/component/Tank";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import { useRef } from "react";
import Ground from "@/component/Ground";
import { Physics } from "@react-three/cannon";
import Trees from "@/component/Trees";
import Rocks from "@/component/Rocks";

export default function Home() {
  const contolRef = useRef<any>();

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Canvas>
          <Physics broadphase="SAP" gravity={[0, -10, 0]}>
            <ambientLight intensity={0.3} />
            <directionalLight
              intensity={0.8}
              position={[5, 10, 5]}
              castShadow
            />
            <Ground />
            <Tank />
            <Trees />
            <Rocks />
          </Physics>
          <PointerLockControls ref={contolRef} />
          <OrbitControls ref={contolRef} />
        </Canvas>
      </div>
    </>
  );
}
