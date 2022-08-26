import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import nextConfig from "next.config";
import { Props, userLoginDetails, authUserProfileDetails } from "types/types";
import { server } from "config/index";

const AuthContext = React.createContext({
  userRole: "user",
  userIsActivated: false,
  userProfilePicture: "defaultProfilePicture.png",
  isLoggedIn: false,
  onLogout: () => {},
  onLoginHandler: (data: userLoginDetails) => {},
  getCookie: () => {},
  authUserId: "",
  successMessage: "",
  resetErrorMsg: () => {},
  errorMessage: "",
  fetchAllUsers: () => {},
  authUserProfileDetails: {
    id: "",
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    profilePicture: "defaultProfilePicture.png",
  },
  authLoadingState: true,
  reqLoadingState: false,
  reqLoadingStateHandler: () => {},
  reqLoadingStateResetHandler: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [userRole, setUserRole] = useState("user");
  const [userIsActivated, setUserIsActivated] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState(
    "defaultProfilePicture.png"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUserId, setAuthUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authUserProfileDetails, setAuthUserProfileDetails] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    profilePicture: "defaultProfilePicture.png",
  });
  const [authLoadingState, setAuthLoadingState] = useState(true);
  const [reqLoadingState, setReqLoadingState] = useState(false);

  // req loading state handler
  const reqLoadingStateHandler = () => {
    setReqLoadingState(true);
  };
  const reqLoadingStateResetHandler = () => {
    setReqLoadingState(false);
  };
  // req loading state handler

  // Router
  const router = useRouter();
  // Router

  //Generally checking for cookie and setting state
  const getCookie = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/user/getcookie`, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    const res = await response.json();

    if (res.status === "successful") {
      setAuthUserId(res.data.user_id);
      setUserRole(res.data.user_role);
      setUserIsActivated(res.data.user_isActivated);
      res.data.user_profilePicture
        ? setUserProfilePicture(res.data.user_profilePicture)
        : setUserProfilePicture("defaultProfilePicture.png");

      setIsLoggedIn(true);
      // setSuccessMessage(res.data.message);

      // setting profile details
      setAuthUserProfileDetails({
        ...authUserProfileDetails,
        id: res.data.user_id,
        name: res.data.user_name,
        email: res.data.user_email,
        username: res.data.user_username,
        phoneNumber: res.data.user_phoneNumber,
        address: res.data.user_address,
        dateOfBirth: res.data.user_dateOfBirth,
        profilePicture: res.data.user_profilePicture,
      });
      // setting profile details
      // setAuthLoadingState(false);
    } else {
      if (res.data.message === "Not Authorized, please log in") {
        setAuthUserId("");
        setIsLoggedIn(false);
      } else if (res.data.message === "Session Expired please login again") {
        setAuthUserId("");
        setIsLoggedIn(false);
      } else {
        setAuthUserId("");
        setIsLoggedIn(false);
      }

      // setAuthLoadingState(false);
    }

    setAuthLoadingState(false);
  };

  // fetching all users globally for admin
  const fetchAllUsers = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/admin/get-all-users`, {
      method: "GET",
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const users = await response.json();

    return users.data.result;
  };
  // fetching all users globally for admin

  // useEffect for checking for browser cookie
  useEffect(() => {
    getCookie();
  }, []);
  // useEffect for checking for browser cookie

  //Generally checking for cookie and setting state

  // login handler

  const loginHandler = async (data: userLoginDetails) => {
    setReqLoadingState(true);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/user/login-user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
      credentials: "include",
    });
    const res = await response.json();

    if (res.status === "successful") {
      getCookie();
      router.push("/?userloggedin=userloggedin");
      setSuccessMessage(res.data.message);
    } else {
      if (res.data.message === "Invalid user credentials") {
        setErrorMessage(res.data.message);
      } else if (res.data.message === "User does not exist") {
        setErrorMessage(res.data.message);
      } else if (res.data.message === "Please check your internet connection") {
        setErrorMessage(res.data.message);
      } else if (res.data.message === "Server Error") {
        setErrorMessage(res.data.message);
      } else {
        setErrorMessage(res.data.message);
      }
    }
    setReqLoadingState(false);
  };

  // login handler

  // logout handler

  const logoutHandler = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };
    const response = await fetch(`${server}/user/logout-user`, {
      method: "POST",
      body: JSON.stringify({ id: authUserId }),
      headers: headers,
      credentials: "include",
    });

    const res = await response.json();
    if (res) {
      if (res.status === "successful") {
        setAuthUserId("");
        setUserRole("user");
        setUserIsActivated(false);
        setUserProfilePicture("defaultProfilePicture.png");
        setIsLoggedIn(false);
        setSuccessMessage(res.data.message);
        setAuthUserProfileDetails({
          ...authUserProfileDetails,
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          dateOfBirth: "",
          profilePicture: "defaultProfilePicture.png",
        });

        router.push("/");
      } else {
        setErrorMessage(res.data.message);
      }
    }
  };

  // logout handler

  const resetErrorMsg = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        userIsActivated: userIsActivated,
        userProfilePicture: userProfilePicture,
        userRole: userRole,
        isLoggedIn: isLoggedIn,
        onLoginHandler: loginHandler,
        onLogout: logoutHandler,
        authUserId: authUserId,
        getCookie: getCookie,
        successMessage: successMessage,
        resetErrorMsg: resetErrorMsg,
        errorMessage: errorMessage,
        fetchAllUsers: fetchAllUsers,
        authUserProfileDetails: authUserProfileDetails,
        authLoadingState: authLoadingState,
        reqLoadingState: reqLoadingState,
        reqLoadingStateHandler: reqLoadingStateHandler,
        reqLoadingStateResetHandler: reqLoadingStateResetHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
