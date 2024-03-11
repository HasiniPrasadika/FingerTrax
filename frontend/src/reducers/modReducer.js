import {
    MODULE_CREATE_FAIL,
    MODULE_CREATE_REQUEST,
    MODULE_CREATE_SUCCESS,
    MODULE_LIST_FAIL,
    MODULE_LIST_REQUEST,
    MODULE_LIST_SUCCESS,
  } from "../constants/modConstants";

  const modinitialState = {
    modloading: false,
    moderror: null,
    modules: [],
  };
  
  export const modListReducer = (state = modinitialState, action) => {
    switch (action.type) {
      case MODULE_LIST_REQUEST:
        return {
          ...state,
          modloading: true,
        };
      case MODULE_LIST_SUCCESS:
        return {
          ...state,
          modloading: false,
          modules: action.payload,
        };
      case MODULE_LIST_FAIL:
        return {
          ...state,
          modloading: false,
          moderror: action.payload,
        };
      default:
        return state;
    }
  };

  export const moduleCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MODULE_CREATE_REQUEST:
        return { loading: true };
      case MODULE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case MODULE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };