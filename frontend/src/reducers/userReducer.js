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
    LECUSERS_LIST_REQUEST,
    LECUSERS_LIST_SUCCESS,
    LECUSERS_LIST_FAIL,
    STUUSERS_LIST_REQUEST,
    STUUSERS_LIST_SUCCESS,
    STUUSERS_LIST_FAIL
  } from "../constants/userConstants";
  
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  const initialState = {
    lecloading: false,
    lecerror: null,
    lecusers: [],
  };
  
  export const lecuserListReducer = (state = initialState, action) => {
    switch (action.type) {
      case LECUSERS_LIST_REQUEST:
        return {
          ...state,
          lecloading: true,
        };
      case LECUSERS_LIST_SUCCESS:
        return {
          ...state,
          lecloading: false,
          lecusers: action.payload,
        };
      case LECUSERS_LIST_FAIL:
        return {
          ...state,
          lecloading: false,
          lecerror: action.payload,
        };
      default:
        return state;
    }
  };

  const stuinitialState = {
    stuloading: false,
    stuerror: null,
    stuusers: [],
  };
  
  export const stuuserListReducer = (state = stuinitialState, action) => {
    switch (action.type) {
      case STUUSERS_LIST_REQUEST:
        return {
          ...state,
          stuloading: true,
        };
      case STUUSERS_LIST_SUCCESS:
        return {
          ...state,
          stuloading: false,
          stuusers: action.payload,
        };
      case STUUSERS_LIST_FAIL:
        return {
          ...state,
          stuloading: false,
          stuerror: action.payload,
        };
      default:
        return state;
    }
  };