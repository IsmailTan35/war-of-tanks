import { Circle, Cylinder, Edges } from "@react-three/drei";
import React from "react";

const Hull = () => {
  return (
    <>
      <mesh>
        <mesh>
          <meshStandardMaterial color={"red"} />
          <boxGeometry args={[5, 1, 3]} />
          <Edges color="black" />
        </mesh>
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </>
  );
};

export default Hull;
