"use client";
import react, { useState } from "react";
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
import { Object3D } from "three";
import { SpotLight } from "@react-three/drei";

export default function Home() {
  const [showName, setShowName] = react.useState(
    process.env.NODE_ENV === "production" ? true : false
  );
  const [target] = useState(new Object3D());
  
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
            <Canvas shadows linear>
              <ambientLight intensity={0.3} />
              <pointLight
                position={[1, 200, 1]}
                intensity={2.5}
                color={"rgb(237,213,158)"}
                castShadow
                receiveShadow
                shadow-mapSize-height={4320}
                shadow-mapSize-width={4320}
              />

              <primitive object={target} position={[0, 0, 0]} />
              <fog attach="fog" args={["#ccc", 0, 400]} />
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
