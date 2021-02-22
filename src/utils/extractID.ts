import { compose, isNil, not, prop, when } from 'ramda';

/**
 * @description expect decoded value from accessToken
 * */
const extractID = when(compose(not, isNil), prop('ID'));

export default extractID;
