import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export function DashbordHeader(props) {
  return (
    <>
      <div className="dashbord-header">
        <ToggleSwitch toggleTheme={props.toggleTheme} theme={props.theme} />
        <div className="logged-user">
          <div className="logged-user-wrapper">
            Hello, {props.adminName}
            <PersonIcon
              className="person-icon"
              onClick={() =>
                props.setLoginIconPressed(
                  (prevLoginIconPressed) => !prevLoginIconPressed
                )
              }
            />
          </div>
          {props.loginIconPressed && (
            <div className="logout-container">
              <button
                onClick={() => {
                  props.setLoggedIn(false);
                  props.setUser(props.initialUserState);
                }}
              >
                Log out
                <LogoutIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="dashbord-header header">Management dashbord</div>
    </>
  );
}
