import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Dashbord } from "./components/Dashbord";
import { useState } from "react";
import { createContext } from "react";
import { SignUp } from "./components/SignUp";

export const ThemeContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [theme, setTheme] = useState("light");
  const [loadSignUp, setLoadSignUp] = useState(true);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
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
            toggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        {loadSignUp && (
          <SignUp
            setUser={setUser}
            setLoadSignUp={setLoadSignUp}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        {loggedIn && (
          <Dashbord
            adminName={adminName}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
