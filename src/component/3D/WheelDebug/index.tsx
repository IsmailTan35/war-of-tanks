import { Edges } from "@react-three/drei";

const debug = true;

export const WheelDebug = ({ radius = [0.6, 8], wheelRef }: any) => {
  return (
    debug && (
      <group ref={wheelRef} name="wheel-debug-5565456">
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.7, 20]} />
          <meshStandardMaterial color={0x3e3f44} />
          <Edges color={"black"} />
        </mesh>
      </group>
    )
  );
};
