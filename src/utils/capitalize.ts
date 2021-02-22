import { replace, toUpper } from 'ramda';

const capitalize = replace(/^./, toUpper);

export default capitalize;
