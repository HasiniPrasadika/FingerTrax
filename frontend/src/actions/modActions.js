import {
    MODULE_CREATE_FAIL,
    MODULE_CREATE_REQUEST,
    MODULE_CREATE_SUCCESS,
    MODULE_LIST_FAIL,
    MODULE_LIST_REQUEST,
    MODULE_LIST_SUCCESS,
  } from "../constants/modConstants";
  import axios from "axios";

  export const listModules = () => async (dispatch) => {
    try {
      dispatch({
        type: MODULE_LIST_REQUEST,
      });
  
      
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.get("http://localhost:8070/api/modules/getallmod", config);
  
      dispatch({
        type: MODULE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MODULE_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const createModuleAction = (modCode, modName, enrolKey, semester, lectureHours) => async (
    dispatch
  ) => {
    try {
      dispatch({
        type: MODULE_CREATE_REQUEST,
      });
  
     
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8070/api/modules/addmod",
        { modCode, modName, enrolKey, semester, lectureHours },
        config
      );
  
      dispatch({
        type: MODULE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MODULE_CREATE_FAIL,
        payload: message,
      });
    }
  };