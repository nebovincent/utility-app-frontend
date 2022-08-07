import Container from "components/utility/Container";
import classes from "components/Auth/User/UserProfile/ChangePassword/ProfileChangePassword.module.css";
import Link from "next/link";
import React, { useState, useContext } from "react";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";

function ProfileChangePassword() {
  const authCtx = useContext(AuthContext);
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  const [passwordInput, setPasswordInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  let errors = {
    currentPassword: { incorrect: false, isEmpty: false },
    newPassword: { invalid: false, isEmpty: false },
    confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
    random: "",
  };
  const [formErrors, setFormErrors] = useState({
    currentPassword: { incorrect: false, isEmpty: false },
    newPassword: { invalid: false, isEmpty: false },
    confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
    random: "",
  });

  const [successResponse, setSuccessResponse] = useState("");

  const changePassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // reset states and errors
    errors = {
      currentPassword: { incorrect: false, isEmpty: false },
      newPassword: { invalid: false, isEmpty: false },
      confirmNewPassword: { passwordNotMatched: false, isEmpty: false },
      random: "",
    };
    setFormErrors({
      currentPassword: { incorrect: false, isEmpty: false },
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
    if (!passwordInput.currentPassword.trim().length) {
      errors.currentPassword.isEmpty = true;
    }
    if (!passwordInput.newPassword.trim().length) {
      errors.newPassword.isEmpty = true;
    }
    if (!passwordInput.confirmNewPassword.trim().length) {
      errors.confirmNewPassword.isEmpty = true;
    }
    //validatiions

    if (
      errors.currentPassword.incorrect === false &&
      errors.currentPassword.isEmpty === false &&
      errors.newPassword.invalid === false &&
      errors.newPassword.isEmpty === false &&
      errors.confirmNewPassword.passwordNotMatched === false &&
      errors.confirmNewPassword.isEmpty === false &&
      errors.random === ""
    ) {
      authCtx.reqLoadingStateHandler();

      const data = {
        id: authCtx.authUserProfileDetails.id,
        currentPassword: passwordInput.currentPassword,
        newPassword: passwordInput.newPassword,
      };
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        "Access-Control-Allow-Credentials": "true",
      };
      const response = await fetch(
        `${nextConfig.env?.backend_url}/user/profile-change-password`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: headers,
          credentials: "include",
          // statusCode: 200,
        }
      );
      const res = await response.json();
      console.log(res);
      if (res.status === "successful") {
        setSuccessResponse(res.data.message);
        setPasswordInput({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else if (res.data.message === "Your password is incorrect") {
        setFormErrors({
          ...formErrors,
          currentPassword: { ...formErrors.currentPassword, incorrect: true },
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

  return (
    <ProtectedRoutes>
      <Container className={classes.profile_changepassword__main_container}>
        <div className={classes.profile_changepassword__main_wrapper}>
          {successResponse && (
            <p className={classes.updatedSuccessMsg}>{successResponse}</p>
          )}
          {formErrors.random && (
            <p className={classes.errorMsg}>{formErrors.random}</p>
          )}
          {formErrors.currentPassword.incorrect && (
            <p className={classes.formErrors}>Password is incorrect</p>
          )}
          <div className={classes.profile_changepassword__main}>
            <form className={classes.form_main} onSubmit={changePassword}>
              <h1>Change Password</h1>
              <div>
                <label>Current Password</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPasswordInput({
                      ...passwordInput,
                      currentPassword: e.target.value,
                    });
                  }}
                  value={passwordInput.currentPassword}
                  onFocus={(e) => {
                    setFormErrors({
                      ...formErrors,
                      currentPassword: {
                        incorrect: false,
                        isEmpty: false,
                      },
                    });
                  }}
                />
                {formErrors.currentPassword.isEmpty && (
                  <p className={classes.formErrors}>This field is Required</p>
                )}
              </div>
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
    </ProtectedRoutes>
  );
}

export default ProfileChangePassword;
