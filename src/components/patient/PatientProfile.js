import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/action/userAction";
import Error from "../Error";
import Modal from "../home/Modal";

const setProfileData = (profileData) => ({
  firstName: profileData?.firstName || "",
  lastName: profileData?.lastName || "",
  dateOfBirth: profileData?.dateOfBirth?.slice(0, 10) || "",
  email: profileData?.email,
  gender: profileData?.gender || "male",
  mobileNo: profileData?.mobileNo || "",
  address: profileData?.address || "",
  city: profileData?.city || "",
  state: profileData?.state || "",
  postalCode: profileData?.postalCode || "",
  country: profileData?.country || "",
  aadharCard: profileData?.aadharCard,
  avatar: profileData?.avatar,
  verified: profileData?.verified || false,
});

const PatientProfile = (props) => {
  const [er, setEr] = useState();
  const profileData = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  const [lable, setLable] = useState(false);

  const [data, setData] = useState(setProfileData(profileData));
  const verify = data.verified === "true";

  useEffect(() => {
    setData(setProfileData(profileData));
  }, [profileData]);

  const handleChange = (e) => {
    if (e.target.name === "mobileNo" && e.target.value.length > 10) {
      return;
    }
    if (e.target.name === "postalCode" && e.target.value.length > 6) {
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEr();

    const responceData = { ...data };
    delete responceData["email"];
    if (!data.avatar) {
      setEr("Please upload avatar...!");
      return false;
    }
    if (!data.aadharCard) {
      setEr("Please upload aadhar card...!");
      return false;
    }

    if (data.mobileNo.length < 10) {
      setEr("Please enter 10 digit mobile number...!");
      return false;
    }

    if (data.postalCode.length < 6) {
      setEr("Please enter valid postal code...!");
      return false;
    }

    try {
      dispatch(updateData(responceData, "patient", setEr));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileRead = async (event) => {
    try {
      const file = event.target.files[0];
      if (file.size / 1000 > 500) {
        return setLable(true);
      }
      const base64 = await convertBase64(file);
      setData({ ...data, [event.target.name]: base64 });
    } catch (error) {}
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="col-md-7 col-lg-8 col-xl-9">
      <div className="card">
        <div className="card-body">
          {/* Profile Settings Form */}
          <form onSubmit={handleSubmit}>
            <div className="row form-row">
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <div className="change-avatar">
                    <div className="profile-img">
                      <img
                        src={data.avatar || "/assets/img/avatar.png"}
                        alt="User"
                      />
                    </div>

                    <div className="upload-img">
                      <div className="change-photo-btn">
                        <span>
                          <i className="fa fa-upload" /> Upload Photo
                        </span>
                        <input
                          type="file"
                          className="upload"
                          accept="image/*"
                          name="avatar"
                          disabled={verify}
                          onChange={handleFileRead}
                        />
                      </div>
                      <small className="form-text text-muted">
                        Allowed JPG, GIF or PNG. Max size of 2MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <label>
                Aadhar Card <span className="text-danger">*</span>
              </label>
              <div className="col-md-12">
                <div className="form-group">
                  <div className="change-avatar">
                    <div className="profile-img">
                      <img
                        src={data.aadharCard || "/assets/img/aadharCard.png"}
                        alt="User"
                      />
                    </div>
                    {lable && (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Attention!</strong> You should check file size,
                        it must be less than 500KB
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                    )}
                    {!verify && <Modal />}
                    <div className="upload-img">
                      <div className="change-photo-btn">
                        <span>
                          <i className="fa fa-upload" /> Upload Photo
                        </span>
                        <input
                          type="file"
                          name="aadharCard"
                          accept="image/*"
                          className="upload"
                          disabled={verify}
                          onChange={handleFileRead}
                        />
                      </div>
                      <small className="form-text text-muted">
                        Allowed JPG, GIF or PNG. Max size of 2MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    value={data.firstName}
                    name="firstName"
                    required
                    disabled={verify}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    value={data.lastName}
                    disabled={verify}
                    required
                    name="lastName"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <span className="text-danger">*</span>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control datetimepicker"
                      name="dateOfBirth"
                      required
                      disabled={verify}
                      value={data.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Email ID</label>
                  <span className="text-danger">*</span>
                  <input
                    type="email"
                    className="form-control"
                    value={data.email}
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control select select2-hidden-accessible"
                    aria-hidden="true"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.gender}
                    name="gender"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Mobile</label>
                  <span className="text-danger">*</span>
                  <input
                    type="number"
                    className="form-control"
                    value={data.mobileNo}
                    name="mobileNo"
                    required
                    disabled={verify}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Address</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    value={data.address}
                    name="address"
                    disabled={verify}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>City</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    value={data.city}
                    name="city"
                    disabled={verify}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>State</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    value={data.state}
                    required
                    disabled={verify}
                    onChange={handleChange}
                    name="state"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Zip Code</label>
                  <span className="text-danger">*</span>
                  <input
                    type="number"
                    className="form-control"
                    name="postalCode"
                    required
                    disabled={verify}
                    value={data.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Country</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    value={data.country}
                    name="country"
                    disabled={verify}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {er && <Error message={er} setEr={setEr} />}
            <div className="submit-section">
              <button
                type="submit"
                disabled={verify}
                className="btn btn-primary submit-btn"
              >
                Submit
              </button>
            </div>
          </form>
          {/* /Profile Settings Form */}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
