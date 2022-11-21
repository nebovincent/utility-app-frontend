import React, { useContext, useEffect } from "react";
import { Props } from "types/types";
import AuthContext from "context/auth-context";
import UtilContext from "context/util-context";
import PageLoader from "components/utility/PageLoader";
import { useRouter } from "next/router";
import nextConfig from "next.config";
import PasswordLinkExpired from "components/Random/PasswordLinkExpired";

function CheckIfExpired({ children }: Props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const utilCtx = useContext(UtilContext);

  return (
    <>
      {utilCtx.loadingState ? (
        <PageLoader />
      ) : utilCtx.expired == true ? (
        <PasswordLinkExpired />
      ) : (
        children
      )}
    </>
  );
}

export default CheckIfExpired;
