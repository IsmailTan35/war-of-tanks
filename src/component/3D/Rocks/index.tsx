import React, { memo } from "react";
import Rock from "./Rock";

const Rocks = (props: any) => {
  const { setSeed } = props;
  return (
    <>
      {Array.from({ length: 100 }, (_, index) => (
        <Rock key={index} {...{ setSeed }} idx={index} />
      ))}
    </>
  );
};

export default memo(Rocks);
