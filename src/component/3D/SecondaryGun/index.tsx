import React, { cloneElement, forwardRef } from "react";

const SecondaryGun = forwardRef((props: any, ref: any) => {
  const { id } = props;

  return (
    <group
      name={"secondary-gun-" + id}
      position={[1, 0, -0.65]}
      rotation={[0, 0, Math.PI / 2]}
      ref={ref}
    >
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 60]} />
        <meshStandardMaterial color={0x637f0e} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 60]} />
        <meshStandardMaterial color={0x3e3f44} />
      </mesh>
      <mesh
        position={[0, -0.8, 0.02]}
        name={"secondary-gun-barrel-" + id}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.08, 0.08, 0.2, 60]} />
        <meshStandardMaterial color={0x3e3f44} />
      </mesh>
      <mesh
        name={"secondary-gun-vectorial-barrel-" + id}
        position={[0, -2, 0.025]}
        castShadow
        receiveShadow
      ></mesh>
      {props.children ? cloneElement(props.children, { id }) : null}
    </group>
  );
});
SecondaryGun.displayName = "SecondaryGun";
export default SecondaryGun;
