const debug = true;

export const WheelDebug = ({ radius, wheelRef }: any) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.35, 32]} />
          <meshBasicMaterial
            transparent={true}
            opacity={0.25}
            color={"black"}
          />
        </mesh>
      </group>
    )
  );
};
