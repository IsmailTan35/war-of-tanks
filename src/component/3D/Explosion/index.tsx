import { getRandomPositionInSphere } from "@/utils/getRandomPosition";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const Explosion = () => {
  const groupRef: any = useRef();
  const args: any = [0.2, 32, 60, 5];

  useEffect(() => {
    if (!groupRef.current) return;
    let intervalID: any;
    let intervalID2: any;
    let scale = 0;
    intervalID = setInterval(() => {
      scale += 0.5;
      groupRef.current.children.forEach((item: any) => {
        item.scale.set(scale, scale, scale);
      });
      if (scale > 7) {
        clearInterval(intervalID);
        intervalID2 = setInterval(() => {
          scale -= 0.5;
          groupRef.current.children.forEach((item: any) => {
            item.scale.set(scale, scale, scale);
          });
          if (scale < 0) {
            clearInterval(intervalID2);
          }
        }, 10);
      }
    }, 10);
    return () => {
      clearInterval(intervalID);
      clearInterval(intervalID2);
    };
  }, [groupRef]);
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {Array.from({ length: 125 }).map((item, index) => {
        const radius = Math.random() * (5 - 1) + 1;
        const rnd = getRandomPositionInSphere(radius);
        return (
          <mesh position={[rnd[0], rnd[1], rnd[2]]} key={index}>
            <sphereGeometry args={args} />
            <meshStandardMaterial color={0x636969} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Explosion;
