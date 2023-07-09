import React, { memo } from "react";
import Rock from "./Rock";

const Rocks = (props: any) => {
  const { setSeed } = props;
  return (
    <>
      {Array.from({ length: 100 }, (_, index) => (
        <Rock key={index} {...{ setSeed }} />
      ))}
    </>
  );
};

export default memo(Rocks);
