import axios from "axios";
import history from "../../components/history";

export const login = (data, cb) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3001/login", data);
    saveToken(res.data.token);

    dispatch({
      type: "SET_DATA",
      data: res.data[data.role],
      role: data.role,
      token: res.data.token,
    });
    cb(res.data.message);
    history.push(`/${data.role}/dashboard`);
  } catch (err) {
    cb(err.response?.data.message);
  }
};

export const signup = (data, cb) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:3001/signup", data);
    saveToken(res.data.token);

    dispatch({
      type: "SET_DATA",
      data: res.data[data.role],
      role: data.role,
      token: res.data.token,
    });

    cb(res.data.message);
    history.push(`/${data.role}/profile`);
  } catch (err) {
    cb(err.response?.data.message);
  }
};

export const getData = (token, role) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_AUTH",
      role: role,
    });
    const res = await axios.get(`http://localhost:3001/${role}/me`);

    dispatch({
      type: "SET_DATA",
      data: res.data[role],
      role: role,
      token: token,
    });
  } catch (err) {}
};

export const getPatient = (id, role, cb) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/doctor/verify/${role}`,
      {
        id,
      }
    );

    dispatch({
      type: "UPDATE_MEDICAL",
      patient: res.data,
    });
    cb(res.data.message);
  } catch (err) {
    dispatch({
      type: "REMOVE_PATIENT",
    });
    cb(err.response.data.message);
  }
};

export const forget = (data, cb) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:3001/forget`, {
      data,
    });
    dispatch({
      type: "FORGET",
      message: res.message,
    });
    cb(res.data.message);
    history.push("/logout");
  } catch (err) {
    cb(err.response.data.message);
  }
};

export const updateData = (data, role, cb) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:3001/${role}/me`, data);
    dispatch({
      type: "UPDATE_DATA",
      data: res.data[role],
    });
    cb(res.data.message);
  } catch (err) {
    cb(err.response.data.message);
  }
};

export const updateMedical = (data, cb) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:3001/doctor/patient`, data);
    dispatch({
      type: "DELETE_PATIENT",
      patient: res.patient,
    });
    cb(res.data.message);
  } catch (err) {
    cb(err.response.data.message);
  }
};

export const updateVerification = (id, role) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:3001/admin/verify/${role}`, {
      id,
    });
    dispatch({
      type: "UPDATE_LIST",
      id: res.id,
      role,
    });
    dispatch(setList());
  } catch (err) {}
};

export const deleteData = (id, role) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:3001/admin/delete/${role}`, {
      id,
    });
    dispatch({
      type: "DELETE_USER",
      id: id,
      message: res.message,
      role,
    });
    dispatch(setList());
  } catch (err) {}
};

export const setList = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/admin/list");
    dispatch({
      type: "SET_LISTS",
      data: res.data,
    });
  } catch (err) {}
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  history.push("/login");
};

export const changePassword = (role, password, newPassword, cb) => async (
  dispatch
) => {
  try {
    const res = await axios.post(`http://localhost:3001/changePassword`, {
      role,
      password,
      newPassword,
    });
    dispatch({
      type: "UPDATE_DATA",
      data: res.data,
    });
    cb(res.data.message);
    history.push("/logout");
  } catch (err) {
    cb(err.response.data.message);
  }
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
