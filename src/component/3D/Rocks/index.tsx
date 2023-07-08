import React from "react";
import Rock from "./Rock";

const Rocks = () => {
  const getRandomPosition = () => {
    const min = -250;
    const max = 250;
    const x = Math.random() * (max - min) + min;
    const y = 2.5;
    const z = Math.random() * (max - min) + min;
    return [x, y, z];
  };

  return (
    <>
      {Array.from({ length: 100 }, (_, index) => (
        <Rock key={index} position={getRandomPosition()} />
      ))}
    </>
  );
};

export default Rocks;
