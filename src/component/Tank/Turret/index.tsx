import { Cylinder, Edges } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import MainGun from "../MainGun";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const Turret = () => {
  const ref = useRef<any>(null);
  const [degreX, setDegreX] = useState(90);
  const [degreY, setDegreY] = useState(180);

  const handleMouseMove = (event: any) => {
    setDegreX(prv => prv + event.movementX * 0.2);
    setDegreY(prv => {
      const fixedData = prv - event.movementY * 2;
      const result = fixedData > 110 ? 110 : fixedData < 90 ? 90 : fixedData;
      return result;
    });
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [document.body]);

  useFrame(() => {
    const turret = ref.current;
    var angle = MathUtils.degToRad(degreX);
    turret.rotation.y = angle;
  });
  return (
    <>
      <group position={[0, 1, 1]} ref={ref} name="turret">
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[1, 1, 0.9, 60]}>
            <Edges color="white" />
            <meshBasicMaterial color="darkgreen" />
          </Cylinder>
        </mesh>
        <MainGun />
      </group>
    </>
  );
};

export default Turret;
