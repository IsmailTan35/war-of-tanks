import React from "react";
import { Edges } from "@react-three/drei";

const Hull = () => {
  return (
    <>
      <mesh>
        <meshStandardMaterial color={0x637f0e} />
        <boxGeometry args={[3, 1, 5]} />
        <Edges color="black" />
      </mesh>
    </>
  );
};

export default Hull;
