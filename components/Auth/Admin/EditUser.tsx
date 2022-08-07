import Container from "components/utility/Container";
import React, { useState, useContext, useEffect } from "react";
import classes from "components/Auth/Admin/EditUser.module.css";
import { Props, editUserType } from "types/types";
import nextConfig from "next.config";
import moment from "moment";
import { useRouter } from "next/router";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import ProtectedRoutes from "components/utility/ProtectedRoutes";

const EditUser = ({ user }: Props) => {
  // const [userId, setUserId] = useState(user?.id);

  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const router = useRouter();

  // useEffect to check if user is still authenticated

  // useEffect to check if user is still authenticated

  const [userInfo, setUserInfo] = useState({ ...user });

  const saveEditUserDetails = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const userDetails = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
      phoneNumber: userInfo.phoneNumber,
      dateOfBirth: userInfo.dateOfBirth,
      address: userInfo.address,
    };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(
      `${nextConfig.env?.backend_url}/admin/edit-user-info`,
      {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();
    if (res.status === "successful") {
      router.push("/Auth/Admin/UsersPage");
    }
  };
  return (
    <ProtectedRoutes>
      <Container className={classes.register__main_container}>
        <div className={classes.register__main}>
          <h1>Edit</h1>
          <h3>Edit User Details</h3>
          <form
            className={classes.register__form_main}
            onSubmit={saveEditUserDetails}
          >
            <label>Name</label>
            <input
              type="text"
              value={userInfo?.name}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                });
              }}
            />
            <label>Email</label>
            <input
              type="email"
              required
              value={userInfo?.email}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
            />
            <label>Username</label>
            <input
              type="text"
              value={userInfo?.username}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  username: e.target.value,
                });
              }}
            />

            <label>Phone Number</label>
            <input
              type="number"
              value={userInfo?.phoneNumber}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  phoneNumber: e.target.value,
                });
              }}
            />

            <label>Date of Birth</label>
            <input
              type="date"
              value={
                userInfo.dateOfBirth &&
                new Date(userInfo?.dateOfBirth).toISOString().split("T")[0]
              }
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  dateOfBirth: new Date(e.target.value),
                });
              }}
            />

            <label>Address</label>
            <input
              type="text"
              value={userInfo?.address}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  address: e.target.value,
                });
              }}
            />

            <button type="submit" className={classes.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </Container>
    </ProtectedRoutes>
  );
};

export default EditUser;
