import { useCylinder, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";
import { MathUtils } from "three";

const force = 50;

const Connon = (props: any) => {
  const [isLaunched, setIsLaunched] = React.useState<boolean>(false);
  const {
    disabled = false,
    layer,
    connonStep,
    radyanX,
    radyanY,
    args = [0.1, 0.1, 1.25, 32],
    position = [1, 1, 1],
  } = props;
  const [containerRef, api]: any = useSphere(() => ({
    mass: 0,
    args,
    position,
    type: "Dynamic",
    collisionResponse: false,
    collisionFilterGroup: 1,
  }));

  useEffect(() => {
    if (!isLaunched && connonStep === layer) {
      console.log(213);
      // const radianX = (Math.PI / 180) * radyanX;
      // const radianY = (Math.PI / 180) * radyanY;
      const velocityX = force * Math.cos((Math.PI / 180) * radyanX);
      const velocityY = force * Math.sin((Math.PI / 180) * radyanY);
      api.mass.set(1);
      api.collisionResponse.set(true);
      setTimeout(() => {
        api.velocity.set(velocityX, velocityY, 0);
      }, 500);
      setIsLaunched(true);
    }
  }, [connonStep]);

  return (
    <>
      <mesh ref={containerRef} position={position}>
        <cylinderGeometry args={args} />
        <meshBasicMaterial transparent={true} opacity={0.25} color={"black"} />
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.1, 0.75, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
    </>
  );
};

export default Connon;
