import React from "react";
import { Router, Link, Route, Switch } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";
import PatientProfile from "./PatientProfile";
import ChangePassword from "../home/ChangePassword";
import history from "../history";
import { useSelector } from "react-redux";

const Patient = (props) => {
  const data = useSelector((state) => state.data.data);
  const verify = data.verified === "true";
  return (
    <div className="content" style={{ transform: "none", minHeight: "5.6px" }}>
      <div className="container-fluid" style={{ transform: "none" }}>
        <div className="row" style={{ transform: "none" }}>
          {/* Profile Sidebar */}
          <div
            className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar"
            style={{
              position: "relative",
              overflow: "visible",
              boxSizing: "border-box",
              minHeight: 1,
            }}
          >
            <div
              className="theiaStickySidebar"
              style={{
                paddingTop: 0,
                paddingBottom: 1,
                position: "static",
                transform: "none",
                top: 0,
                left: 30,
              }}
            >
              <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <Link to="#" className="booking-doc-img">
                      <img
                        src={data?.avatar || "/assets/img/avatar.png"}
                        alt="User"
                      />
                    </Link>
                    <div className="profile-det-info">
                      <h3>
                        {data.firstName || " "} {data.lastName || " "}
                      </h3>
                      <div className="patient-details">
                        <h5>
                          <i className="fas fa-birthday-cake" />
                          {data.dateOfBirth &&
                            new Date(data.dateOfBirth).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                        </h5>
                        <h5 className="mb-0">
                          <i className="fas fa-map-marker-alt" /> {data.city}
                          {data.country}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-widget">
                  <nav className="dashboard-menu">
                    <ul>
                      {verify && (
                        <li>
                          <Link to="/patient/dashboard">
                            <i className="fas fa-columns" />
                            <span>Medical Records</span>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/patient/profile">
                          <i className="fas fa-user-cog" />
                          <span>Profile Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/patient/password">
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
                      height: 839,
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
          {/* here */}
          <div className="col">
            <Router history={history}>
              <Switch>
                <Route
                  exact
                  path="/patient/dashboard"
                  component={PatientDashboard}
                />
                <Route
                  exact
                  path="/patient/profile"
                  component={PatientProfile}
                />
                <Route
                  exact
                  path="/patient/password"
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

export default Patient;
