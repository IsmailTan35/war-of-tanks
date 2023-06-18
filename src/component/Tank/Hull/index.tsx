import { Circle, Cylinder, Edges } from "@react-three/drei";
import React from "react";

const Hull = () => {
  return (
    <>
      <mesh>
        <meshStandardMaterial color={"red"} />
        <boxGeometry args={[3, 1, 5]} />
        <Edges color="black" />
      </mesh>
    </>
  );
};

export default Hull;
