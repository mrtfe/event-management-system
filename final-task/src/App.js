import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Dashbord } from "./components/Dashbord";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

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
        />
      )}

      {loggedIn && <Dashbord />}
    </div>
  );
}

export default App;
