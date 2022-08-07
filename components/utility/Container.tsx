import React from "react";
import classes from "components/utility/Container.module.css";
import { Props } from "types/types";

const Container: React.FC<{
  children?: React.ReactNode;
  className?: {};
  onClick?: any;
}> = (props) => {
  return (
    <div
      className={`${classes.container__main} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Container;
