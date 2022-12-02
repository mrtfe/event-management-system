import React from "react";
import "../styles/toggle.css";

export function ToggleSwitch(props) {
  return (
    <div className="switch-container">
      <p>Switch to {props.theme === "dark" ? "light" : "dark"} mode</p>
      <label className="switch">
        <input
          className="switch-input"
          type="checkbox"
          onChange={props.toggleTheme}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
