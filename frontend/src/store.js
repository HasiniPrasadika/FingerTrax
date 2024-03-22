import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Correct import statement
import { composeWithDevTools } from "@redux-devtools/extension"; // Correct import statement
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  moduleCreateReducer,
  modListReducer
} from "./reducers/modReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  lecUserRegister: userRegisterReducer,
  stuUserRegister: userRegisterReducer,
  modAdd: moduleCreateReducer,
  modList: modListReducer,
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
