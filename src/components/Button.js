import React, { PropTypes } from "react";
import classnames from "classnames";
import "./Button.css";

const getInvertedStyles = color => {
  return {
    border: "none",
    background: "white",
    color: "black",
    boxShadow: "inset 0 0 0 2px " + color
  };
};

const Button = ({ children, className, inverted, color, ...rest }) => {
  return (
    <button
      type="button"
      style={inverted ? getInvertedStyles(color) : { backgroundColor: color }}
      className={[classnames(["button", className])]}
      {...rest}
    >
      {" "}{children}{" "}
    </button>
  );
};

export default Button;
