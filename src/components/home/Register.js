import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../redux/action/userAction";
import Error from "../Error";
import { AADHAR_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "./Regx";

const Register = (props) => {
  const [data, setData] = useState({
    email: "",
    aadharNo: "",
    password: "",
    role: "patient",
  });
  const [er, setEr] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEr();

    if (!data.email.match(EMAIL_REGEX)) {
      setEr("Please enter valid email...!");
      return false;
    } else setEr();
    if (!data.aadharNo.match(AADHAR_REGEX)) {
      setEr("Please enter 12 digit aadharcard number...!");
      return false;
    } else setEr();
    if (!data.password.match(PASSWORD_REGEX)) {
      setEr("Please enter valid password...!");
      return false;
    } else setEr();
    try {
      dispatch(signup(data, setEr));
    } catch (error) {}
  };

  const handleChange = (e) => {
    if (e.target.name === "aadharNo" && e.target.value.length > 12) {
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="content" style={{ minHeight: "5.6px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* Register Content */}
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="assets/img/login-banner.png"
                      className="img-fluid"
                      alt="Doccure Register"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    {/* Register Form */}
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
                        </select>
                      </div>
                      <label>Email</label>
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          className="form-control floating"
                          name="email"
                          required
                          onChange={handleChange}
                          value={data.email}
                        />
                      </div>
                      <label className="focus-label">Aadhar Number</label>
                      <div className="form-group form-focus">
                        <input
                          type="number"
                          className="form-control floating"
                          name="aadharNo"
                          required
                          onChange={handleChange}
                          value={data.aadharNo}
                        />
                      </div>
                      <label className="focus-label">Create Password</label>
                      <div className="form-group form-focus">
                        <input
                          type="password"
                          className="form-control floating"
                          name="password"
                          required
                          onChange={handleChange}
                          value={data.password}
                        />
                      </div>
                      {er && <Error message={er} setEr={setEr} />}
                      <div className="text-right">
                        <Link className="forgot-link" to="/login">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn"
                        type="submit"
                      >
                        Signup
                      </button>
                    </form>
                    {/* /Register Form */}
                  </div>
                </div>
              </div>
              {/* /Register Content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
