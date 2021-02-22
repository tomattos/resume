import { curry, equals, path } from 'ramda';

const equalsByPath = curry((pathTo, prev, next) => equals(
  path(pathTo, prev),
  path(pathTo, next),
));

export default equalsByPath;
