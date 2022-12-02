import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Dashbord } from "./components/Dashbord";
import { useState } from "react";
import { createContext } from "react";
import { ToggleSwitch } from "./components/ToggleSwitch";

export const ThemeContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(true);
  const [error, setError] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        {/* <ToggleSwitch /> */}
        <button onClick={toggleTheme}>dark or light</button>
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

        {loggedIn && (
          <Dashbord
            adminName={adminName}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
