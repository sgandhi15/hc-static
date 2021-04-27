import React from "react";
import { Router, Link, Route, Switch } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ChangePassword from "../home/ChangePassword";
import DoctrorList from "../doctor/DoctorList";
import PatientList from "../patient/PatientList";
import history from "../history";

const Admin = () => {
  return (
    <div>
      <div
        className="content"
        style={{ transform: "none", minHeight: "5.6px", position: "sticky" }}
      >
        <div className="container-fluid" style={{ transform: "none" }}>
          <div className="row" style={{ transform: "none" }}>
            <div
              className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar"
              style={{
                position: "relative",
                overflow: "visible",
                boxSizing: "border-box",
                minHeight: 1,
              }}
            >
              {/* Profile Sidebar */}
              {/* /Profile Sidebar */}
              <div
                className="theiaStickySidebar"
                style={{
                  paddingTop: 0,
                  paddingBottom: 1,
                  position: "static",
                  transform: "none",
                  top: 0,
                  left: 20,
                }}
              >
                <div className="profile-sidebar">
                  <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                      <div className="profile-det-info">
                        <h3>Admin</h3>
                        <div className="patient-details">
                          <h5 className="mb-0">Admin of Doccure</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li>
                          <Link to="/admin/dashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/plist">
                            <i className="fas fa-user-injured" />
                            <span>Patients</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/dlist">
                            <i className="fas fa-user-cog" />
                            <span>Doctors</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/password">
                            <i className="fas fa-lock" />
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/logout">
                            <i className="fas fa-sign-out-alt" />
                            <span>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div
                  className="resize-sensor"
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: -1,
                    visibility: "hidden",
                  }}
                >
                  <div
                    className="resize-sensor-expand"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      overflow: "hidden",
                      zIndex: -1,
                      visibility: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transition: "all 0s ease 0s",
                        width: 409,
                        height: 1153,
                      }}
                    />
                  </div>
                  <div
                    className="resize-sensor-shrink"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      overflow: "hidden",
                      zIndex: -1,
                      visibility: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transition: "0s",
                        width: "200%",
                        height: "200%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* here to put */}
            <Router history={history}>
              <Switch>
                <Route
                  exact
                  path="/admin/dashboard"
                  component={AdminDashboard}
                />
                <Route exact path="/admin/profile" component={AdminDashboard} />
                <Route exact path="/admin/dlist" component={DoctrorList} />
                <Route exact path="/admin/plist" component={PatientList} />
                <Route
                  exact
                  path="/admin/password"
                  component={ChangePassword}
                />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
