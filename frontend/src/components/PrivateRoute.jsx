import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

/* ==> ( Route ) <==
? - FIELDS:
*    { ...rest }: Receives parameters from original ( Route ).
*    Component: PROFILE SCREEN.
TODO: Test render = { props }
*/
export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  // console.log(`rest:`, rest); //! Info.
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
