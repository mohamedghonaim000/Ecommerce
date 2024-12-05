import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "./Context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  let navegate = useNavigate();
  let { setLogin } = useContext(auth);

  let [loading, setloading] = useState(false);
  let [msg, setmsg] = useState("");

  function handelLogin(values) {
    setloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        if (data.message === "success") {
          setmsg("");
          setloading(false);
          localStorage.setItem("userToken", data.token);
          navegate("/");
          setLogin(jwtDecode(data.token));
        }
      })
      .catch((errors) => {
        setmsg(errors?.response?.data?.message);
        setloading(false);
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <div className="container">
        {msg ? (
          <div
            className="alert alert-danger w-50 text-center mx-auto"
            role="alert"
          >
            {msg}
          </div>
        ) : (
          ""
        )}
        <form
          className="max-w-md mx-auto w-50 py-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onBlur={formik.handleBlur}
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {/* {alerts} */}
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onBlur={formik.handleBlur}
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {/* {alerts} */}
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="btn btn-success">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="text-center">
          Don`t have account{" "}
          <Link to="/register" className="text-2xl text-success px-2 underline">
            {" "}
            Sign Up
          </Link>
        </p>
        <p className="text-center">Did you<Link to="/forget" className="text-2xl text-success px-2 underline">Forgot Passsword?</Link>
        </p>
      </div>
    </>
  );
}
