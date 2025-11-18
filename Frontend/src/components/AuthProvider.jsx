import { useReducer } from "react";
import UserReducer from "../reducers/UserReducer";
import loginContext from "../context/login-Context";
import axios from "../config/axios";
import { LOGIN, LOGOUT, SERVER_ERROR, CLEAR_ERROR } from "./action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAbout } from "../slices/aboutSlice";
import { fetchProject } from "../slices/projectSlice";
//----------------------------------------------------------------------------------------------------
const initialState = {
  isLoggedIn: false,
  user: null,
  serverError: "",
};
//---------------------------------------------------------------------------------------------
export default function AuthProvider(props) {
  const [state, Dispatch] = useReducer(UserReducer, initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //--------------------------------------------------------------------------------------------------
  const handleLogin = async (formData, resetForm) => {
    try {
      const response = await axios.post("/api/login", formData);
      localStorage.setItem("token", response.data.token);
      const userResponse = await axios.get("/api/about", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      Dispatch({ type: LOGIN, payload: userResponse });
      resetForm();
      dispatch(fetchAbout());
      dispatch(fetchProject());
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      Dispatch({ type: SERVER_ERROR, payload: err.response.data.error });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    Dispatch({ type: LOGOUT });
    navigate("/login");
  };
  const handleClearError = () => {
    Dispatch({ type: CLEAR_ERROR });
  };
  return (
    <loginContext.Provider
      value={{ ...state, handleLogin, handleLogout, handleClearError }}
    >
      {props.children}
    </loginContext.Provider>
  );
}
