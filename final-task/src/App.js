import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Dashbord } from "./components/Dashbord";
import { useState } from "react";
// import { ApiTesting } from "./components/ApiTesting";

function App() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [adminName, setAdminName] = useState("");
  return (
    <div className="App">
      {!loggedIn && (
        <LoginForm
          user={user}
          setUser={setUser}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          error={error}
          setError={setError}
          adminName={adminName}
          setAdminName={setAdminName}
        />
      )}

      {loggedIn && <Dashbord adminName={adminName} />}
      {/* <ApiTesting /> */}
    </div>
  );
}

export default App;
