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
  hospitalName: profileData?.hospitalName || "",
  hospitalAddress: profileData?.hospitalAddress || "",
  licenceNo: profileData?.licenceNo || "",
  address: profileData?.address || "",
  city: profileData?.city || "",
  state: profileData?.state || "",
  postalCode: profileData?.postalCode || "",
  country: profileData?.country || "",
  avatar: profileData?.avatar,
  aadharCard: profileData?.aadharCard,
  licenceCard: profileData?.licenceCard,
});

const DoctorProfile = (props) => {
  const profileData = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  const [lable, setLable] = useState(false);

  const [er, setEr] = useState();
  const verified = profileData?.verified || false;
  const [data, setData] = useState(setProfileData(profileData));
  useEffect(() => {
    setData(setProfileData(profileData));
  }, [profileData]);
  const verify = verified === "true";

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
    if (!data.licenceCard) {
      setEr("Please upload licence card...!");
      return false;
    }

    if (data.postalCode.length < 6) {
      setEr("Please enter valid postal code...!");
      return false;
    }

    try {
      dispatch(updateData(responceData, "doctor", setEr));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileRead = async (event) => {
    try {
      console.log(event.target.name);
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
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Basic Information</h4>
            <div className="row form-row">
              <div className="col-md-12">
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
                          disabled={verify}
                          onChange={handleFileRead}
                          name="avatar"
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
                    <div className="upload-img">
                      <div className="change-photo-btn">
                        <span>
                          <i className="fa fa-upload" /> Upload Photo
                        </span>
                        <input
                          type="file"
                          className="upload"
                          accept="image/*"
                          required
                          disabled={verify}
                          onChange={handleFileRead}
                          name="aadharCard"
                        />
                      </div>
                      <small className="form-text text-muted">
                        Allowed JPG, GIF or PNG. Max size of 2MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              {lable && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Attention!</strong> You should check file size, it
                  must be less than 500KB
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
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.firstName}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.lastName}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="mobileNo"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.mobileNo}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    disabled
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control select select2-hidden-accessible"
                    onChange={handleChange}
                    value={data.gender}
                    required
                    disabled={verify}
                    name="gender"
                    aria-hidden="true"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    Licence Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="licenceNo"
                    required
                    disabled={verify}
                    value={data.licenceNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-0">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    required
                    disabled={verify}
                    value={data.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <label>
          Licence Certificate <span className="text-danger">*</span>
        </label>
        <div className="col-md-12">
          <div className="form-group">
            <div className="change-avatar">
              <div className="profile-img">
                <img
                  src={data.licenceCard || "/assets/img/aadharCard.png"}
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
                    required
                    disabled={verify}
                    onChange={handleFileRead}
                    name="licenceCard"
                  />
                </div>
                <small className="form-text text-muted">
                  Allowed JPG, GIF or PNG. Max size of 2MB
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* /Basic Information */}

        {!verify && <Modal />}
        {/* Clinic Info */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Clinic Info</h4>
            <div className="row form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Clinic Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hospitalName"
                    required
                    disabled={verify}
                    value={data.hospitalName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Clinic Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hospitalAddress"
                    required
                    disabled={verify}
                    value={data.hospitalAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* /Clinic Info */}
        {/* Contact Details */}
        <div className="card contact-card">
          <div className="card-body">
            <h4 className="card-title">Contact Details</h4>
            <div className="row form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.address}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.city}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">State / Province</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.state}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    required
                    disabled={verify}
                    name="country"
                    value={data.country}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Postal Code</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    disabled={verify}
                    onChange={handleChange}
                    value={data.postalCode}
                    name="postalCode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {er && <Error message={er} setEr={setEr} />}
        {/* /Contact Details */}
        <div className="submit-section submit-btn-bottom">
          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={verify}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
