"use client";
import Tank from "@/component/Tank";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
export default function Home() {
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
          <Tank />
          <PerspectiveCamera />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
