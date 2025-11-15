import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Dashboard from "./pages/Dashboard";
import GetOneProject from "./pages/GetOneProject";
import loginContext from "./context/login-Context";
import { useContext, useEffect } from "react";
import { fetchAbout, resetAbout } from "./slices/aboutSlice";
import { useDispatch } from "react-redux";
import AboutForm from "./pages/AboutFOrm";
import { fetchProject, resetProject } from "./slices/projectSlice";
import ProjectForm from "./pages/ProjectForm";
import ProjectSpecific from "./pages/ProjectSpecific";
import PrivateRoute from "./pages/PrivateRoute";
//--------------------------------------------------------------------------------------------------------------------
export default function App() {
  const { isLoggedIn, handleLogout } = useContext(loginContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAbout());
    dispatch(fetchProject());
  }, []);
  return (
    <div>
      <h1>Porfolio Website</h1>
      <nav>
        <ul>
          {!isLoggedIn && !localStorage.getItem("token") ? (
            <>
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    dispatch(resetAbout());
                    dispatch(resetProject());
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:id" element={<GetOneProject />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/aboutForm"
          element={
            <PrivateRoute>
              <AboutForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/add"
          element={
            <PrivateRoute>
              <ProjectForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/specific/:id"
          element={
            <PrivateRoute>
              <ProjectSpecific />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/specific/:id/edit"
          element={
            <PrivateRoute>
              <ProjectForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
