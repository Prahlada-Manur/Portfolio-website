import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import loginContext from "../context/login-Context";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      <p className="text-amber-300 text-lg font-semibold mb-6">
        Only the admin can login
      </p>

      <Card className="bg-slate-800 text-white w-full max-w-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-amber-300 text-2xl">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          {serverError && (
            <p className="text-red-400 text-center mb-4">{serverError}</p>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label>Email</label>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label>Password</label>
              <Input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-amber-300 text-black">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
