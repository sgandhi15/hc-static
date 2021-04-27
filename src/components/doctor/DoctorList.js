import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteData, updateVerification } from "../../redux/action/userAction";

const DoctorList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.data.lists.doctors);

  const handleSubmit = (id) => {
    dispatch(updateVerification(id, "doctor"));
  };
  const handleReject = (id) => {
    dispatch(deleteData(id, "doctor"));
  };

  function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<iframe width="100%" height="100%" src="' + base64URL + '" >'
    );
  }
  return (
    <div className="col-md d-flex">
      {/* Recent Orders */}
      <div className="card card-table flex-fill">
        <div className="card-header">
          <h4 className="card-title">Doctor List</h4>
        </div>
        <div className="card-body">
          <div className="accordion" id="accordionExample">
            {doctors
              ?.filter((doctor) => doctor.verified !== "true")
              .map((doctor, i) => (
                <div className="card mb-0" key={doctor._id}>
                  <div
                    className="card-header"
                    style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                  >
                    <h2 className="mb-0">
                      {console.log(doctor)}
                      <button
                        className="btn btn-link"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#collapse${i}`}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <div className="avatar sm mr-3">
                          <img
                            class="avatar-img rounded-circle"
                            alt="user"
                            src={doctor.avatar || "/assets/img/avatar.png"}
                          />
                        </div>
                        <span style={{ fontSize: "18px" }}>
                          {doctor.firstName + " " + doctor.lastName}
                        </span>
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
                            <th scope="row">Full Name</th>
                            <td>{doctor.firstName + " " + doctor.lastName}</td>
                          </tr>
                          <tr>
                            <th scope="row">Licence Number</th>
                            <td>{doctor.licenceNo}</td>
                          </tr>
                          <tr>
                            <th scope="row">Aadhar Number</th>
                            <td>{doctor.aadharNo}</td>
                          </tr>
                          <tr>
                            <th scope="row">Email</th>
                            <td>{doctor.email}</td>
                          </tr>
                          <tr>
                            <th scope="row">Birthday</th>
                            <td>{doctor.dateOfBirth?.slice(0, 10)}</td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile Number</th>
                            <td>{doctor.mobileNo}</td>
                          </tr>
                          <tr>
                            <th scope="row">Gender</th>
                            <td>{doctor.gender}</td>
                          </tr>
                          <tr>
                            <th scope="row">Address</th>
                            <td>{doctor.address}</td>
                          </tr>
                          <tr>
                            <th scope="row">City</th>
                            <td>{doctor.city}</td>
                          </tr>
                          <tr>
                            <th scope="row">State</th>
                            <td>{doctor.state}</td>
                          </tr>
                          <tr>
                            <th scope="row">Country</th>
                            <td>{doctor.country}</td>
                          </tr>
                          <tr>
                            <th scope="row">Postal Code</th>
                            <td>{doctor.postalCode}</td>
                          </tr>
                          <tr>
                            <th scope="row">Aadhar card</th>
                            <td style={{ cursor: "pointer" }}>
                              <span
                                onClick={() => debugBase64(doctor.aadharCard)}
                                rel="noreferrer"
                              >
                                Document
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Licence card</th>
                            <td style={{ cursor: "pointer" }}>
                              <span
                                onClick={() => debugBase64(doctor.licenceCard)}
                                rel="noreferrer"
                              >
                                Document
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Hospital Name</th>
                            <td>{doctor.hospitalName}</td>
                          </tr>
                          <tr>
                            <th scope="row">Hospital Name</th>
                            <td>{doctor.hospitalAddress}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                          onClick={() => handleSubmit(doctor._id)}
                        >
                          Verify
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn float-right"
                          onClick={() => handleReject(doctor._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* /Recent Orders */}
    </div>
  );
};

export default DoctorList;
