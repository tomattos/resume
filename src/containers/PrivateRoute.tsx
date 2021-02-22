import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from 'store/auth/selectors';

type PrivateRouteProps = RouteProps & {
  component: () => ReactElement;
};

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const isLoggedIn = useSelector(selectLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )}
    />
  );
}

export default PrivateRoute;
