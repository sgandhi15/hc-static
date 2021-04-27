import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action/userAction";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <div></div>;
};

export default Logout;
