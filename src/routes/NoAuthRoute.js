import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const NoAuthRoute = ({ component: Component, isRole, ...rest }) => {
  const role = useSelector((state) => state.data.role);

  return (
    <Route
      {...rest}
      render={(props) =>
        role ? <Redirect to={`/${role}/dashboard`} /> : <Component {...props} />
      }
    />
  );
};

export default NoAuthRoute;
