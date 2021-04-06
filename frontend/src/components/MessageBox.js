import React from "react";

export default function MessageBox(props) {
    //* Nota, props.variant: "danger" if exist, or not exist "info"
    //* Nota, props.children: "Request failed with status code 500"
    return (
        <div className={`alert alert-${props.variant || "info"}`}>
            {props.children}
        </div>
    );
}
