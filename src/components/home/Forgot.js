import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forget } from "../../redux/action/userAction";
import Error from "../Error";
import { AADHAR_REGEX, PASSWORD_REGEX } from "./Regx";

const Forgot = () => {
  const [data, setData] = useState({
    aadharNo: "",
    dateOfBirth: "",
    role: "patient",
    password: "",
    confirmPassword: "",
  });
  const [er, setEr] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "aadharNo" && e.target.value.length > 12) {
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEr();

    if (!data.aadharNo.match(AADHAR_REGEX)) {
      setEr("Please enter 12 digit aadharcard number...!");
      return false;
    } else setEr();
    if (!data.password?.match(PASSWORD_REGEX)) {
      setEr("Please enter strong password...!");
      return false;
    } else setEr();
    if (data.password !== data.confirmPassword) {
      setEr("Confirm password do not matches...!");
      return false;
    } else setEr();

    try {
      dispatch(forget(data, setEr));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="content" style={{ minHeight: "5.6px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* Account Content */}
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="/assets/img/login-banner.png"
                      className="img-fluid"
                      alt="Login Banner"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Forgot Password?</h3>
                    </div>
                    {/* Forgot Password Form */}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          className="form-control select select2-hidden-accessible"
                          name="role"
                          value={data.role}
                          onChange={handleChange}
                          required
                        >
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                        </select>
                      </div>
                      <label>Aadhar Number</label>
                      <div className="form-group">
                        <input
                          type="number"
                          required
                          className="form-control floating"
                          value={data.aadharNo}
                          name="aadharNo"
                          onChange={handleChange}
                        />
                      </div>
                      <label className="focus-label">Date of Birth</label>
                      <div className="form-group form-focus">
                        <input
                          type="date"
                          className="form-control floating"
                          name="dateOfBirth"
                          required
                          value={data.dateOfBirth}
                          onChange={handleChange}
                        />
                      </div>
                      <label className="focus-label">New Password</label>
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
                      <label className="focus-label">Confirm Password</label>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          className="form-control floating"
                          name="confirmPassword"
                          required
                          value={data.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                      {er && <Error message={er} setEr={setEr} />}

                      <div className="text-right">
                        <Link className="forgot-link" to="/login">
                          Remember your password?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </form>
                    {/* /Forgot Password Form */}
                  </div>
                </div>
              </div>
              {/* /Account Content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
