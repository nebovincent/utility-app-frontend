import Container from "components/utility/Container";
import React, { useContext, useEffect, useState } from "react";
import classes from "components/Auth/User/UserProfile/Profile.module.css";
import Image from "next/image";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import { v4 as uuidv4 } from "uuid";
import PageLoader from "components/utility/PageLoader";
import { server } from "config/index";

function Profile() {
  const authCtx = useContext(AuthContext);
  const [file, setFile] = useState<any>(null);
  const [fileSize, setFileSize] = useState<any>(null);

  const [authUserProfileDetails, setAuthUserProfileDetails] = useState({
    id: authCtx.authUserProfileDetails.id,
    name: authCtx.authUserProfileDetails.name,
    email: authCtx.authUserProfileDetails.email,
    username: authCtx.authUserProfileDetails.username,
    phoneNumber: authCtx.authUserProfileDetails.phoneNumber,
    address: authCtx.authUserProfileDetails.address,
    dateOfBirth: authCtx.authUserProfileDetails.dateOfBirth,
    profilePicture: authCtx.authUserProfileDetails.profilePicture,
  });

  const [editUserProfileDetails, setEditUserProfileDetails] = useState({
    editName: false,
    editEmail: false,
    editPhoneNumber: false,
    editAddress: false,
    editDateOfBirth: false,
  });
  const [successResponse, setSuccessResponse] = useState("");

  let errors = {
    name: false,
    email: { emailIsEntered: true, emailIsValid: true, emailExists: false },
    phoneNumber: false,
    profilePhoto: { sizeError: false, typeError: false },
    address: false,
    random: "",
  };
  const handleFileChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const fileSize = target?.files?.[0]?.size;
    setFile(target?.files?.[0]);
    setFileSize(target?.files?.[0].size);
  };

  const [formErrorState, setFormErrorState] = useState({
    name: false,
    email: { emailIsEntered: true, emailIsValid: true, emailExists: false },
    phoneNumber: false,
    profilePhoto: { sizeError: false, typeError: false },
    address: false,
    random: "",
  });

  useEffect(() => {
    setAuthUserProfileDetails({
      id: authCtx.authUserProfileDetails.id,
      name: authCtx.authUserProfileDetails.name,
      email: authCtx.authUserProfileDetails.email,
      username: authCtx.authUserProfileDetails.username,
      phoneNumber: authCtx.authUserProfileDetails.phoneNumber,
      address: authCtx.authUserProfileDetails.address,
      dateOfBirth: authCtx.authUserProfileDetails.dateOfBirth,
      profilePicture: authCtx.authUserProfileDetails.profilePicture,
    });
  }, [authCtx.authUserProfileDetails]);

  const saveProfileDetails = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    authCtx.reqLoadingStateHandler();

    // reseting some states
    setSuccessResponse("");
    // reseting some states

    //validating form inputs

    if (!authUserProfileDetails.name.trim().length) {
      errors.name = true;
    }
    if (!authUserProfileDetails.email.trim().length) {
      errors.email = { ...errors.email, emailIsEntered: false };
    }
    if (!authUserProfileDetails.email.includes("@" && ".")) {
      errors.email = { ...errors.email, emailIsValid: false };
    }

    if (!authUserProfileDetails.phoneNumber.trim().length) {
      errors.phoneNumber = true;
    }
    if (!authUserProfileDetails.address.trim().length) {
      errors.address = true;
    }

    if (fileSize > 1048576) {
      errors.profilePhoto.sizeError = true;
    }
    // 1048576 for 1mb
    if (
      errors.name === false &&
      errors.email.emailIsEntered === true &&
      errors.email.emailIsValid === true &&
      errors.email.emailExists === false &&
      errors.profilePhoto.sizeError === false &&
      errors.profilePhoto.typeError === false &&
      errors.phoneNumber === false &&
      errors.address === false &&
      errors.random === ""
    ) {
      // parsing dateOfBirth to be able to appen type date
      const DOB = new Date(authUserProfileDetails.dateOfBirth).toUTCString();
      // parsing dateOfBirth to be able to appen type date

      // creating unique id for profile picture naming
      const uniqueId = uuidv4();
      console.log(uniqueId, "unique Id");
      // creating unique id for profile picture naming

      // appending all form data both file and strings
      const data = new FormData();
      data.append("id", authUserProfileDetails.id);
      data.append("name", authUserProfileDetails.name);
      data.append("email", authUserProfileDetails.email);
      data.append("username", authUserProfileDetails.username);
      data.append("phoneNumber", authUserProfileDetails.phoneNumber);
      data.append("dateOfBirth", DOB);
      data.append("address", authUserProfileDetails.address);
      data.append("profilePicture", authUserProfileDetails.profilePicture);
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

      const response = await fetch(`${server}/user/update-profile`, {
        method: "POST",
        body: data,
        // no header needed for using fetch in this situation
        credentials: "include",
      });
      const res = await response.json();

      // using fetch to make api call

      if (res.status === "successful") {
        authCtx.getCookie();
        setSuccessResponse(res.data.message);

        setFile(null);
        setFileSize(null);

        errors = {
          name: false,
          email: {
            emailIsEntered: true,
            emailIsValid: true,
            emailExists: false,
          },

          phoneNumber: false,
          profilePhoto: { sizeError: false, typeError: false },
          address: false,
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

          phoneNumber: false,
          profilePhoto: { sizeError: false, typeError: false },
          address: false,
        });
      } else {
        if (
          res.data.message ===
          "Image type is invalid, please only use images of types-jpg, jpeg, or png."
        ) {
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
    const timer = setTimeout(() => {
      setSuccessResponse("");
    }, 5000);
  };

  return (
    <>
      {authCtx.reqLoadingState ? (
        <PageLoader />
      ) : (
        <ProtectedRoutes>
          <Container className={classes.profile__main_container}>
            <div className={classes.profile__main_wrapper}>
              {successResponse && (
                <p className={classes.updatedSuccessMsg}>{successResponse}</p>
              )}
              {formErrorState.random && (
                <p className={classes.errorMsg}>{formErrorState.random}</p>
              )}
              <div className={classes.profile__main}>
                <form
                  className={classes.form_main}
                  onSubmit={saveProfileDetails}
                >
                  <div>
                    {/* <Image
                      className={classes.rounded_div_profile}
                      src={`${nextConfig?.env?.backend_url}/uploads/profiles/${authCtx.authUserProfileDetails.profilePicture}`}
                      alt="Profile"
                      width="100"
                      height="100"
                      objectFit="cover"
                    /> */}
                    <Image
                      className={classes.rounded_div_profile}
                      src={authCtx?.authUserProfileDetails?.profilePicture}
                      alt="Profile"
                      width="100"
                      height="100"
                      objectFit="cover"
                    />
                  </div>

                  <div className={classes.name_section_main}>
                    <div className={classes.form_fieldset}>
                      <div className={classes.form_fieldset_child}>
                        <label>Email</label>
                        <input
                          type="text"
                          value={authUserProfileDetails?.email}
                          onChange={(e) => {
                            setAuthUserProfileDetails({
                              ...authUserProfileDetails,
                              email: e.target.value,
                            });
                          }}
                          onBlur={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editEmail: false,
                            });
                          }}
                          disabled={
                            editUserProfileDetails.editEmail ? false : true
                          }
                        />
                      </div>
                      {/* <div className={classes.edit_icon_main}>
                    <FaEdit
                      className={classes.edit_icon_main_icon}
                      onClick={(e) => {
                        setEditUserProfileDetails({
                          ...editUserProfileDetails,
                          editEmail: true,
                        });
                      }}
                    />
                  </div> */}
                    </div>
                  </div>
                  <div>
                    <div className={classes.form_fieldset}>
                      <div className={classes.form_fieldset_child}>
                        <label>Name</label>
                        {formErrorState.name && (
                          <p className={classes.formErrors}>Name is Required</p>
                        )}
                        <input
                          type="text"
                          value={authUserProfileDetails?.name}
                          onChange={(e) => {
                            setAuthUserProfileDetails({
                              ...authUserProfileDetails,
                              name: e.target.value,
                            });
                          }}
                          onBlur={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editName: false,
                            });
                          }}
                          onFocus={(e) => {
                            setFormErrorState({
                              ...formErrorState,
                              name: false,
                            });
                          }}
                          disabled={
                            editUserProfileDetails.editName ? false : true
                          }
                        />
                      </div>
                      <div className={classes.edit_icon_main}>
                        <FaEdit
                          className={classes.edit_icon_main_icon}
                          onClick={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editName: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={classes.form_fieldset}>
                      <div className={classes.form_fieldset_child}>
                        <label>Phone Number</label>
                        {formErrorState.phoneNumber && (
                          <p className={classes.formErrors}>
                            Phone number is Required
                          </p>
                        )}
                        <input
                          type="text"
                          value={authUserProfileDetails?.phoneNumber}
                          onChange={(e) => {
                            setAuthUserProfileDetails({
                              ...authUserProfileDetails,
                              phoneNumber: e.target.value,
                            });
                          }}
                          onBlur={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editPhoneNumber: false,
                            });
                          }}
                          onFocus={(e) => {
                            setFormErrorState({
                              ...formErrorState,
                              phoneNumber: false,
                            });
                          }}
                          disabled={
                            editUserProfileDetails.editPhoneNumber
                              ? false
                              : true
                          }
                        />
                      </div>
                      <div className={classes.edit_icon_main}>
                        <FaEdit
                          className={classes.edit_icon_main_icon}
                          onClick={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editPhoneNumber: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={classes.form_fieldset}>
                      <div className={classes.form_fieldset_child}>
                        <label>Address</label>
                        {formErrorState.address && (
                          <p className={classes.formErrors}>
                            Address is Required
                          </p>
                        )}
                        <input
                          type="text"
                          value={authUserProfileDetails?.address}
                          onChange={(e) => {
                            setAuthUserProfileDetails({
                              ...authUserProfileDetails,
                              address: e.target.value,
                            });
                          }}
                          onBlur={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editAddress: false,
                            });
                          }}
                          onFocus={(e) => {
                            setFormErrorState({
                              ...formErrorState,
                              address: false,
                            });
                          }}
                          disabled={
                            editUserProfileDetails.editAddress ? false : true
                          }
                        />
                      </div>
                      <div className={classes.edit_icon_main}>
                        <FaEdit
                          className={classes.edit_icon_main_icon}
                          onClick={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editAddress: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={classes.form_fieldset}>
                      <div className={classes.form_fieldset_child}>
                        <label>Date of Birth</label>

                        <input
                          type="date"
                          value={
                            authUserProfileDetails?.dateOfBirth &&
                            new Date(authUserProfileDetails?.dateOfBirth)
                              .toISOString()
                              .split("T")[0]
                          }
                          onChange={(e) => {
                            setAuthUserProfileDetails({
                              ...authUserProfileDetails,
                              dateOfBirth: e.target.value,
                            });
                          }}
                          onBlur={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editDateOfBirth: false,
                            });
                          }}
                          disabled={
                            editUserProfileDetails.editDateOfBirth
                              ? false
                              : true
                          }
                          required
                        />
                      </div>
                      <div className={classes.edit_icon_main}>
                        <FaEdit
                          className={classes.edit_icon_main_icon}
                          onClick={(e) => {
                            setEditUserProfileDetails({
                              ...editUserProfileDetails,
                              editDateOfBirth: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.fileupload_main}>
                    <div className={classes.form_fieldset}>
                      <div className={classes.form_fieldset_child}>
                        <label>Change Profile Picture</label>
                        <p className={classes.optional}>
                          This field is optional
                        </p>

                        <input
                          type="file"
                          onChange={handleFileChange}
                          onFocus={(e) => {
                            setFormErrorState({
                              ...formErrorState,
                              profilePhoto: {
                                sizeError: false,
                                typeError: false,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {formErrorState.profilePhoto.sizeError && (
                    <p className={classes.formErrors}>
                      Image too large! Must not exceed 1mb limit.
                    </p>
                  )}
                  {formErrorState.profilePhoto.typeError && (
                    <p className={classes.formErrors}>
                      Image type is invalid, please only use images of
                      types-jpg, jpeg, or png.
                    </p>
                  )}
                  <div>
                    <button className={classes.submitBtn}>
                      Submit Changes
                    </button>
                  </div>
                </form>
                <div className={classes.changepassword_main}>
                  <Link href="/Auth/User/UserProfile/ChangePassword/ProfileChangePasswordPage">
                    <h5>
                      Want to change your password? <br />
                      <span>Click here</span>
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </ProtectedRoutes>
      )}
    </>
  );
}

export default Profile;
