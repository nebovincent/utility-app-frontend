import Container from "components/utility/Container";
import React, { useState, useContext, useEffect } from "react";
import classes from "components/Auth/User/Login.module.css";
import { useRouter } from "next/router";
import useCheckAuth from "hooks/useCheckAuth";
import AuthContext from "context/auth-context";
import { userLoginDetails } from "types/types";
import nextConfig from "next.config";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Link from "next/link";
import PageLoader from "components/utility/PageLoader";

const Login = () => {
  const authCtx = useContext(AuthContext);

  //custom hook for securing this route
  // const [isLoading] = useCheckAuth();
  //custom hook for securing this route

  const [loginError, setLoginError] = useState("");

  const [formData, setFormData] = useState({
    emailOrUserName: "",
    password: "",
  });

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  // query string
  const router = useRouter();
  // query string

  const onLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = {
      emailOrUserName: formData.emailOrUserName,
      password: formData.password,
    };

    authCtx.onLoginHandler(data);
  };

  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <Container className={classes.login__main_container}>
          <div className={classes.login__main}>
            <h1>Login</h1>
            <h3>Input your login details</h3>
            {authCtx.successMessage && (
              <p className={classes.successMsg}>{authCtx.successMessage}</p>
            )}
            {authCtx.errorMessage && (
              <p className={classes.errorMsg}>{authCtx.errorMessage}</p>
            )}
            <form className={classes.login__form_main} onSubmit={onLogin}>
              <label>Email or Username</label>
              <input
                required
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, emailOrUserName: e.target.value });
                }}
                onFocus={(e) => {
                  authCtx.resetErrorMsg();
                }}
                className={classes.login__form_main_input}
              />
              <label>Password</label>
              <div className={classes.showPassMainArea}>
                <input
                  required
                  type={passwordShow ? "text" : "password"}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  onFocus={(e) => {
                    authCtx.resetErrorMsg();
                  }}
                  className={classes.login__form_main_input_password}
                />
                <div className={classes.showPassIcons}>
                  {!passwordShow && (
                    <AiFillEyeInvisible
                      onClick={() => {
                        togglePasswordShow();
                      }}
                    />
                  )}
                  {passwordShow && (
                    <AiFillEye
                      onClick={() => {
                        togglePasswordShow();
                      }}
                    />
                  )}
                </div>
              </div>
              {/* <Link href="/Auth/User/RegisterPage">
                <p className={classes.not_a_user_yet}>
                  Don&#39;t have an account yet? <span>Sign up</span>
                </p>
              </Link> */}
              <Link href="/Auth/User/ChangePasswordPage">
                <p className={classes.not_a_user_yet}>
                  Forgot your password? <span>Click here</span>
                </p>
              </Link>
              <button type="submit" className={classes.submitBtn}>
                Login
              </button>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default Login;
