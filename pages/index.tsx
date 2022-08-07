import LandingPage from "pages/LandingPage";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import PageLoader from "components/utility/PageLoader";


const Home: NextPage = () => {
  return (
    <div className={styles.bodyChild}>
      <Head>
        <title>Utility NextJS Website</title>
        <meta name="description" content="Created by Vincent Nebo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
      {/* <PageLoader /> */}
    </div>
  );
};

export default Home;
