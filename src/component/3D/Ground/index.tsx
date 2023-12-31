import React, { useRef } from "react";
import { Edges, Plane } from "@react-three/drei";
import { useBox, usePlane } from "@react-three/cannon";

const vArgs: [number, number, number] = [500, 500, 0.1];
const hArgs: [number, number, number] = [500, 0.1, 500];
const groundArgs: [number, number] = [500, 500];
const fenceArgs: [number, number, number] = [500, 3, 0.1];
const fencePosition: [number, number, number] = [0, -249, 0];

const Ground = () => {
  const [groundRef, api]: any = usePlane(
    () => ({
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null)
  );
  const [skyRef, skyApi]: any = useBox(
    () => ({
      args: hArgs,
      type: "Static",
      position: [0, 500, 0],
    }),
    useRef(null)
  );
  const [fenceRef, api2]: any = useBox(
    () => ({
      args: vArgs,
      type: "Static",
      position: [250, 250, 0],
      rotation: [0, Math.PI / 2, 0],
    }),
    useRef(null)
  );
  const [fenceRef2, api3]: any = useBox(
    () => ({
      args: vArgs,
      type: "Static",
      position: [-250, 250, 0],
      rotation: [0, Math.PI / 2, 0],
    }),
    useRef(null)
  );
  const [fenceRef3, api4]: any = useBox(
    () => ({
      args: vArgs,
      type: "Static",
      position: [0, 250, 250],
    }),
    useRef(null)
  );

  const [fenceRef4, api5]: any = useBox(
    () => ({
      args: vArgs,
      type: "Static",
      position: [0, 250, -250],
    }),
    useRef(null)
  );

  const fenceRefArr = [fenceRef, fenceRef2, fenceRef3, fenceRef4];

  return (
    <>
      <mesh name="ground" ref={groundRef} receiveShadow>
        <planeGeometry args={groundArgs} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
      {fenceRefArr.map((ref, idx) => {
        return (
          <mesh key={idx} receiveShadow name="ground" ref={ref}>
            <mesh position={fencePosition}>
              <boxGeometry args={fenceArgs} />
              <meshStandardMaterial
                color={0x000000}
                opacity={0.2}
                transparent
              />
              <Edges color={0x3e3f44} />
            </mesh>
          </mesh>
        );
      })}
    </>
  );
};

export default Ground;
