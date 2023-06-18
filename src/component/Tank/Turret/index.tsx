import { Cylinder, Edges } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import MainGun from "../MainGun";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
const Turret = () => {
  const ref = useRef<any>(null);
  const [degreX, setDegreX] = useState(90);

  const handleMouseMove = (event: any) => {
    setDegreX(prv => prv + event.movementX * 0.2);
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [document.body]);

  useFrame(() => {
    const camera = ref.current;
    var angle = MathUtils.degToRad(degreX);
    camera.rotation.y = angle;
  });
  return (
    <>
      <mesh position={[0, 1, 1]} ref={ref}>
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
