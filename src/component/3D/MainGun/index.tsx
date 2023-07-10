import { Cylinder, Edges } from "@react-three/drei";
import React, { cloneElement, forwardRef } from "react";

const MainGun = forwardRef((props: any, ref: any) => {
  const { id } = props;
  return (
    <>
      <mesh position={[1, 0, 0]} ref={ref} rotation={[0, 0, Math.PI / 2]}>
        <Cylinder
          args={[0.3, 0.3, 0.5, 60]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <Edges color="black" />
          <meshStandardMaterial color={0x3e3f44} />
        </Cylinder>
        <mesh>
          <mesh position={[0, -1.5, 0]} name={"pipe" + id}>
            <Cylinder args={[0.1, 0.1, 2.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color={0x637f0e} />
            </Cylinder>
          </mesh>
          <mesh position={[0, -3, 0]} name={"barrel-" + id}>
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color={0x3e3f44} />
            </Cylinder>
          </mesh>
          <mesh position={[0, -5, 0]} name={"vectorial-barrel-" + id}></mesh>
          {props.children ? cloneElement(props.children, { id }) : null}
        </mesh>
      </mesh>
    </>
  );
});
MainGun.displayName = "MainGun";

export default MainGun;
