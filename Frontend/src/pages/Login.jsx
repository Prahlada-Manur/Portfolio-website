import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import loginContext from "../context/login-Context";
export default function Login() {
  const { handleLogin, serverError, handleClearError } =
    useContext(loginContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("email is required"),
      password: Yup.string()
        .min(8, "Invalid Password")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleLogin(values, resetForm);
    },
  });
  useEffect(() => {
    handleClearError();
  }, []);
  //---------------------------------------------------------------------------
  return (
    <div>
      <h1>Login here</h1>
      {serverError && <p>{serverError}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Enter the email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter the email"
          />
        </div>
        <div>
          <label>Enter the password</label>
          <input
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter the password"
          />
        </div>
        <div>
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  );
}
