import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
  } from "../constants/userConstants";
  import axios from "axios";
  
// Function to dispatch login action with user data from localStorage if available
export const loadUser = () => async (dispatch) => {
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  if (userInfoFromStorage) {
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfoFromStorage });
  }
};

  export const login = (userName, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8070/api/users/login",
        { userName, password },
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };
  
  export const register = (userName, password, role) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8070/api/users/regadmin",
        { userName, password, role},
        config
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
     // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const registerlec = (userName, password, role, fullName, depName, regNo, image) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8070/api/users/reglec",
        { userName, password, role, fullName, depName, regNo, image},
        config
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      
  
      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const registerstu = (userName, password, role, fullName, depName, regNo,fingerprintID, batch, image) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8070/api/users/regstu",
        { userName, password, role, fullName, depName, regNo,fingerprintID, batch, image},
        config
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      
  
      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const updateProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post("/api/users/profile", user, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };