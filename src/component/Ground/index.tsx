import { Plane } from "@react-three/drei";
import React, { useRef } from "react";
import { usePlane } from "@react-three/cannon";

const Ground = () => {
  const [groundRef, api]: any = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null)
  );
  return (
    <>
      <mesh position={[0, 0, 0]} ref={groundRef} receiveShadow name="ground">
        <Plane args={[500, 500]}>
          <meshStandardMaterial color="#00ff00" />
        </Plane>
      </mesh>
    </>
  );
};

export default Ground;
