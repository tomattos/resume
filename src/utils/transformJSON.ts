import { curry, lensProp, over } from 'ramda';

const transformJSON = curry(
  <T>(
    lensPropertyName: string,
    jsonMethod: 'stringify' | 'parse',
    object: T
  ): T => {
    const propLens = lensProp(lensPropertyName);

    return over(propLens, JSON[jsonMethod])(object);
  }
);

export default transformJSON;
