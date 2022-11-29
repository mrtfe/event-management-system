import React from "react";
import "../styles/loginForm.css";

export function LoginForm(props) {
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputData = e.target.value;
    props.setUser({ ...props.user, [inputName]: inputData });
  };

  const handleSubmit = (e) => {
    if (props.user.userName === "admin" && props.user.password === "cafe") {
      props.setLoggedIn(true);
      props.setError(false);
    } else {
      props.setError(true);
      props.setLoggedIn(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">Welcome to event management system</div>
      <form action="submit" className="login-form">
        <input
          type="text"
          placeholder="username"
          name="userName"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        {props.error && <p>Incorrect username or password</p>}
        <button className="login-btn" type="button" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </div>
  );
}
