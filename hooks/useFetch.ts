import { server } from "config/index";

const useFetch = async (url: string, method: string) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };
  const response = await fetch(url, {
    method: method,
    body: "",
    headers: headers,
    credentials: "include",
  });

  const res = await response.json();
  return res;
};
export default useFetch;
