import React from "react";
import classes from "components/utility/Card.module.css";
import { server } from "config/index";

const Card: React.FC<{
  children?: React.ReactNode;
  className?: {};
  onClick?: any;
}> = (props) => {
  return (
    <>
      <div className={`${classes.container__main} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};

export default Card;
