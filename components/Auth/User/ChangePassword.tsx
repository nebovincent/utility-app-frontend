import React, { useState, useContext } from "react";
import Container from "components/utility/Container";
import Link from "next/link";
import classes from "components/Auth/User/ChangePassword.module.css";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import PageLoader from "components/utility/PageLoader";
import { server } from "config/index";

function ChangePassword() {
  const authCtx = useContext(AuthContext);
  const [successResponse, setSuccessResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  let errors = {
    email: false,
    random: "",
  };
  const [userEmail, setUserEmail] = useState("");
  const [errorStates, setErrorStates] = useState({
    email: false,
    random: "",
  });

  // api call
  const submitEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    authCtx.reqLoadingStateHandler();
    setSuccessResponse("");
    setErrorResponse("");

    errors = {
      email: false,
      random: "",
    };
    setErrorStates({ email: false, random: "" });
    //validations

    //validations

    if (errors.email === false && errors.random === "") {
      const data = {
        userEmail: userEmail,
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        "Access-Control-Allow-Credentials": "true",
      };
      const response = await fetch(
        `${nextConfig.env?.backend_url}/user/change-password`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: headers,
          credentials: "include",
          // statusCode: 200,
        }
      );
      const res = await response.json();
      if (res.status === "successful") {
        setSuccessResponse(res.data.message);
        setTimeout(() => {
          setSuccessResponse("");
        }, 10000);
      } else {
        setErrorResponse(res.data.message);
      }
    }
    authCtx.reqLoadingStateResetHandler();
  };
  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <Container className={classes.changePassword__main_container}>
          <div className={classes.changePassword__main}>
            {successResponse && (
              <p className={classes.success_res_text}>{successResponse}</p>
            )}
            {errorResponse && (
              <p className={classes.error_res_text}>{errorResponse}</p>
            )}
            <h1>Change Password</h1>
            <h5>
              Input your email address to receive details on how to change your
              password via email.
            </h5>

            <form
              className={classes.changePassword__form_main}
              onSubmit={submitEmail}
            >
              <label>Email</label>
              <input
                required
                type="email"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                onFocus={(e) => {
                  setErrorStates({ email: false, random: "" });
                }}
                value={userEmail}
                className={classes.changePassword__form_main_input}
              />

              <button type="submit" className={classes.submitBtn}>
                Submit
              </button>

              <p className={classes.resend_code} onClick={submitEmail}>
                Didn&#39;t receive any mail yet?{" "}
                <span>Click here to request again</span>
              </p>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}

export default ChangePassword;
