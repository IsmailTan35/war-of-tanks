import React from "react";
import { Edges } from "@react-three/drei";

const Hull = () => {
  return (
    <>
      <mesh name="hull">
        <meshStandardMaterial color={0x637f0e} />
        <boxGeometry args={[3, 1, 5]} />
        <Edges color={0x3e3f44} />
      </mesh>
    </>
  );
};

export default Hull;
