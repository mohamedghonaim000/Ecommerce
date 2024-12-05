import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "./Context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  let navegate=useNavigate()
  let {setLogin}= useContext(auth)
  let [loading, setloading] = useState(false);
  let [msg, setmsg] = useState("");

  function handelRegistration(values) {
    setloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message === "success") {
          setmsg("");
          setloading(false);
          localStorage.setItem("userToken", data.token);
          navegate('/')
          setLogin(jwtDecode(data.token))
        }
      })
      .catch((errors) => {
        setmsg(errors?.response?.data?.message);
        setloading(false);
      });
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "at least two charcter")
      .max(10, "max lenght is 10")
      .required("name is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword don`t match with password")
      .required("repassword is required"),
    phone: Yup.string()
      .matches(/^01[01259]\d{8}$/)
      .required("phone is reqired"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelRegistration,
  });

  return (
    <>
      <div className="container">
        <h1 className="py-5">sign up now....</h1>
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
        <form className="max-w-md mx-auto w-50 " onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onBlur={formik.handleBlur}
              placeholder="First name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          {/* {alerts} */}
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              className="form-control"
              id="rePassword"
              onBlur={formik.handleBlur}
              placeholder="Confirm password"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
            />
          </div>
          {/* {alerts} */}
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              onBlur={formik.handleBlur}
              placeholder="0100......"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
          {/* {alerts} */}
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <button type="submit" className="btn btn-success">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
