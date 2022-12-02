import UsersTable from "components/utility/UsersTable";
import classes from "components/Auth/Admin/Users.module.css";
import React, { useEffect, useState, useContext, useCallback } from "react";
import Container from "components/utility/Container";
import { allUsersType } from "types/types";
import nextConfig from "next.config";
import { useRouter } from "next/router";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import PageLoader from "components/utility/PageLoader";
import ProtectedRoutes from "components/utility/ProtectedRoutes";
import { server } from "config/index";

const Users: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const [allUsers, setAllUsers] = useState<allUsersType[]>([]);
  const [successResponse, setSuccessResponse] = useState("");
  const [errorReport, setErrorReport] = useState("");
  const router = useRouter();

  // useEffect to check if user is still authenticated

  const fetchAllUsers = useCallback(async () => {
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
    if (users.status === "successful") {
      setAllUsers(users.data.result);
    } else {
      if (
        users.data.message === "Not Authorized, please log in" ||
        users.data.message === "Session Expired please login again"
      ) {
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
  }, [router]);

  const onDeleteUser = async (e: any) => {
    setErrorReport("");
    const userId = {
      id: e,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/admin/delete-user`, {
      method: "POST",
      body: JSON.stringify(userId),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
  };

  const onActivateUser = async (e: any) => {
    setErrorReport("");
    const userId = {
      id: e,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/admin/activate-user`, {
      method: "POST",
      body: JSON.stringify(userId),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
  };
  const onDeactivateUser = async (e: any) => {
    setErrorReport("");
    const userId = {
      id: e,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/admin/deactivate-user`, {
      method: "POST",
      body: JSON.stringify(userId),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
  };
  const onMakeUserAdmin = async (id: any, role: any) => {
    setErrorReport("");
    const userId = {
      id: id,
      role: role,
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(`${server}/admin/make-user-admin`, {
      method: "POST",
      body: JSON.stringify(userId),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    });
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
      if (
        res.data.message === "Not Authorized, please log in" ||
        res.data.message === "Session Expired please login again"
      ) {
        setTimeout(() => router.push("/Auth/User/LoginPage"), 5000);
      }
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <ProtectedRoutes>
      <Container className={classes.users__main_container}>
        {successResponse && (
          <p className={classes.successResText}>{successResponse}</p>
        )}
        {errorReport && <p className={classes.errorReport}>{errorReport}</p>}
        <div>
          <h1>List of Users</h1>
        </div>
        <UsersTable
          allUsers={allUsers}
          onDeleteUser={onDeleteUser}
          onActivateUser={onActivateUser}
          onDeactivateUser={onDeactivateUser}
          onMakeUserAdmin={onMakeUserAdmin}
          className={classes.users__table_container}
        />
      </Container>
    </ProtectedRoutes>
  );
};

export default Users;
