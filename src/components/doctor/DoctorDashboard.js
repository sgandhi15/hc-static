import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, updateMedical } from "../../redux/action/userAction";
import Error from "../Error";

const DoctorDashboard = () => {
  const [data, setData] = useState({
    email: "",
    date: "",
    deases: "",
    details: "",
    medicines: "",
    file: "",
  });
  const [er, setEr] = useState();

  const dispatch = useDispatch();
  const patient = useSelector((state) => state.data.patient.patient) || {};
  const [lable, setLable] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    try {
      dispatch(getPatient(data.email, "patient", setEr));
    } catch (error) {}
  };
  function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<iframe width="100%" height="100%" src="' + base64URL + '" >'
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setEr();
    try {
      dispatch(updateMedical(data, setEr));
      setData({
        email: "",
        date: "",
        deases: "",
        details: "",
        medicines: "",
        document: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileRead = async (event) => {
    try {
      setLable(false);
      let file = event.target.files[0];
      if (file.size / 1000 > 500) {
        file = "";
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
      <div className="card-body">
        <div className="card">
          <div className="card-body">
            <div className="col-md-12">
              <div className="form-group">
                <label className="control-label">Patient Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              <div className="submit-btn-center">
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  onClick={handleClick}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {patient.verified === "true" && (
          <div className="table-responsive">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th scope="row">Full Name</th>
                  <td>{patient?.firstName + " " + patient?.lastName}</td>
                </tr>
                <tr>
                  <th scope="row">Aadhar Number</th>
                  <td>{patient.aadharNo}</td>
                </tr>
                <tr>
                  <th scope="row">Birthday</th>
                  <td>{patient.dateOfBirth?.slice(0, 10)}</td>
                </tr>
                <tr>
                  <th scope="row">Mobile Number</th>
                  <td>{patient.mobileNo}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td>{patient.gender}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{patient.address}</td>
                </tr>
                <tr>
                  <th scope="row">City</th>
                  <td>{patient.city}</td>
                </tr>
                <tr>
                  <th scope="row">State</th>
                  <td>{patient.state}</td>
                </tr>
                <tr>
                  <th scope="row">Country</th>
                  <td>{patient.country}</td>
                </tr>
                <tr>
                  <th scope="row">Postal Code</th>
                  <td>{patient.postalCode}</td>
                </tr>
              </tbody>
            </table>

            <div className="card card-table flex-fill">
              <div className="card-header">
                <h4 className="card-title">Medical Records</h4>
              </div>
              <div className="card-body">
                <div className="accordion" id="accordionExample">
                  {patient.medicalReports?.map((mr, i) => (
                    <div className="card mb-0" key={mr._id}>
                      <div
                        className="card-header"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h2 className="mb-0">
                          <button
                            className="btn"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse${i}`}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {mr.date?.slice(0, 10) + " "}
                            <span
                              style={{ marginLeft: "20px", fontWeight: "700" }}
                            >
                              Deases :-
                            </span>
                            {" " + mr.deases}
                          </button>
                        </h2>
                      </div>

                      <div
                        id={`collapse${i}`}
                        className="collapse"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body p-4">
                          <table class="table table-borderless">
                            <tbody>
                              <tr>
                                <th scope="row">Date</th>
                                <td>{mr.date?.slice(0, 10)}</td>
                              </tr>
                              <tr>
                                <th scope="row">Deases</th>
                                <td>{mr.deases}</td>
                              </tr>
                              <tr>
                                <th scope="row">Details</th>
                                <td>{mr.details}</td>
                              </tr>
                              <tr>
                                <th scope="row">Medicines</th>
                                <td>{mr.medicines}</td>
                              </tr>
                              <tr>
                                <th scope="row">Document</th>
                                <td style={{ cursor: "pointer" }}>
                                  <span
                                    onClick={() => debugBase64(mr.document)}
                                    rel="noreferrer"
                                  >
                                    Document
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Doctor Name</th>
                                <td>
                                  {mr.doctor.firstName +
                                    " " +
                                    mr.doctor.lastName}
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Doctor Email</th>
                                <td>{mr.doctor.email}</td>
                              </tr>
                              <tr>
                                <th scope="row">Hospital Name</th>
                                <td>{mr.doctor.hospitalName}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* /Recent Orders */}
            </div>
            <div className="card">
              <div className="card-body">
                <h3>
                  <label className="control-label">Add Medical Record</label>
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row form-row">
                    <div className="col-12 col-md-12">
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          required
                          className="form-control"
                          value={data.date?.slice(0, 10)}
                          name="date"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="form-group">
                        <label>Deases</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={data.deases}
                          name="deases"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="form-group">
                        <label>Details</label>
                        <textarea
                          rows={3}
                          type="text"
                          className="form-control"
                          value={data.details}
                          name="details"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="form-group">
                        <label>Medicines</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          value={data.medicines}
                          name="medicines"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="form-group">
                        <div className="change-avatar">
                          <div className="profile-img">
                            <img
                              src={data.document || "/assets/img/avatar.png"}
                              alt="doc"
                            />
                          </div>
                          <div className="upload-img">
                            <div className="change-photo-btn">
                              <span>
                                <i className="fa fa-upload" /> Upload Document
                              </span>
                              <input
                                type="file"
                                className="upload"
                                name="document"
                                accept="application/pdf,image/*"
                                onChange={handleFileRead}
                              />
                            </div>
                            <small className="form-text text-muted">
                              Allowed JPG, GIF or PNG. Max size of 500KB
                            </small>
                            {lable && (
                              <div
                                className="alert alert-warning alert-dismissible fade show"
                                role="alert"
                              >
                                <strong>Attention!</strong> You should check
                                file size, it must be less than 500KB
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-primary submit-btn"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {er && <Error message={er} setEr={setEr} />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
