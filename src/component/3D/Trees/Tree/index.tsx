import { tanksPositionActions, useAppDispatch } from "@/store";
import { useBox } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import React, { memo, useEffect } from "react";

const Tree = (props: any) => {
  const dispatch = useAppDispatch();
  const { scene } = useThree();
  const { position, show } = props;
  const args: any = [3, 3, 6];
  const [treeRef, treeApi]: any = useBox(() => ({
    args: args,
    mass: 1,
    position,
    onCollideEnd: e => {
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
        props.setTreesArr((prev: any) => {
          const newArr = [...prev];
          newArr[props.idx].isDestroy = true;
          return newArr;
        });
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
      <mesh ref={treeRef} name="tree" castShadow>
        {show && (
          <group position={[0, 0, 0]} castShadow>
            <mesh position={[0, 3.5, 0]} castShadow>
              <coneGeometry args={[0.5, 1, 16]} />
              <meshStandardMaterial color="green" />
            </mesh>
            <mesh position={[0, 2.5, 0]} castShadow>
              <coneGeometry args={[1, 1.5, 16]} />
              <meshStandardMaterial color="green" />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <coneGeometry args={[1.25, 2, 16]} />
              <meshStandardMaterial color="green" />
            </mesh>
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 4, 16]} />
              <meshStandardMaterial color="brown" />
            </mesh>
          </group>
        )}
      </mesh>
    </>
  );
};

export default memo(Tree);
