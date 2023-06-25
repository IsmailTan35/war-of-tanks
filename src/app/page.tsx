"use client";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import MyScene from "../component/MyScene";

import { SocketContext, client } from "@/controller/Contex";
import FPSCounter from "@/component/FpsCounter";
import SocketController from "@/controller/SocketController";
import PingCounter from "@/component/PingCounter";
export default function Home() {
  const contolRef = useRef<any>();
  const audioRef = useRef<any>();

  return (
    <>
      <SocketContext.Provider value={client}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <SocketController />
          <div
            style={{
              position: "fixed",
              top: 10,
              left: 10,
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: 100,
              color: "#00ee00",
            }}
          >
            <FPSCounter />
            <PingCounter />
          </div>

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
