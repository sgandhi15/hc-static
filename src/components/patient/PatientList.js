import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteData, updateVerification } from "../../redux/action/userAction";

const PatientList = (props) => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.data.lists.patients);

  const handleSubmit = (id) => {
    dispatch(updateVerification(id, "patient"));
  };

  const handleReject = (id) => {
    dispatch(deleteData(id, "patient"));
  };

  function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<iframe width="100%" height="100%" src="' + base64URL + '" >'
    );
  }

  return (
    <>
      <div className="col-md d-flex">
        {/* Recent Orders */}
        <div className="card card-table flex-fill">
          <div className="card-header">
            <h4 className="card-title">Patient List</h4>
          </div>
          <div className="card-body">
            <div className="accordion" id="accordionExample">
              {patients
                ?.filter((patient) => patient.verified !== "true")
                .map((patient, i) => (
                  <div className="card mb-0" key={patient._id}>
                    <div
                      className="card-header"
                      style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                    >
                      <h2 className="mb-0">
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
                              src={patient.avatar || "/assets/img/avatar.png"}
                            />
                          </div>
                          <span style={{ fontSize: "18px" }}>
                            {patient.firstName || " "}
                            {patient.lastName || " "}
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
                              <td>
                                {patient.firstName || " "}
                                {patient.lastName || " "}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Aadhar Number</th>
                              <td>{patient.aadharNo}</td>
                            </tr>
                            <tr>
                              <th scope="row">Email</th>
                              <td>{patient.email}</td>
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
                            <tr>
                              <th scope="row">Aadhar card</th>
                              <td style={{ cursor: "pointer" }}>
                                <span
                                  onClick={() =>
                                    debugBase64(patient.aadharCard)
                                  }
                                  rel="noreferrer"
                                >
                                  Document
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="card-footer">
                          <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            onClick={() => handleSubmit(patient._id)}
                          >
                            Verify
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary submit-btn float-right"
                            onClick={() => handleReject(patient._id)}
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
    </>
  );
};

export default PatientList;
