import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";

const Destroy = () => {
  const { scene }: any = useThree();
  const [args, setArgs] = useState(0.5);
  const [close, setClose] = useState(false);
  const [destroyRef, destroyApi]: any = useSphere(() => ({
    position: [0, 0, 0],
    args: [args],
    collisionResponse: false,
    type: "Static",
  }));

  useFrame(() => {
    if (close) return;
    setArgs(prv => prv + 0.1);
  });
  useEffect(() => {
    let intervalID: any;
    setTimeout(() => {
      scene.remove(destroyRef.current);
      setClose(true);
    }, 500);
    intervalID = setInterval(() => {
      setArgs(prv => prv - 0.1);
    }, 10);
    setTimeout(() => {
      clearInterval(intervalID);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return (
    <mesh ref={destroyRef} position={[0, 0, 0]}>
      <sphereGeometry args={[args]} />
      <meshStandardMaterial color={0x000000} transparent opacity={0.7} />
    </mesh>
  );
};

export default Destroy;
