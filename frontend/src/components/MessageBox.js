import React from "react";

/*
  ? props.variant: alert-(danger) or (info) used for css.
  * (props.children): Request failed with status code 500 => (message).
  */
export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.children}
    </div>
  );
}
