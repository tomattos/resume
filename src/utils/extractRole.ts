import { compose, isNil, not, prop, when } from 'ramda';

const extractRole = when(compose(not, isNil), prop('ROLE'));

export default extractRole;
