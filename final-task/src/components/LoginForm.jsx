import React, { useEffect, useState } from "react";
import "../styles/loginForm.css";

export function LoginForm(props) {
  const [admins, setAdmins] = useState();

  useEffect(() => {
    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(data));
  }, []);

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputData = e.target.value;
    props.setUser({ ...props.user, [inputName]: inputData });
  };

  const checkIfAdminIsLogging = () => {
    const index = admins.findIndex(
      (admin) => admin.userName === props.user.userName
    );
    if (index >= 0 && admins[index].password === props.user.password) {
      props.setLoggedIn(true);
      props.setError(false);
    } else props.setError(true);
  };

  return (
    <div className="login-container">
      <div className="login-header">Welcome to event management system</div>
      <div className="login">Login</div>
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
        <button
          className="login-btn"
          type="button"
          onClick={checkIfAdminIsLogging}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
