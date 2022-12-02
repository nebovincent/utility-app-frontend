import Container from "components/utility/Container";
import classes from "components/Auth/User/PasswordReset.module.css";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import { useRouter } from "next/router";
import CheckIfExpired from "components/utility/CheckIfExpired";
import { server } from "config/index";
import PasswordLinkExpired from "components/Random/PasswordLinkExpired";

function ProfileChangePassword() {
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const router = useRouter();
  const [expirationTime, setExpirationTime] = useState(null);

  const [userEmail, setUserEmail] = useState<string | string[]>("");
  const [uniqueId, setUniqueId] = useState<string | string[]>("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  const [passwordInput, setPasswordInput] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  let errors = {
    newPassword: { invalid: false, isEmpty: false },
    confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
    random: "",
  };
  const [formErrors, setFormErrors] = useState({
    newPassword: { invalid: false, isEmpty: false },
    confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
    random: "",
  });

  const [successResponse, setSuccessResponse] = useState("");

  const changePassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // reset states and errors
    errors = {
      newPassword: { invalid: false, isEmpty: false },
      confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
      random: "",
    };
    setFormErrors({
      newPassword: { invalid: false, isEmpty: false },
      confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
      random: "",
    });
    // reset states and errors

    //validatiions
    if (passwordInput.newPassword !== passwordInput.confirmNewPassword) {
      errors.confirmNewPassword.passwordNotMatched = true;
    }
    if (!passwordInput.newPassword.match(strongRegex)) {
      errors.newPassword.invalid = true;
    }

    if (!passwordInput.newPassword.trim().length) {
      errors.newPassword.isEmpty = true;
    }
    if (!passwordInput.confirmNewPassword.trim().length) {
      errors.confirmNewPassword.isEmpty = true;
    }
    //validatiions

    if (
      errors.newPassword.invalid === false &&
      errors.newPassword.isEmpty === false &&
      errors.confirmNewPassword.passwordNotMatched === false &&
      errors.confirmNewPassword.isEmpty === false &&
      errors.random === ""
    ) {
      authCtx.reqLoadingStateHandler();

      const data = {
        uuiduniqueId: router?.query?.uniqueId,
        email: router?.query?.email,
        newPassword: passwordInput.newPassword,
        expirationTime: expirationTime,
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        "Access-Control-Allow-Credentials": "true",
      };
      const response = await fetch(`${server}/user/reset-password`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      });
      const res = await response.json();
      console.log(res);
      if (res.status === "successful") {
        setSuccessResponse(res.data.message);
        setPasswordInput({
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        setFormErrors({ ...formErrors, random: res.data.message });
      }
    } else {
      setFormErrors(errors);
    }
    authCtx.reqLoadingStateResetHandler();
    const timer = setTimeout(() => {
      setSuccessResponse("");
    }, 2000);
  };

  let isExpired = utilCtx.expired;

  // useEffect to check if expired or not
  useEffect(() => {
    const fetchUrlInfo = async () => {
      const data = {
        uuiduniqueId: router.query.uniqueId,
      };

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        "Access-Control-Allow-Credentials": "true",
      };
      const response = await fetch(`${server}/user/password-change-url-info`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
        credentials: "include",
      });
      const res = await response.json();
      if (res.status === "successful") {
        const now = Date.now();
        console.log(now, "now");
        const expiresAt = Date.parse(res.data.expiresAt);
        console.log(expiresAt, "expires at");
        setExpirationTime(res.data.expiresAt);
        if (expiresAt > now) {
          console.log("still valid");
          utilCtx.resetLoadingStateHandler();
        } else {
          console.log("no longer valid");
          utilCtx.setExpiredHandler();
          utilCtx.resetLoadingStateHandler();
        }
      } else {
        console.log("not successful");
      }
    };
    if (router.query.uniqueId) {
      fetchUrlInfo();
    }
    // if (utilCtx.expired === true) {
    //   router.push("/RandomPages/PasswordLinkExpiredPage");
    //   console.log("expired page1");
    // }
  }, [router, utilCtx]);

  // useEffect to check if expired or not

  return (
    <CheckIfExpired>
      <Container className={classes.profile_changepassword__main_container}>
        <div className={classes.profile_changepassword__main_wrapper}>
          {successResponse && (
            <p className={classes.updatedSuccessMsg}>{successResponse}</p>
          )}
          {formErrors.random && (
            <p className={classes.errorMsg}>{formErrors.random}</p>
          )}

          <div className={classes.profile_changepassword__main}>
            <form className={classes.form_main} onSubmit={changePassword}>
              <h1>Change Password</h1>

              <div>
                <label>New Password</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPasswordInput({
                      ...passwordInput,
                      newPassword: e.target.value,
                    });
                  }}
                  value={passwordInput.newPassword}
                  onFocus={(e) => {
                    setFormErrors({
                      ...formErrors,
                      newPassword: {
                        invalid: false,
                        isEmpty: false,
                      },
                    });
                  }}
                />
                {formErrors.newPassword.invalid && (
                  <p className={classes.formErrors}>
                    Password must have atleast 6 characters, contain atleast one
                    uppercase and one lowercase and also a special character.
                  </p>
                )}
                {formErrors.newPassword.isEmpty && (
                  <p className={classes.formErrors}>This field is Required</p>
                )}
              </div>
              <div>
                <label>Confirm New Password</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPasswordInput({
                      ...passwordInput,
                      confirmNewPassword: e.target.value,
                    });
                  }}
                  value={passwordInput.confirmNewPassword}
                  onFocus={(e) => {
                    setFormErrors({
                      ...formErrors,
                      confirmNewPassword: {
                        passwordNotMatched: false,
                        isEmpty: false,
                      },
                    });
                  }}
                />
                {formErrors.confirmNewPassword.isEmpty && (
                  <p className={classes.formErrors}>This field is Required</p>
                )}
                {formErrors.confirmNewPassword.passwordNotMatched && (
                  <p className={classes.formErrors}>Password does not match</p>
                )}
              </div>
              <div>
                <button className={classes.submitBtn}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </CheckIfExpired>
  );
}

export default ProfileChangePassword;
