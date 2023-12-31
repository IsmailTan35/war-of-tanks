import React, { memo, useEffect, useState } from "react";
import { useBox } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { tanksPositionActions, useAppDispatch } from "@/store";

const disabledCollide = [
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
  "ground",
  "cannon",
];
function Rock(props: any) {
  const { position, setSeed, show } = props;
  const dispath = useAppDispatch();
  const { scene } = useThree();
  const args: any = [11.5, 5, 5];
  const [isCollided, setIsCollided] = useState(false);
  const [stoneRef, stoneApi]: any = useBox(() => ({
    type: "Static",
    args,
    mass: 1500,
    position,
    onCollide: (e: any) => {
      if (!e.body?.name || disabledCollide.includes(e.body.name) || isCollided)
        return;
      setIsCollided(prv => {
        if (prv) return prv;
        setTimeout(() => {
          scene.remove(stoneRef.current);
          stoneApi.collisionResponse.set(false);
          props.setRocksArr((prev: any) => {
            const newArr = [...prev];
            newArr[props.idx].isDestroy = true;
            return newArr;
          });
        }, 500);
        return prv;
      });
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsCollided(true);
    }, 2500);
  }, [stoneRef]);

  useEffect(() => {
    dispath(
      tanksPositionActions.updateCustomPosition({
        id: props.idx,
        position,
        type: "rocks",
      })
    );
  }, [position]);

  return (
    <>
      <group position={position} ref={stoneRef} name="rock">
        {show && (
          <>
            <mesh position={[3, 0, 0]} castShadow>
              <sphereGeometry args={[3, 15, 15, 15, 15, 0, 15]} />
              <meshStandardMaterial color={0x9999999} />
            </mesh>
            <mesh castShadow>
              <sphereGeometry args={[3, 15, 15, 15, 15, 0, 15]} />
              <meshStandardMaterial color={0x9999999} />
            </mesh>
            <mesh position={[-3, 0, 0]} castShadow>
              <sphereGeometry args={[3, 15, 15, 15, 15, 0, 15]} />
              <meshStandardMaterial color={0x9999999} />
            </mesh>
          </>
        )}
      </group>
      <color attach="background" args={["lightblue"]} />
    </>
  );
}

export default memo(Rock);
