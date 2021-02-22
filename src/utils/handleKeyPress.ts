import {
  always,
  compose,
  curry,
  ifElse,
  path,
  pathEq,
  trim,
  when,
} from 'ramda';
import { KeyboardEvent } from 'react';

interface KeyPressHandler {
  (value: string): any;
}

const handleKeyPress = curry(
  (
    key: string,
    defaultValue: string,
    handler: KeyPressHandler,
    event: KeyboardEvent
  ) => {
    when(
      pathEq(['key'], key),
      compose(
        handler,
        ifElse(
          (val) => Boolean(trim(val)),
          (val) => val,
          always(defaultValue)
        ),
        path(['target', 'value'])
      )
    )(event);
  }
);

export default handleKeyPress;
