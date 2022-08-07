import nextConfig from "next.config";
import { useContext } from "react";
import AuthContext from "context/auth-context";

const useFetchNotes = async () => {
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

  const response = await fetch(
    `${nextConfig.env?.backend_url}/user/get-all-notes`,
    {
      method: "POST",
      body: JSON.stringify(user_id),
      headers: headers,
      credentials: "include",
      // statusCode: 200,
    }
  );
  const res = await response.json();

  const notes = await res.data.result;
  return notes;
};

export default useFetchNotes;
