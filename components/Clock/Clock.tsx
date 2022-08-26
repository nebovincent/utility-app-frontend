import React from "react";
import Container from "components/utility/Container";
import classes from "components/Clock/Clock.module.css";
import { server } from "config/index";

const Clock = () => {
  return <Container className={classes.clock__container_main}>Clock</Container>;
};

export default Clock;
