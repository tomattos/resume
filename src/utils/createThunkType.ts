const createThunkType = (sliceName: string) => (thunkName: string): string =>
  `${sliceName}/${thunkName}`;

export default createThunkType;
