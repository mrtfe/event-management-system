import React from "react";
import "../styles/loginForm.css";

export function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-header">Welcome to event management system</div>
      <form action="submit" className="login-form">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <p>Incorrect username or password</p>
        <button type="button">Log in</button>
      </form>
    </div>
  );
}
