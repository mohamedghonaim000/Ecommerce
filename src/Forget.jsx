import axios from "axios";
import { Formik, useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Forget() {
  let navegate = useNavigate();

  let [loading, setloading] = useState(false);
  let [msg, setmsg] = useState("");

  function handelForget(values) {
    setloading(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then(({ data }) => {
        if (data.statusMsg === "success") {
          setmsg("");
          console.log(data);
          
          setloading(false);
          navegate("/vertfyCode");
        }
      })
      .catch((errors) => {
        setmsg(errors?.response?.data?.message);
        setloading(false);
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelForget,
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

          <button type="submit" className="btn btn-success">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              "Send code"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
