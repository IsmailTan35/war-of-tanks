import { Cylinder, Edges } from "@react-three/drei";
import React, { useRef } from "react";
import MainGun from "../MainGun";
import { useFrame } from "@react-three/fiber";
const Turret = () => {
  const ref = useRef<any>(null);
  useFrame((state, delta) => (ref.current.rotation.y += delta));
  return (
    <>
      <mesh position={[-0.6, 1, 0]} ref={ref}>
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[1, 1, 0.9, 60]}>
            <Edges color="white" />
            <meshBasicMaterial color="darkgreen" />
          </Cylinder>
        </mesh>
        <MainGun />
      </mesh>
    </>
  );
};

export default Turret;
