import LandingPage from "pages/LandingPage";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import Script from "next/script";
import PageLoader from "components/utility/PageLoader";
import { HelmetProvider, Helmet } from "react-helmet-async";
import nextConfig from "next.config";

const Home: NextPage = () => {
  return (
    <div className={styles.bodyChild}>
      <Head>
        <title>Utility NextJS Website</title>
        <meta name="description" content="Created by Vincent Nebo" />
        <link rel="icon" href="/favicon-dark.png" />
      </Head>
      {/* SEO OPTIMIZATION WITH REACT HELMET ASYNC */}
      <HelmetProvider>
        <Helmet>
          <title>Utility NextJS Website</title>
          <link rel="canonical" href="" />
          {/* special metatag */}
          <link rel="canonical" href="" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Utility NextJS Website by Vincent Nebo"
          />
          <meta
            property="og:description"
            content="Multi-purpose Utility web application created with React, NextJs and ExpressJs"
          />
          <meta property="og:url" content={nextConfig?.env?.appUrl} />
          <meta property="og:image" content="/favicon-dark.png" />
          {/* special metatag */}
        </Helmet>
      </HelmetProvider>
      {/* SEO OPTIMIZATION WITH REACT HELMET ASYNC */}
      <LandingPage />
    </div>
  );
};

export default Home;
