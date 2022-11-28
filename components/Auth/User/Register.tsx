import Container from "components/utility/Container";
import React, { useState, useEffect, useContext } from "react";
import classes from "components/Auth/User/Register.module.css";
import { Props, RegistrationDetails } from "types/types";
import nextConfig from "next.config";
import { useRouter } from "next/router";
import LoginPage from "pages/Auth/User/LoginPage";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import Link from "next/link";
// import axios from "axios";
// import axios, { AxiosResponse } from "axios";
import PageLoader from "components/utility/PageLoader";
import { v4 as uuidv4 } from "uuid";
import { server } from "config/index";

const Register = (props: Props) => {
  // states, declarations, variables and hooks

  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);

  const router = useRouter();

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  let errors = {
    name: false,
    email: { emailIsEntered: true, emailIsValid: true, emailExists: false },
    username: { usernameIsEntered: true, usernameExists: false },
    phoneNumber: false,
    profilePhoto: { sizeError: false, typeError: false },
    address: false,
    password: {
      passwordIsEntered: true,
      passwordIsValid: true,
      passwordNotMatched: false,
    },
    random: "",
  };

  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrorState, setFormErrorState] = useState({
    name: false,
    email: { emailIsEntered: true, emailIsValid: true, emailExists: false },
    username: { usernameIsEntered: true, usernameExists: false },
    phoneNumber: false,
    profilePhoto: { sizeError: false, typeError: false },
    address: false,
    password: {
      passwordIsEntered: true,
      passwordIsValid: true,
      passwordNotMatched: false,
    },
    random: "",
  });

  const [successResponse, setSuccessResponse] = useState("");
  const [file, setFile] = useState<any>(null);
  const [fileSize, setFileSize] = useState<any>(null);

  // states, declarations, variables and hooks

  //functions

  //testing file upload
  const handleFileChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFile(target?.files?.[0]);
    setFileSize(target?.files?.[0].size);
  };

  //testing file upload

  const saveRegistrationDetails = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    authCtx.reqLoadingStateHandler();

    // reseting some states
    setSuccessResponse("");
    // reseting some states

    //testing image upload

    //testing image upload

    //validating form inputs

    if (!registrationDetails.name.trim().length) {
      errors.name = true;
    }
    if (!registrationDetails.email.trim().length) {
      errors.email = { ...errors.email, emailIsEntered: false };
    }
    if (!registrationDetails.email.includes("@" && ".")) {
      errors.email = { ...errors.email, emailIsValid: false };
    }
    if (!registrationDetails.username.trim().length) {
      errors.username = { ...errors.username, usernameIsEntered: false };
    }
    if (!registrationDetails.phoneNumber.trim().length) {
      errors.phoneNumber = true;
    }
    if (!registrationDetails.address.trim().length) {
      errors.address = true;
    }
    if (!registrationDetails.password.trim().length) {
      errors.password = { ...errors.password, passwordIsEntered: false };
    }
    if (!registrationDetails.password.match(strongRegex)) {
      errors.password = { ...errors.password, passwordIsValid: false };
    }
    if (registrationDetails.password !== registrationDetails.confirmPassword) {
      errors.password = { ...errors.password, passwordNotMatched: true };
    }
    if (fileSize > 15048576) {
      errors.profilePhoto.sizeError = true;
    }
    // 1048576 1mb;
    // 15048576 15mb;

    if (
      errors.name === false &&
      errors.email.emailIsEntered === true &&
      errors.email.emailIsValid === true &&
      errors.email.emailExists === false &&
      errors.username.usernameIsEntered === true &&
      errors.username.usernameExists === false &&
      errors.profilePhoto.sizeError === false &&
      errors.profilePhoto.typeError === false &&
      errors.phoneNumber === false &&
      errors.address === false &&
      errors.password.passwordIsEntered === true &&
      errors.password.passwordIsValid === true &&
      errors.password.passwordNotMatched === false &&
      errors.random === ""
    ) {
      // parsing dateOfBirth to be able to appen type date
      const DOB = new Date(registrationDetails.dateOfBirth).toUTCString();
      // parsing dateOfBirth to be able to appen type date

      // creating unique id for profile picture naming
      const uniqueId = uuidv4();
      console.log(uniqueId, "unique Id");
      // creating unique id for profile picture naming

      // appending all form data both file and strings
      const data = new FormData();
      data.append("name", registrationDetails.name);
      data.append("email", registrationDetails.email);
      data.append("username", registrationDetails.username);
      data.append("phoneNumber", registrationDetails.phoneNumber);
      data.append("dateOfBirth", DOB);
      data.append("address", registrationDetails.address);
      data.append("password", registrationDetails.password);
      data.append("uniqueId", uniqueId);
      data.append("avatar", file);
      // appending all form data both file and strings

      // using axios to make api call

      // const response: AxiosResponse = await axios.post(
      //   `${server}/user/register-user`,
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //   }
      // );
      // const res = response.data;
      // console.log(res, "res message");

      // using axios to make api call

      // using fetch to make api call

      const response = await fetch(`${server}/user/register-user`, {
        method: "POST",
        body: data,
        // no header needed for using fetch in this situation
        credentials: "include",
      });
      const res = await response.json();

      // using fetch to make api call

      if (res.status === "successful") {
        setFormErrorState({
          name: false,
          email: {
            emailIsEntered: true,
            emailIsValid: true,
            emailExists: false,
          },
          username: { usernameIsEntered: true, usernameExists: false },
          phoneNumber: false,
          profilePhoto: { sizeError: false, typeError: false },
          address: false,
          password: {
            passwordIsEntered: true,
            passwordIsValid: true,
            passwordNotMatched: false,
          },
          random: "",
        });
        setSuccessResponse(res.data.message);

        // router.push("/Auth/User/LoginPage?usercreated=usercreated");

        setRegistrationDetails({
          name: "",
          email: "",
          username: "",
          phoneNumber: "",
          dateOfBirth: new Date(),
          address: "",
          password: "",
          confirmPassword: "",
        });
        setFile(null);
        setFileSize(null);

        errors = {
          name: false,
          email: {
            emailIsEntered: true,
            emailIsValid: true,
            emailExists: false,
          },
          username: { usernameIsEntered: true, usernameExists: false },
          phoneNumber: false,
          profilePhoto: { sizeError: false, typeError: false },
          address: false,
          password: {
            passwordIsEntered: true,
            passwordIsValid: true,
            passwordNotMatched: false,
          },
          random: "",
        };

        setFormErrorState({
          ...formErrorState,
          name: false,
          email: {
            ...formErrorState.email,
            emailIsEntered: true,
            emailIsValid: true,
            emailExists: false,
          },
          username: {
            ...formErrorState.username,
            usernameIsEntered: true,
            usernameExists: false,
          },
          phoneNumber: false,
          profilePhoto: { sizeError: false, typeError: false },
          address: false,
          password: {
            ...formErrorState.password,
            passwordIsEntered: true,
            passwordIsValid: true,
            passwordNotMatched: false,
          },
        });
      } else {
        if (res.data.message === "This email is already taken") {
          setFormErrorState({
            ...formErrorState,
            email: { ...formErrorState.email, emailExists: true },
          });
        } else if (res.data.message === "This username is already taken") {
          setFormErrorState({
            ...formErrorState,
            username: { ...formErrorState.username, usernameExists: true },
          });
        } else if (
          res.data.message ===
          "Image type is invalid, please only use images of types-jpg, jpeg, or png."
        ) {
          console.log(res.data.message);
          setFormErrorState({
            ...formErrorState,
            profilePhoto: { ...formErrorState.profilePhoto, typeError: true },
          });
        } else {
          setFormErrorState({
            ...formErrorState,
            random: res.data.message,
          });
        }
      }
    } else {
      setFormErrorState(errors);
    }
    //validating form inputs
    authCtx.reqLoadingStateResetHandler();
  };

  //functions

  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <Container className={classes.register__main_container}>
          <div className={classes.register__main}>
            {successResponse && (
              <p className={classes.createdSuccessMsg}>{successResponse}</p>
            )}
            {formErrorState.random && (
              <p className={classes.errorMsg}>{formErrorState.random}</p>
            )}
            <h1>Sign Up</h1>
            <h3>Input your details to register</h3>
            <form
              className={classes.register__form_main}
              onSubmit={saveRegistrationDetails}
            >
              <label>Name</label>
              {formErrorState.name && (
                <p className={classes.formErrors}>Name is Required</p>
              )}
              <input
                type="text"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    name: false,
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    name: e.target.value,
                  });
                }}
              />
              <label>Email</label>
              {!formErrorState.email.emailIsEntered && (
                <p className={classes.formErrors}>Email is Required</p>
              )}
              {!formErrorState.email.emailIsValid && (
                <p className={classes.formErrors}>Your email is not valid</p>
              )}
              {formErrorState.email.emailExists && (
                <p className={classes.formErrors}>
                  This email is already taken
                </p>
              )}

              <input
                type="text"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    email: {
                      ...formErrorState.email,
                      emailIsEntered: true,
                      emailIsValid: true,
                      emailExists: false,
                    },
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    email: e.target.value,
                  });
                }}
              />
              <label>Username</label>
              {!formErrorState.username.usernameIsEntered && (
                <p className={classes.formErrors}>Username is Required</p>
              )}
              {formErrorState.username.usernameExists && (
                <p className={classes.formErrors}>
                  This username is already taken
                </p>
              )}

              <input
                type="text"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    username: {
                      ...formErrorState.username,
                      usernameIsEntered: true,
                      usernameExists: false,
                    },
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    username: e.target.value,
                  });
                }}
              />

              <label>Phone Number</label>
              {formErrorState.phoneNumber && (
                <p className={classes.formErrors}>Phone number is Required</p>
              )}
              <input
                type="number"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    phoneNumber: false,
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    phoneNumber: e.target.value,
                  });
                }}
              />

              <label>Date of Birth</label>
              <input
                required
                type="date"
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    dateOfBirth: new Date(e.target.value),
                  });
                }}
              />
              {/* profile picture section */}
              <label>Profile Photo</label>
              <p className={classes.optional}>This field is optional</p>
              {formErrorState.profilePhoto.sizeError && (
                <p className={classes.formErrors}>
                  Image too large! Must not exceed 15mb limit.
                </p>
              )}
              {formErrorState.profilePhoto.typeError && (
                <p className={classes.formErrors}>
                  Image type is invalid, please only use images of types-jpg,
                  jpeg, or png.
                </p>
              )}
              <input
                type="file"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    profilePhoto: { sizeError: false, typeError: false },
                  });
                }}
                id="file"
                className={classes.profile_input}
                onChange={handleFileChange}
              />
              {/* profile picture section */}

              <label>Address</label>
              {formErrorState.address && (
                <p className={classes.formErrors}>Address is Required</p>
              )}
              <input
                type="text"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    address: false,
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    address: e.target.value,
                  });
                }}
              />
              <label>Password</label>
              {!formErrorState.password.passwordIsEntered && (
                <p className={classes.formErrors}>Password is Required</p>
              )}
              {!formErrorState.password.passwordIsValid && (
                <p className={classes.formErrors}>
                  Password must have atleast 6 characters, contain atleast one
                  uppercase and one lowercase and also a special character.
                </p>
              )}

              <input
                type="text"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    password: {
                      ...formErrorState.password,
                      passwordIsEntered: true,
                      passwordIsValid: true,
                    },
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    password: e.target.value,
                  });
                }}
              />
              <label>Confirm Password</label>
              {formErrorState.password.passwordNotMatched && (
                <p className={classes.formErrors}>Password does not match</p>
              )}
              <input
                type="text"
                onFocus={(e) => {
                  setFormErrorState({
                    ...formErrorState,
                    password: {
                      ...formErrorState.password,
                      passwordNotMatched: false,
                    },
                  });
                }}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    confirmPassword: e.target.value,
                  });
                }}
              />
              <Link href="/Auth/User/LoginPage">
                <p className={classes.already_a_user}>
                  Already got an account? <span>Login</span>
                </p>
              </Link>

              <button type="submit" className={classes.submitBtn}>
                Register
              </button>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default Register;
