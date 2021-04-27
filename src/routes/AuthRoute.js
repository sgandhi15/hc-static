import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = ({ component: Component, isRole, ...rest }) => {
  const role = useSelector((state) => state.data.role);

  return (
    <Route
      {...rest}
      render={(props) =>
        role ? (
          role === isRole ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/${role}/dashboard`} />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
