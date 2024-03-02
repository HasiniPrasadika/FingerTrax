import {
    DEPARTMENTS_CREATE_FAIL,
    DEPARTMENTS_CREATE_REQUEST,
    DEPARTMENTS_CREATE_SUCCESS,
    DEPARTMENTS_LIST_FAIL,
    DEPARTMENTS_LIST_REQUEST,
    DEPARTMENTS_LIST_SUCCESS,
    
  } from "../constants/depConstants";
  
  export const depListReducer = (state = { departments: [] }, action) => {
    switch (action.type) {
      case DEPARTMENTS_LIST_REQUEST:
        return { loading: true };
      case DEPARTMENTS_LIST_SUCCESS:
        return { loading: false, departments: action.payload };
      case DEPARTMENTS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const depAddReducer = (state = {}, action) => {
    switch (action.type) {
      case DEPARTMENTS_CREATE_REQUEST:
        return { loading: true };
      case DEPARTMENTS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case DEPARTMENTS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  