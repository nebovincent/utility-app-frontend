import React, { useContext, useEffect } from "react";
import { Props } from "types/types";
import AuthContext from "context/auth-context";
import PageLoader from "components/utility/PageLoader";
import { useRouter } from "next/router";
import { JsxElement } from "typescript";

function ProtectedRoutes({ children }: Props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  // useEffect to check if user is still authenticated
  useEffect(() => {
    if (!authCtx.authLoadingState && authCtx.isLoggedIn === false) {
      if (router.route === "/Todos/TodoPage") {
        router.push("/Auth/User/LoginPage");
      } else if (router.route === "/Notes/NotesPage") {
        router.push("/Auth/User/LoginPage");
      } else {
        router.push("/");
      }
    }
  }, [authCtx.authLoadingState, authCtx.isLoggedIn, router]);
  // useEffect to check if user is still authenticated

  // if (typeof window !== "undefined") {
  //Runs only on client side
  // }

  return (
    <>
      {authCtx.authLoadingState ? (
        <PageLoader />
      ) : (
        authCtx.isLoggedIn === true && children
      )}
    </>
  );
}

export default ProtectedRoutes;
