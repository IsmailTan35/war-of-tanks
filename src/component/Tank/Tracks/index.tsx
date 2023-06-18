import { Cylinder, Edges, Ring } from "@react-three/drei";
import React, { useEffect } from "react";

const Tracks = (props: any) => {
  const { direction } = props;
  const ref = React.useRef<any>(null);
  useEffect(() => {
    if (!ref) return;
    ref.current.rotation.x = 1.55;
    ref.current.rotation.z = 1.55;
  }, [ref]);

  return (
    <>
      <mesh position={[direction == "left" ? 1.5 : -1.5, -0.5, 0]} ref={ref}>
        <mesh position={[-1.5, 0, 0]}>
          <Cylinder args={[0.5, 0.5, 0.5, 60]}>
            <Edges color="black" />
            <meshBasicMaterial color="hotpink" />
          </Cylinder>
        </mesh>
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[0.5, 0.5, 0.5, 60]}>
            <Edges color="black" />
            <meshBasicMaterial color="hotpink" />
          </Cylinder>
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <Cylinder args={[0.5, 0.5, 0.5, 60]}>
            <Edges color="black" />
            <meshBasicMaterial color="hotpink" />
          </Cylinder>
        </mesh>
      </mesh>
    </>
  );
};

export default Tracks;
