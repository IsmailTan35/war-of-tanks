import React from "react";

const Hull = () => {
  return (
    <>
      <mesh name="hull" castShadow receiveShadow>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial color={"darkgreen"} />
      </mesh>
    </>
  );
};

export default Hull;
