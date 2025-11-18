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
import { Button } from "./components/ui/button";
//--------------------------------------------------------------------------------------------------------------------
export default function App() {
  const { isLoggedIn, handleLogout } = useContext(loginContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAbout());
    dispatch(fetchProject());
  }, []);
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="w-full bg-slate-800 shadow-lg">
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold tracking-wide text-amber-300">
            Porfolio Website
          </h1>

          <ul className="flex items-center gap-7">
            {!isLoggedIn && !localStorage.getItem("token") ? (
              <>
                <li className="hover:text-amber-300">
                  <Link to="/about">About</Link>
                </li>

                <li className="hover:text-amber-300">
                  <Link to="/projects">Projects</Link>
                </li>
                <li className="hover:text-amber-300">
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-amber-300">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Button
                    className="hover:text-red-400"
                    onClick={() => {
                      handleLogout();
                      dispatch(resetAbout());
                      dispatch(resetProject());
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto p-4">
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
      </main>
    </div>
  );
}
