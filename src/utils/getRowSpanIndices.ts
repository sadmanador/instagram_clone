export const getRowSpanIndices = (numItems: number) => {
  const indices = [];
  let currentIndex = 2;

  while (currentIndex < numItems) {
    indices.push(currentIndex);

    const lastIndex = indices.length - 1;
    if (lastIndex % 2 === 0) {
      currentIndex += 3;
    } else {
      currentIndex += 7;
    }
  }

  return indices;
};
