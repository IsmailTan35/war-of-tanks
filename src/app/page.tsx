"use client";
import react from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import MyScene from "../component/MyScene";

import { SocketContext, client } from "@/controller/Contex";
import FPSCounter from "@/component/FpsCounter";
import SocketController from "@/controller/SocketController";
import PingCounter from "@/component/PingCounter";
import Name from "@/component/Name";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Home() {
  const [showName, setShowName] = react.useState(true);
  return (
    <>
      <Provider store={store}>
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
            {showName ? <Name /> : null}
            <Canvas>
              <MyScene />
              <PointerLockControls
                selector={showName ? "#button" : undefined}
              />
              <OrbitControls />
            </Canvas>
          </div>
        </SocketContext.Provider>
      </Provider>
    </>
  );
}
