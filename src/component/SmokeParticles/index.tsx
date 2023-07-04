import { useFrame } from "@react-three/fiber";
import { use, useEffect, useRef } from "react";

const SmokeParticles = () => {
  const points = useRef<any>(null);

  useFrame(() => {
    console.log(points.current.material.size);
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      points.current.material.size += 0.01;
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 15000);
  }, []);
  return (
    <points ref={points} position={[0, 3, 0]}>
      <sphereGeometry args={[15, 480, 480]} />
      <pointsMaterial color="white" size={0.015} sizeAttenuation />
    </points>
  );
};

export default SmokeParticles;
