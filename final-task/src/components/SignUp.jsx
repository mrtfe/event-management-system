import axios from "axios";
import React, { useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";

export const SignUp = (props) => {
  const [newAdmin, setNewAdmin] = useState({
    userName: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);
  const [userNameTooShort, setUserNameTooShort] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputData = e.target.value;
    setNewAdmin({ ...newAdmin, [inputName]: inputData.toLowerCase() });
  };

  const userNameValidation = () => {
    const userNameLength = newAdmin.userName.length;
    if (userNameLength < 3) {
      setUserNameTooShort(true);
    } else {
      setUserNameTooShort(false);
      passwordValidation();
    }
  };
  const passwordValidation = () => {
    const passwordLength = newAdmin.password.length;
    if (passwordLength < 8) {
      setPasswordTooShort(true);
    } else {
      setPasswordTooShort(false);
      submitSignUp();
    }
  };

  const submitSignUp = () => {
    if (
      newAdmin.userName !== "" &&
      newAdmin.password !== "" &&
      newAdmin.password === newAdmin.password2
    ) {
      const createdAdmin = {
        userName: newAdmin.userName,
        password: newAdmin.password,
      };
      axios.post("/api/admins", createdAdmin).then((res) => console.log(res));
      setError(false);
      props.setUser(createdAdmin);
      setTimeout(props.setLoadSignUp, 2000, false);
      setSucces(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">Sign up</div>
        <form action="submit" className="login-form">
          <input
            required={true}
            minLength={3}
            type="text"
            placeholder="username"
            name="userName"
            onChange={handleChange}
          />
          <input
            required={true}
            minLength={8}
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <input
            required={true}
            minLength={8}
            type="password"
            placeholder="confirm password"
            name="password2"
            onChange={handleChange}
          />
          {userNameTooShort && <p>Username must be at least 3 characters</p>}
          {passwordTooShort && <p>Password must be at least 8 characters</p>}
          {error && <p>Passwords did not match</p>}
          {success && <p>Account created, now you can login</p>}
          <button
            className="login-btn"
            type="button"
            onClick={userNameValidation}
          >
            Sign up
          </button>
          <div className="signup-suggest">
            Go back to <u onClick={() => props.setLoadSignUp(false)}>login</u>
          </div>
        </form>
      </div>
      <button onClick={userNameValidation}>test</button>
      <ToggleSwitch toggleTheme={props.toggleTheme} theme={props.theme} />
    </div>
  );
};
