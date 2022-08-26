import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "context/auth-context";
import { server } from "config/index";

const useCheckAuth = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      router.push("/?userloggedin=userloggedin");
    } else {
      setIsLoading(false);
    }
  }, [authCtx.isLoggedIn, router]);

  return [isLoading];
};

export default useCheckAuth;
