import { compose, curry, defaultTo, path } from 'ramda';

export const extractIdFromCurrent = curry((pathTo: string[], rootState) =>
  compose(Number, defaultTo(0), path([...pathTo, 'id']))(rootState)
);
