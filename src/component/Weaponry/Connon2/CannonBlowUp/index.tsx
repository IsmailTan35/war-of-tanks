import React, { memo, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const CannonBlowUp = (props: any) => {
  const { position, setIsDestroyed } = props;
  const { scene }: any = useThree();
  const [cannonBlowUpRef, api]: any = useSphere(() => ({
    position: [position.x, position.y, position.z],
    type: "Static",
    args: [0.3],
    onCollideBegin: (e: any) => {},
    mass: 5,
    collisionResponse: false,
  }));

  useEffect(() => {
    const targetScale = 4;
    let timeoutId: any;
    let intervalID: any;
    let scale = 1;
    let isScaling = true;
    scene.add(cannonBlowUpRef.current);

    const updateScale = () => {
      if (isScaling) {
        scale = THREE.MathUtils.lerp(scale, targetScale, 0.1);
        cannonBlowUpRef.current.scale.set(scale, scale, scale);

        if (scale >= targetScale - 0.01) {
          isScaling = false;
        }
      } else {
        scale = THREE.MathUtils.lerp(scale, 0, 0.1);
        cannonBlowUpRef.current.scale.set(scale, scale, scale);

        if (scale <= 0.01) {
          clearInterval(intervalID);
        }
      }
    };
    api.collisionResponse.set(true);
    intervalID = setInterval(updateScale, 10);

    setTimeout(() => {
      scene.remove(cannonBlowUpRef.current);
      clearInterval(intervalID);
      setIsDestroyed(true);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalID);
      scene.remove(cannonBlowUpRef.current);
      setIsDestroyed(true);
    };
  }, []);
  return (
    <mesh ref={cannonBlowUpRef} name="cannonBlowUp">
      <sphereGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const CustomBlowUp = (props: any) => {
  const [isDestroyed, setIsDestroyed] = React.useState(false);
  useEffect(() => {
    if (!isDestroyed) return;
  }, [isDestroyed]);
  return (
    <>
      {!isDestroyed ? <CannonBlowUp {...{ ...props, setIsDestroyed }} /> : null}
    </>
  );
};
export default memo(CustomBlowUp);
