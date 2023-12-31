import { Edges, Sphere } from "@react-three/drei";
import React, { useEffect } from "react";

const Tracks = (props: any) => {
  const [show, setShow] = React.useState(true);
  const { direction, radius = [0.7, 20] } = props;
  const ref = React.useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.x = 1.55;
    ref.current.rotation.z = 1.55;
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, [ref]);

  return (
    <>
      {show && (
        <group
          position={[direction == "left" ? 1.7 : -1.7, -1.35, 0]}
          ref={ref}
        >
          <mesh position={[-2, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={radius} />
            <meshStandardMaterial color={0x3e3f44} />
            <Edges color={"black"} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={radius} />
            <meshStandardMaterial color={0x3e3f44} />
            <Edges color={"black"} />
          </mesh>
          <mesh position={[2, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={radius} />
            <meshStandardMaterial color={0x3e3f44} />
            <Edges color={"black"} />
          </mesh>
        </group>
      )}
    </>
  );
};

export default Tracks;
