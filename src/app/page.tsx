"use client";
import Tank from "@/component/Tank";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import Ground from "@/component/Ground";
import { Physics } from "@react-three/cannon";
import Trees from "@/component/Trees";

export default function Home() {
  const contolRef = useRef<any>();

  const mouseBlocker = () => {
    const element: any = document.body;
    const myDocument: any = document;
    element.requestPointerLock =
      element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock;

    if (/Firefox/i.test(navigator.userAgent)) {
      var fullscreenchange = function (event: any) {
        if (
          myDocument.fullscreenElement === element ||
          myDocument.mozFullscreenElement === element ||
          myDocument.mozFullScreenElement === element
        ) {
          document.removeEventListener("fullscreenchange", fullscreenchange);
          document.removeEventListener("mozfullscreenchange", fullscreenchange);

          element.requestPointerLock();
        }
      };

      myDocument.addEventListener("fullscreenchange", fullscreenchange, false);
      myDocument.addEventListener(
        "mozfullscreenchange",
        fullscreenchange,
        false
      );

      element.requestFullscreen =
        element.requestFullscreen ||
        element.mozRequestFullscreen ||
        element.mozRequestFullScreen ||
        element.webkitRequestFullscreen;

      element.requestFullscreen();
    } else {
      element.requestPointerLock();
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
        onClick={mouseBlocker}
      >
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Physics broadphase="SAP" gravity={[0, -10, 0]}>
            <Ground />
            <Tank />
            <Trees />
          </Physics>
          <OrbitControls ref={contolRef} />
        </Canvas>
      </div>
    </>
  );
}
