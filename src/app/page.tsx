"use client";
import Tank from "@/component/Tank";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import Ground from "@/component/Ground";
import { Physics } from "@react-three/cannon";
import Trees from "@/component/Trees";

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
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Physics broadphase="SAP" gravity={[0, -10, 0]}>
            <Ground />
            <Tank />
            <Trees />
          </Physics>
          <PointerLockControls ref={contolRef} />
          <OrbitControls ref={contolRef} />
        </Canvas>
      </div>
    </>
  );
}
