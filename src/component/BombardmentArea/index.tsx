import { Cylinder, Ring } from "@react-three/drei";
import React from "react";
import { BackSide, DoubleSide, RingGeometry } from "three";

const BombardmentArea = () => {
  const thickness = 3;
  const scaledInnerRadius = -2 - thickness / 2;
  const scaledOuterRadius = 2 + thickness / 2;
  return (
    <>
      <group position={[0, 1, 0]}>
        <mesh position={[0, 0, 0]}>
          <ringBufferGeometry
            attach="geometry"
            args={[20, 25, 64, 8, 0, Math.PI * 2]}
          />
          <meshBasicMaterial attach="material" color="black" side={2} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 60]} />
          <meshStandardMaterial color="red" />
        </mesh>
        {/* <Cylinder position={[0, 0, 0]} args={[0.3, 0.3, 0.5, 60]}>
          <meshStandardMaterial color="black" />
        </Cylinder> */}
      </group>
    </>
  );
};

export default BombardmentArea;
3;
