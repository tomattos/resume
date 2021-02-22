import { allPass, propIs } from 'ramda';

const propIsString = propIs(String);

const checkForTokens = allPass([
  propIsString('accessToken'),
  propIsString('refreshToken'),
]);

export default checkForTokens;
