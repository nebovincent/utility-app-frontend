import React, { useState } from "react";
import Image from "next/image";
import classes from "components/utility/PageLoader.module.css";
import { useRouter } from "next/router";

function PageLoader() {
  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <div className={classes.main}>
        <Image src="/loader.gif" alt="" width="100" height="100" />
        {router.route === "/Todos/TodoPage" && (
          <div>
            {/* <h4>Redirecting to login page</h4> */}
            {/* <p>You have to be logged in to access this service</p> */}
          </div>
        )}
        {router.route === "/Notes/NotesPage" && (
          <div>
            {/* <h4>Redirecting to login page</h4> */}
            {/* <p>You have to be logged in to access this service</p> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageLoader;
