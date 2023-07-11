import { tanksPositionActions, useAppDispatch } from "@/store";
import {
  getRandomPosition,
  getSeedRandomPosition,
} from "@/utils/getRandomPosition";
import { useBox } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import React, { memo, useEffect } from "react";

const Tree = (props: any) => {
  const dispatch = useAppDispatch();
  const { scene } = useThree();
  const { position } = props;
  const [treeRef, treeApi]: any = useBox(() => ({
    args: [2.45, 6, 2.45],
    mass: 1,
    position,
    onCollide: e => {
      if (e.body?.name === "ground") return;
      dispatch(
        tanksPositionActions.updateCustomPosition({
          id: props.idx,
          type: "trees",
          position: null,
        })
      );
      setTimeout(() => {
        scene.remove(treeRef.current);
        treeApi.collisionResponse.set(false);
      }, 500);
    },
  }));

  useEffect(() => {
    dispatch(
      tanksPositionActions.updateCustomPosition({
        id: props.idx,
        position,
        type: "trees",
      })
    );
  }, [position]);

  return (
    <>
      <mesh ref={treeRef} name="tree">
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

export default memo(Tree);
