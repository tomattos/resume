import React from 'react';
import { curry } from 'ramda';

function withShouldUpdate(
  conditionChecker: (prevProps: any, nextProps: any) => boolean,
  WrappedComponent: React.FunctionComponent | any
) {
  return React.memo(
    (props) => <WrappedComponent {...props} />,
    conditionChecker,
  );
}

export default curry(withShouldUpdate);
