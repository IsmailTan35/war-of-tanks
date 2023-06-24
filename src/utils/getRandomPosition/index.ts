const getRandomPosition = (
  min: number = -250,
  max: number = 250,
  height: number = 4
): [number, number, number] => {
  const x = Math.random() * (max - min) + min;
  const y = height;
  const z = Math.random() * (max - min) + min;
  return [x, y, z];
};

export default getRandomPosition;
