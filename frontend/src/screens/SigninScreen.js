import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ==> redirect <==
  * - Query String: localhost:3000/signin?redirect=shipping
  ? - For redirect need check (query string).
  * - Split by (?) question mark.
  */
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  //! info.
  // console.log(redirect);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const dispatch = useDispatch();
  /* ==> prevent method <==
  TODO: - Learn method (preventDefault).
  */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    //* ==> If (user-login) is success url redirect by (redirect-define).
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {/* Title */}
        <div>
          <h1>Sign In</h1>
        </div>
        {/* Messages */}
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox varian="danger">{error}</MessageBox>}
        {/* Email */}
        <div>
          {/* (tag <input> id=email) connect with (tag <label> htmlFor=email) */}
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {/* Sign-In */}
        <div>
          <label />
          {/* Click on button (submitHandler fun-run) */}
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        {/* Sign-Up */}
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
