import {
    DEPARTMENTS_CREATE_FAIL,
    DEPARTMENTS_CREATE_REQUEST,
    DEPARTMENTS_CREATE_SUCCESS,
    DEPARTMENTS_LIST_FAIL,
    DEPARTMENTS_LIST_REQUEST,
    DEPARTMENTS_LIST_SUCCESS,
    
  } from "../constants/depConstants";

  const depinitialState = {
    deploading: false,
    deperror: null,
    departments: [],
  };
  
  export const depListReducer = (state = depinitialState, action) => {
    switch (action.type) {
      case DEPARTMENTS_LIST_REQUEST:
        return {
          ...state,
          deploading: true,
        };
      case DEPARTMENTS_LIST_SUCCESS:
        return {
          ...state,
          deploading: false,
          departments: action.payload,
        };
      case DEPARTMENTS_LIST_FAIL:
        return {
          ...state,
          deploading: false,
          deperror: action.payload,
        };
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
  