import React from "react";
import classes from "components/utility/Circle.module.css";

const Circle: React.FC<{
  children?: React.ReactNode;
  className?: {};
  onClick?: any;
}> = (props) => {
  return (
    <>
      <div className={`${classes.circle} ${props.className}`}></div>
    </>
  );
};

export default Circle;
