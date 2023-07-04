import { Edges } from "@react-three/drei";

const debug = true;

export const WheelDebug = ({ radius = [0.6, 8], wheelRef }: any) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.6, 16]} />
          <meshStandardMaterial color={0x222222} />
          <Edges color={"white"} />
        </mesh>
      </group>
    )
  );
};
