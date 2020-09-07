import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoginReducer from "./login-reducer";
import PatientReducer from './patient-reducer';


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: LoginReducer,
  patientRecord : PatientReducer
});

export default persistReducer(persistConfig, rootReducer);
