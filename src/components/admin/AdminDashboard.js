import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setList } from "../../redux/action/userAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.data.lists.patients);
  const doctors = useSelector((state) => state.data.lists.doctors);
  useEffect(() => {
    dispatch(setList());
    return;
  }, [dispatch]);

  return (
    <div className="col">
      <div className="row">
        <div className="col-md-6 d-flex">
          {/* Recent Orders */}
          <div className="card card-table flex-fill">
            <div className="card-header">
              <h4 className="card-title">Doctors List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Hospital Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors &&
                      doctors
                        .filter((doctor) => doctor.verified === "true")
                        .map((doctor) => {
                          return (
                            <tr key={doctor._id}>
                              <td>
                                <h2 className="table-avatar">
                                  <Link
                                    to="#"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={
                                        doctor.avatar ||
                                        "/assets/img/avatar.png"
                                      }
                                      alt="User "
                                    />
                                  </Link>
                                  <Link to="#">
                                    {doctor.firstName + " " + doctor.lastName}
                                  </Link>
                                </h2>
                              </td>
                              <td>{doctor.hospitalName}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /Recent Orders */}
        </div>
        <div className="col-md-6 d-flex">
          {/* Feed Activity */}
          <div className="card  card-table flex-fill">
            <div className="card-header">
              <h4 className="card-title">Patients List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients &&
                      patients
                        .filter((patient) => patient.verified === "true")
                        .map((patient) => {
                          return (
                            <tr key={patient._id}>
                              <td>
                                <h2 className="table-avatar">
                                  <Link
                                    to="#"
                                    className="avatar avatar-sm mr-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={
                                        patient.avatar ||
                                        "/assets/img/avatar.png"
                                      }
                                      alt="User "
                                    />
                                  </Link>
                                  <Link to="#">
                                    {patient.firstName + " " + patient.lastName}
                                  </Link>
                                </h2>
                              </td>
                              <td>{patient.email}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /Feed Activity */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
