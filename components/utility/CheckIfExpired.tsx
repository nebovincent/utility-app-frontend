import React, { useContext, useEffect } from "react";
import { Props } from "types/types";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import PageLoader from "components/utility/PageLoader";
import { useRouter } from "next/router";
import { JsxElement } from "typescript";

function CheckIfExpired({ children }: Props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);
  // useEffect to check if expired or not
  useEffect(() => {
    if (!utilCtx.loadingState && utilCtx.expired === true) {
      // router.push("/");
      console.log("expired page1");
    }
  }, [utilCtx.expired, utilCtx.loadingState, router]);
  // useEffect to check if expired or not

  return <>{utilCtx.loadingState ? <PageLoader /> : children}</>;
}

export default CheckIfExpired;
