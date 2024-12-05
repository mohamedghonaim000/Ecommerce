import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function NewPassword() {
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState("");

  function handleNewPassword(values) {
    setLoading(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(({ data }) => {
        console.log(data);
        
        if (data.token) {
          setMsg("");
          setLoading(false);
          navigate("/login");
        }
      })
      .catch((errors) => {
        setMsg(errors?.response?.data?.message);
        setLoading(false);
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      )
      .required("New password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleNewPassword,
  });

  return (
    <div className="container">
      {msg ? (
        <div className="alert alert-danger w-50 text-center mx-auto" role="alert">
          {msg}
        </div>
      ) : null}
      <form className="max-w-md mx-auto w-50 py-5" onSubmit={formik.handleSubmit}>
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
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            onBlur={formik.handleBlur}
            placeholder="Enter your new password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-success">
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
            "Set"
          )}
        </button>
      </form>
    </div>
  );
}
