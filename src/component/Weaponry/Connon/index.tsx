import { useCylinder, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import React, { use, useEffect } from "react";
import { MathUtils, Vector3 } from "three";

const force = 200;

const Connon = (props: any) => {
  const { scene, gl, camera } = useThree();
  const [isLaunched, setIsLaunched] = React.useState<boolean>(false);
  const {
    disabled = false,
    layer,
    connonStep,
    degreX,
    degreY,
    args = [0.3],
    position = [0, 2, -5],
  } = props;

  const [containerRef, api]: any = useSphere(() => ({
    collisionResponse: false,
    mass: 1,
    args,
    position,
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const radyanX = MathUtils.degToRad(degreX);
    const force = [0, 0, 100];
    const tank = scene.getObjectByName("turret");
    if (!tank) return;
    const target = new Vector3();
    tank?.getWorldPosition(target);
    console.log(target);

    api.position.set(target.x, target.y, target.z);
    api.applyLocalImpulse(force, [1, 1, 0]);
    scene.add(containerRef.current);

    setTimeout(() => {
      api.collisionResponse.set(true);
    }, 100);
    setTimeout(() => {
      scene.remove(containerRef.current);
    }, 5000);
  }, [scene, containerRef, api]);

  return (
    <>
      <mesh ref={containerRef} name="cannon">
        <sphereGeometry args={args} />
        <meshBasicMaterial color={"black"} />
        {/* <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.1, 0.75, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
          <meshStandardMaterial color="black" />
        </mesh> */}
      </mesh>
    </>
  );
};

export default Connon;
