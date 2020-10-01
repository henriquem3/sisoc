import React from 'react';
import {
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
  needAuthentication?: boolean;
  needAdmin?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  needAuthentication = false,
  needAdmin = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        if (needAdmin && !user) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }
        if (needAdmin && user.usuario_tipo.nome.toLowerCase() !== 'admin') {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }
        if (needAuthentication && !user) {
          return (
            <Redirect
              to={{
                pathname: needAuthentication ? '/login' : '/',
                state: { from: location },
              }}
            />
          );
        }
        return <Component />;
      }}
    />
  );
};

export default Route;
