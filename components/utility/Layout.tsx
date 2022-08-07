import React, { useContext } from "react";
import Navigation from "components/utility/Navigation";
import UtilContext from "context/util-context";
import classes from "components/utility/Layout.module.css";
import Container from "components/utility/Container";
import { Props } from "types/types";

const Layout = (props: Props) => {
  const utilCtx = useContext(UtilContext);

  return (
    <Container className={classes.layout__container}>
      <Navigation className={classes.nav__main} />
      <section className={classes.navspace}></section>
      <div onClick={utilCtx.escShowMenu} className={classes.childMain}>
        {props.children}
      </div>
    </Container>
  );
};

export default Layout;
