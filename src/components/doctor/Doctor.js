import React from "react";
import { Router, Link, Route, Switch } from "react-router-dom";
import ChangePassword from "../home/ChangePassword";
import DoctorDashboard from "./DoctorDashboard";
import DoctorProfile from "./DoctorProfile";
import PatientList from "../patient/PatientList";
import history from "../history";
import { useSelector } from "react-redux";

const Doctor = () => {
  const data = useSelector((state) => state.data.data);
  const verify = data.verified === "true";
  return (
    <div>
      <div
        className="content"
        style={{ transform: "none", minHeight: "5.6px" }}
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
                      <Link to="#" className="booking-doc-img">
                        <img
                          src={data?.avatar || "/assets/img/avatar.png"}
                          alt="#"
                        />
                      </Link>
                      <div className="profile-det-info">
                        <h3>
                          {data.firstName || " "} {data.lastName || " "}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        {verify && (
                          <li>
                            <Link to="/doctor/dashboard">
                              <i className="fas fa-columns" />
                              <span aria-disabled>Add Patient Data</span>
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link to="/doctor/profile">
                            <i className="fas fa-user-cog" />
                            <span>Profile Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/doctor/password">
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
                  path="/doctor/dashboard"
                  component={DoctorDashboard}
                />
                <Route exact path="/doctor/profile" component={DoctorProfile} />
                <Route exact path="/doctor/plist" component={PatientList} />
                <Route
                  exact
                  path="/doctor/password"
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

export default Doctor;
