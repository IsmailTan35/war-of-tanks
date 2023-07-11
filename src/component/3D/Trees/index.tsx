import React, { memo } from "react";
import Tree from "./Tree";

const Trees = (props: any) => {
  const { setSeed } = props;
  return (
    <>
      {Array.from({ length: 500 }, (_, index) => (
        <Tree key={index} {...{ setSeed }} idx={index} />
      ))}
    </>
  );
};

export default memo(Trees);
