import React, { forwardRef, memo } from "react";
interface IHitbox {
  name: string;
  children?: any;
}

const hitArgs: any = [5, 5, 7];

const Hitbox = forwardRef((props: IHitbox, ref: any) => {
  const { name } = props;

  return (
    <mesh name={"tank-hitbox-" + name} ref={ref}>
      {false && (
        <>
          <boxGeometry args={hitArgs} />
          <meshStandardMaterial
            color={0x000000}
            transparent={true}
            opacity={0.2}
          />
        </>
      )}
      {props.children}
    </mesh>
  );
});

Hitbox.displayName = "Hitbox";

export default memo(Hitbox);
