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
    console.log(admins);
  };

  // const checkIfUser = () => {
  //   const adminsUsernames = admins.map((admin) => admin.userName);
  //   const adminsPasswords = admins.map((admin) => admin.password);

  //   console.log(adminsUsernames);
  //   console.log(adminsPasswords);

  //   const index = adminsUsernames.findIndex(
  //     (item) => item === props.user.userName
  //   );

  //   if (
  //     adminsUsernames[index] === adminsPasswords[index](console.log("hooray"))
  //   )
  //     console.log(index);

  //   //   const currentUserName = props.user.userName;
  //   //   const currentPassword = props.user.password;
  //   //   console.log(currentUserName);
  //   //   console.log(currentPassword);
  //   //   const loggedUser = adminsUsernames.map(
  //   //     (item) => item.username === currentUserName
  //   //   );
  //   //   console.log(loggedUser);
  //   // const loggedUser = adminsUsernames.find(
  //   //   (item) => item.userName === props.user.userName
  //   // );
  //   // console.log(loggedUser);
  // };

  const handleSubmit = (e) => {
    // checkIfUser();
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
