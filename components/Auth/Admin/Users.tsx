import UsersTable from "components/utility/UsersTable";
import classes from "components/Auth/Admin/Users.module.css";
import React, { useEffect, useState, useContext } from "react";
import Container from "components/utility/Container";
import { allUsersType } from "types/types";
import nextConfig from "next.config";
import { useRouter } from "next/router";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import PageLoader from "components/utility/PageLoader";
import ProtectedRoutes from "components/utility/ProtectedRoutes";

const Users: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  const [allUsers, setAllUsers] = useState<allUsersType[]>([]);
  const [successResponse, setSuccessResponse] = useState("");
  const [errorReport, setErrorReport] = useState("");
  const router = useRouter();

  // useEffect to check if user is still authenticated

  const fetchAllUsers = async () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await fetch(
      `${nextConfig.env?.backend_url}/admin/get-all-users`,
      {
        method: "GET",
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const users = await response.json();

    setAllUsers(users.data.result);
  };

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

    const response = await fetch(
      `${nextConfig.env?.backend_url}/admin/delete-user`,
      {
        method: "POST",
        body: JSON.stringify(userId),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
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

    const response = await fetch(
      `${nextConfig.env?.backend_url}/admin/activate-user`,
      {
        method: "POST",
        body: JSON.stringify(userId),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
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

    const response = await fetch(
      `${nextConfig.env?.backend_url}/admin/deactivate-user`,
      {
        method: "POST",
        body: JSON.stringify(userId),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
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

    const response = await fetch(
      `${nextConfig.env?.backend_url}/admin/make-user-admin`,
      {
        method: "POST",
        body: JSON.stringify(userId),
        headers: headers,
        credentials: "include",
        // statusCode: 200,
      }
    );
    const res = await response.json();

    if (res.status === "successful") {
      fetchAllUsers();
      setSuccessResponse(res.data.message);
      setTimeout(() => {
        setSuccessResponse("");
      }, 5000);
    } else {
      setErrorReport(res.data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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
