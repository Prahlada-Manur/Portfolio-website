import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import loginContext from "../context/login-Context";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { handleLogin, serverError, handleClearError } =
    useContext(loginContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleLogin(values, resetForm);
    },
  });

  useEffect(() => {
    handleClearError();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">

      {/* Admin Notice */}
      <p className="text-amber-300 text-lg font-semibold tracking-wide mb-6">
        Only the admin can login
      </p>

      {/* Login Card */}
      <Card className="bg-slate-800 text-white w-full max-w-md shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-amber-300 text-2xl">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Server Error */}
          {serverError && (
            <p className="text-red-400 text-center mb-4 font-medium">
              {serverError}
            </p>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Email
              </label>

              <Input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your email"
                className="bg-slate-700 border-slate-600 text-white"
              />

              {formik.errors.email && formik.touched.email && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">
                Password
              </label>

              <Input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter your password"
                className="bg-slate-700 border-slate-600 text-white"
              />

              {formik.errors.password && formik.touched.password && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-amber-300 text-black font-semibold hover:bg-amber-400"
            >
              Login
            </Button>

          </form>
        </CardContent>
      </Card>

    </div>
  );
}
