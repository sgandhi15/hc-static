import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/action/userAction";
import Error from "../Error";
import { PASSWORD_REGEX } from "./Regx";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.data.role);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatePassword: "",
  });
  const [er, setEr] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEr();

    if (!data.newPassword.match(PASSWORD_REGEX)) {
      setEr("Please enter strong password...!");
      return false;
    } else setEr();
    if (data.newPassword !== data.repeatePassword) {
      setEr("Confirm password do not matches...!");
      return false;
    } else setEr();
    try {
      dispatch(changePassword(role, data.oldPassword, data.newPassword, setEr));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="col-md-7 col-lg-8 col-xl-9">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    required
                    value={data.oldPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    required
                    value={data.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="repeatePassword"
                    required
                    value={data.repeatePassword}
                    onChange={handleChange}
                  />
                </div>
                {er && <Error message={er} setEr={setEr} />}
                <div className="submit-section">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
