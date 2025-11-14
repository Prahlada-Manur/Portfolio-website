import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "../slices/aboutSlice";
import projectReducer from "../slices/projectSlice";
const createStore = () => {
  return configureStore({
    reducer: {
      about: aboutReducer,
      project: projectReducer,
    },
  });
};
export default createStore;
