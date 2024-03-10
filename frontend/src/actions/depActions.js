import {
  DEPARTMENTS_CREATE_FAIL,
  DEPARTMENTS_CREATE_REQUEST,
  DEPARTMENTS_CREATE_SUCCESS,
  DEPARTMENTS_LIST_FAIL,
  DEPARTMENTS_LIST_REQUEST,
  DEPARTMENTS_LIST_SUCCESS,
} from "../constants/depConstants";
import axios from "axios";

export const listDepartments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENTS_LIST_REQUEST,
    });

    

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("http://localhost:8070/api/departments/getalldep", config);

    dispatch({
      type: DEPARTMENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DEPARTMENTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const addDepAction =
  (depCode, depName, noOfStu, noOfLec) => async (dispatch) => {
    try {
      dispatch({
        type: DEPARTMENTS_CREATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8070/api/departments/adddep",
        { depCode, depName, noOfStu, noOfLec },
        config
      );

      dispatch({
        type: DEPARTMENTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DEPARTMENTS_CREATE_FAIL,
        payload: message,
      });
    }
  };


