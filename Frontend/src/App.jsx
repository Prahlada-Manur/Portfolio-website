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
import AboutForm from "./pages/AboutForm";
import { fetchProject, resetProject } from "./slices/projectSlice";
import ProjectForm from "./pages/ProjectForm";
import ProjectSpecific from "./pages/ProjectSpecific";
import PrivateRoute from "./pages/PrivateRoute";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

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

      {/* NAVBAR */}
      <header className="w-full bg-slate-800 shadow-lg">
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">

          {/* LOGO */}
          <h1 className="text-2xl font-bold tracking-wide text-amber-300">
            Portfolio Website
          </h1>

          {/* SHADCN NAVIGATION MENU */}
          <NavigationMenu className="text-white">
            <NavigationMenuList className="flex items-center gap-6">

              {!isLoggedIn && !localStorage.getItem("token") ? (
                <>
                  {/* ABOUT */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="text-white hover:text-amber-300 "
                      asChild
                    >
                      <Link to="/">About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* PROJECTS */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="text-white hover:text-amber-300"
                      asChild
                    >
                      <Link to="/projects">Projects</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* LOGIN */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="text-white hover:text-amber-300 transition"
                      asChild
                    >
                      <Link to="/login">Login</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  {/* DASHBOARD */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="text-white hover:text-amber-300 transition"
                      asChild
                    >
                      <Link to="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* LOGOUT */}
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-red-400"
                      onClick={() => {
                        handleLogout();
                        dispatch(resetAbout());
                        dispatch(resetProject());
                      }}
                    >
                      Logout
                    </Button>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<About />} />
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
