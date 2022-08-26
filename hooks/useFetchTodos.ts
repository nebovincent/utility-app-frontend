import nextConfig from "next.config";
import { useContext } from "react";
import AuthContext from "context/auth-context";
import { server } from "config/index";

const useFetchTodos = async () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.authUserId;
  const user_id = {
    userId: userId,
  };
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };

  const response = await fetch(`${server}/user/get-all-todos`, {
    method: "POST",
    body: JSON.stringify(user_id),
    headers: headers,
    credentials: "include",
    // statusCode: 200,
  });
  const res = await response.json();

  const todos = await res.data.result;
  return todos;
};

export default useFetchTodos;
