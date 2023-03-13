const DEFAULT_SIZE = 80;

export const getConfig = (screenWidth: number) => {
  const width = screenWidth - 4;

  if (width / DEFAULT_SIZE > 3) {
    return {
      actualSize: width / Math.floor(width / DEFAULT_SIZE),
      numColumns: Math.floor(width / DEFAULT_SIZE),
    };
  }

  return {
    actualSize: width / 3,
    numColumns: 3,
  };
};
