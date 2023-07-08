import React from "react";
import { useBox } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
const Tree = (props: any) => {
  const { scene } = useThree();
  const { position } = props;
  const [treeRef, treeApi]: any = useBox(() => ({
    args: [2.45, 6, 2.45],
    position,
    mass: 1,
    onCollide: e => {
      if (e.body?.name === "ground") return;
      setTimeout(() => {
        scene.remove(treeRef.current);
        treeApi.collisionResponse.set(false);
      }, 500);
    },
  }));

  return (
    <>
      <mesh position={position} ref={treeRef} name="tree">
        <group position={[0, -1, 0]}>
          <mesh position={[0, 3.5, 0]}>
            <coneGeometry args={[0.5, 1, 16]} />
            <meshStandardMaterial color="green" />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[1, 1.5, 16]} />
            <meshStandardMaterial color="green" />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[1.25, 2, 16]} />
            <meshStandardMaterial color="green" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 4, 16]} />
            <meshStandardMaterial color="brown" />
          </mesh>
        </group>
      </mesh>
    </>
  );
};

const Trees = () => {
  const getRandomPosition = () => {
    const min = -250;
    const max = 250;
    const x = Math.random() * (max - min) + min;
    const y = 3;
    const z = Math.random() * (max - min) + min;
    return [x, y, z];
  };

  return (
    <>
      {Array.from({ length: 500 }, (_, index) => (
        <Tree key={index} position={getRandomPosition()} />
      ))}
    </>
  );
};

export default Trees;
