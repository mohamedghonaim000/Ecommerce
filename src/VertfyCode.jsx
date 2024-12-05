import axios from "axios";
import { useFormik } from "formik";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { date } from "yup";

export default function VertfyCode() {
  let navegate = useNavigate();

  let [loading, setloading] = useState(false);
  let [msg, setmsg] = useState("");

  function handelVertfyCode(values) {
    setloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
      .then(({ data }) => {
        console.log(data);

        if (data.status === "Success") {
          
          setmsg("");
          setloading(false);
          navegate("/newPassword");
        }
      })
      .catch((errors) => {
        setmsg(errors?.response?.data?.message);
        setloading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handelVertfyCode,
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
            <label htmlFor="reset code" className="form-label">
              reset code
            </label>
            <input
              type="text"
              className="form-control"
              id="resetCode"
              onBlur={formik.handleBlur}
              placeholder="- - - - - -"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
            />
          </div>
          {/* {alerts} */}
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className="alert alert-danger" role="alert">
              {formik.errors.resetCode}
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="btn btn-success">
            {loading ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
              "Vertfy"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
