"use client";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import MyScene from "../component/MyScene";
import { SocketContext, client } from "@/controller/Contex";
export default function Home() {
  const contolRef = useRef<any>();

  return (
    <>
      <SocketContext.Provider value={client}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Canvas>
            <MyScene />
            <PointerLockControls ref={contolRef} />
            <OrbitControls ref={contolRef} />
          </Canvas>
        </div>
      </SocketContext.Provider>
    </>
  );
}
