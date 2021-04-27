import React from "react";
import { useSelector } from "react-redux";

const PatientDashboard = (props) => {
  const data = useSelector((state) => state.data.data);

  function debugBase64(base64URL) {
    var win = window.open();
    console.log(base64URL);
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
            <h4 className="card-title">Medical Records</h4>
          </div>

          <div className="card-body">
            <div className="accordion" id="accordionExample">
              {data.medicalReports?.map((mr, i) => (
                <div className="card mb-0" key={mr._id}>
                  <div
                    className="card-body"
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
                        <table
                          class="table"
                          style={{
                            margin: "-10px",
                            tableLayout: "fixed",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ float: "left" }}>
                                {mr.date?.slice(0, 10) + " "}
                              </td>
                              <td>
                                Deases :-
                                {" " + mr.deases}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </button>
                    </h2>
                  </div>

                  <div
                    id={`collapse${i}`}
                    className="collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body p-4">
                      <table
                        style={{
                          width: "100%",
                          tableLayout: "fixed",
                        }}
                        class="table table-bordered"
                      >
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
                            <td
                              style={{
                                whiteSpace: "normal",
                              }}
                            >
                              {mr.details}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Medicines</th>
                            <td>{mr.medicines}</td>
                          </tr>
                          {mr.document && (
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
                          )}
                          <tr>
                            <th scope="row">Doctor Name</th>
                            <td>
                              {mr.doctor.firstName + " " + mr.doctor.lastName}
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
        </div>
        {/* /Recent Orders */}
      </div>
    </>
  );
};

export default PatientDashboard;
