import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/action/userAction";
import Error from "../Error";
import { EMAIL_REGEX } from "./Regx";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [er, setEr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email.match(EMAIL_REGEX)) {
      setEr("Please enter valid email...!");
      return false;
    } else setEr();
    try {
      dispatch(login(data, setEr));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="content" style={{ minHeight: "5.6px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* Login Tab Content */}
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="/assets/img/login-banner.png"
                      className="img-fluid"
                      alt="Doccure Login"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>
                        Login <span>Doccure</span>
                      </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          className="form-control select select2-hidden-accessible"
                          name="role"
                          value={data.role}
                          onChange={handleChange}
                        >
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <label className="focus-label">Email</label>
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          className="form-control floating"
                          name="email"
                          required
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>
                      <label className="focus-label">Password</label>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          className="form-control floating"
                          name="password"
                          required
                          value={data.password}
                          onChange={handleChange}
                        />
                      </div>
                      {er && <Error message={er} />}
                      <div className="text-right">
                        <Link className="forgot-link" to="/forgot">
                          Forgot Password ?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn"
                        type="submit"
                      >
                        Login
                      </button>
                      <div className="login-or">
                        <span className="or-line" />
                        <span className="span-or">or</span>
                      </div>

                      <div className="text-center dont-have">
                        Don’t have an account?{" "}
                        <Link to="/register">Register</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* /Login Tab Content */}
            </div>
          </div>
        </div>
      </div>
    </>
    // here
  );
};

export default LoginForm;
