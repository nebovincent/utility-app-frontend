import React, { useContext } from "react";
import EditUser from "../../../../components/Auth/Admin/EditUser";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import * as mongoose from "mongoose";
import { Props, allUsersType } from "types/types";
import nextConfig from "next.config";
import AuthContext from "context/auth-context";
// const authCtx = useContext(AuthContext);

function EditUserPage({ user }: Props) {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div>
      <EditUser user={user} />
    </div>
  );
}

function getAllUsers(): any {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = fetch(`${nextConfig.env?.backend_url}/admin/get-all-users`, {
    method: "GET",
    headers: headers,
    credentials: "include",
  })
    .then((response) => {
      const res = response.json();
      return res;
    })
    .then((res: any) => {
      const allusers = JSON.parse(res);
      console.log(allusers.data.result);
      return allusers.data.result;
    });
}

export async function getStaticPaths() {
  // fetching all users

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
  const res = await response.json();

  const users = await res.data.result;

  // trying to check if user is admin before making this call

  // const requestUsers = async () => {
  //   if (authCtx.userRole === "admin") {
  //     const response = await fetch(
  //       `${nextConfig.env?.backend_url}/admin/get-all-users`,
  //       {
  //         method: "GET",
  //         headers: headers,
  //         credentials: "include",
  //         // statusCode: 200,
  //       }
  //     );
  //     const res = await response.json();
  //     const users = await res.data.result;
  //     return users;
  //   }
  // };
  // const users = requestUsers();

  // trying to check if user is admin before making this call

  return {
    fallback: "blocking",
    paths: users?.map((user: any) => ({
      params: { userId: user._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  // fetching one users

  const userId = context.params.userId;

  const user_id = {
    userId: userId,
  };

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await fetch(
    `${nextConfig.env?.backend_url}/admin/get-one-user`,
    {
      method: "POST",
      body: JSON.stringify(user_id),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    }
  );

  const res = await response.json();

  const user = await res.data.result;
  let fetchResponseErrorMsg;

  return {
    props: {
      user: {
        id: user?._id.toString() || null,
        name: user?.name || null,
        email: user?.email || null,
        username: user?.username || null,
        phoneNumber: user?.phoneNumber || null,
        dateOfBirth: user?.dateOfBirth || null,
        address: user?.address || null,
      },
      // fetchResponseError: { errorMsg: fetchResponseErrorMsg },
    },
    revalidate: 1,
  };
}

export default EditUserPage;
