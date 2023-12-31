import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
const args: any = [5, 5, 5];
const position: any = [10, 1, 0];
const rotation: any = [0, 0, 0];

const FiringArea = () => {
  const { scene } = useThree();
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      type: "Static",
      mass: 100000,
      allowSleep: false,
      position,
      rotation,
      args,
      collisionResponse: false,
      onCollide: (e: any) => {
        console.log(e);
      },
    }),
    useRef(null)
  );

  return (
    <>
      <mesh ref={chassisBody} name="tank-firing-area">
        <boxGeometry args={args} />
        <meshStandardMaterial
          color={0x000000}
          transparent={true}
          opacity={0.2}
        />
        <Edges color="black" />
      </mesh>
    </>
  );
};

export default FiringArea;
