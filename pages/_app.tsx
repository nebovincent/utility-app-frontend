import { useContext, useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Container from "components/utility/Container";
import classes from "pages/App.module.css";
import { UtilContextProvider } from "context/util-context";
import Layout from "components/utility/Layout";
import UtilContext from "context/util-context";
import AuthContext, { AuthContextProvider } from "context/auth-context";
import PageLoader from "components/utility/PageLoader";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { server } from "config/index";

// css for google map
import "components/Map/Map.css";
// css for google map

function MyApp({ Component, pageProps }: AppProps) {
  const utilCtx = useContext(UtilContext);
  const authCtx = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <UtilContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UtilContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
