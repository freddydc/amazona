import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    /*
    TODO: Learn (preventDefault).
    TODO: signin action.
    */
    e.preventDefault();
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {/* Title */}
        <div>
          <h1>Sign In</h1>
        </div>
        {/* Email */}
        <div>
          {/* Having id email on input connect with label htmlFor email. */}
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
        {/* Submit */}
        <div>
          <label />
          {/* Clicking this btn submitHandler fun running. */}
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        {/* Signup */}
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
