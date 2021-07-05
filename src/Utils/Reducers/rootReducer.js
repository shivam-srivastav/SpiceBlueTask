import { combineReducers } from "redux";
import task from "./TaskReducer";
import user from "./UserReducer";

const rootReducer = () =>
  combineReducers({
    task,
    user,
  });

export default rootReducer;
