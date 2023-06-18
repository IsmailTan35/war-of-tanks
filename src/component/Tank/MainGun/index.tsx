import { Cylinder, Edges } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
const MainGun = () => {
  const meshRef = useRef<any>();
  const mainGunRef = useRef<any>();
  const connectionPointRef = useRef<any>();

  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.rotation.z = 1.55;
  }, [meshRef]);

  useEffect(() => {
    if (!connectionPointRef) return;
    connectionPointRef.current.rotation.x = 1.55;
  }, [connectionPointRef]);

  const [radyanX, setRadyanX] = useState(180);
  const [radyanY, setRadyanY] = useState(110);
  const handleMouseMove = (event: any) => {
    setRadyanX(prv => prv + event.movementX * 0.2);
    setRadyanY(prv => {
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

  useFrame(state => {
    if (!meshRef.current) return;
    var target = new Vector3();
    mainGunRef.current.getWorldPosition(target);
    var cameraDistance = 20;
    state.camera.position.set(0, 5, -cameraDistance);
    var angle = MathUtils.degToRad(radyanX);
    state.camera.position.applyAxisAngle(new Vector3(0, 1, 0), angle);
    state.camera.lookAt(target.x, target.y, target.z);
    var angleY = MathUtils.degToRad(radyanY);
    meshRef.current.rotation.z = angleY;
  });
  return (
    <>
      <mesh position={[1.6, 0, 0]} ref={mainGunRef}>
        <mesh ref={connectionPointRef} position={[-0.8, 0, 0]}>
          <Cylinder args={[0.3, 0.3, 0.5, 60]}>
            <Edges color="black" />
            <meshBasicMaterial color="hotpink" />
          </Cylinder>
        </mesh>
        <group ref={meshRef}>
          <mesh>
            <Cylinder args={[0.1, 0.1, 4, 60]}>
              <Edges color="black" />
              <meshBasicMaterial color="hotpink" />
            </Cylinder>
          </mesh>
          <mesh position={[0, -2, 0]} ref={meshRef}>
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshBasicMaterial color="hotpink" />
            </Cylinder>
          </mesh>
        </group>
      </mesh>
    </>
  );
};

export default MainGun;
