import React from "react";
import "../styles/toggle.css";

export function ToggleSwitch() {
  return (
    <div className="toggle-switch">
      <label className="checkbox-label">
        <input className="checkbox-input" type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  );
}
