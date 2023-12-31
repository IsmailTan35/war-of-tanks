import React, { cloneElement, forwardRef } from "react";
import GunSight from "../GunSight";
import { useAppSelector } from "@/store";

const MainGun = forwardRef((props: any, ref: any) => {
  const { id, idx } = props;
  const selectedCameraID = useAppSelector(state => state.camera.selectedID);
  const { spectatorMode } = useAppSelector(state => state.camera);
  return (
    <group
      position={[1, 0, 0]}
      ref={ref}
      rotation={[0, 0, Math.PI / 2]}
      name="main-gun"
    >
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.3, 0.5, 60]} />
        <meshStandardMaterial color={0x3e3f44} />
      </mesh>
      {(!spectatorMode && id == "player") || selectedCameraID === idx + 1 ? (
        <GunSight {...{ id }} />
      ) : null}
      <group>
        <mesh
          position={[0, -1.5, 0]}
          name={"pipe" + id}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.1, 0.1, 2.5, 60]} />
          <meshStandardMaterial color={0x637f0e} />
        </mesh>
        <mesh
          position={[0, -3, 0]}
          name={"barrel-" + id}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 0.5, 60]} />
          <meshStandardMaterial color={0x3e3f44} />
        </mesh>
        <mesh position={[0, -5, 0]} name={"vectorial-barrel-" + id}></mesh>
        {props.children ? cloneElement(props.children, { id }) : null}
      </group>
    </group>
  );
});
MainGun.displayName = "MainGun";

export default MainGun;
