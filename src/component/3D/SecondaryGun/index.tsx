import React, { cloneElement, forwardRef } from "react";

const SecondaryGun = forwardRef((props: any, ref: any) => {
  const { id } = props;
  return (
    <mesh
      name={"secondary-gun-" + id}
      position={[1.4, 0, -0.65]}
      rotation={[0, 0, Math.PI / 2]}
    >
      <cylinderGeometry args={[0.06, 0.06, 0.7, 60]} />
      <meshStandardMaterial color={0x637f0e} />
      <mesh position={[0, 0.5, 0.02]}>
        <sphereGeometry args={[0.3, 60]} />
        <meshStandardMaterial color={0x3e3f44} />
      </mesh>
      <mesh position={[0, -0.4, 0.02]} name={"secondary-gun-barrel" + id}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 60]} />
        <meshStandardMaterial color={0x3e3f44} />
      </mesh>
      <mesh name={"secondary-gun-vectorial" + id} position={[0, -4, 0]} />
      {props.children ? cloneElement(props.children, { id }) : null}
    </mesh>
  );
});
SecondaryGun.displayName = "SecondaryGun";
export default SecondaryGun;
