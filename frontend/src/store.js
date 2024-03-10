import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Correct import statement
import { composeWithDevTools } from "@redux-devtools/extension"; // Correct import statement
import {
  depAddReducer,
  depListReducer,
} from "./reducers/depReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  lecuserListReducer
} from "./reducers/userReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  lecUserRegister: userRegisterReducer,
  lecuserList: lecuserListReducer,
  stuUserRegister: userRegisterReducer,
  depAdd: depAddReducer,
  depList: depListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: composeWithDevTools(),
  preloadedState: initialState,
});

export default store;
