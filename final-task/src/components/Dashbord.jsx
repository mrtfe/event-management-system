import React from "react";
import "../styles/dashbord.css";

export function Dashbord() {
  return (
    <div className="dashbord-wrapper">
      <div className="dashbord-header header">Management dashbord</div>
      <div className="form-container">
        <div className="form-header header">Create Attendee</div>
        <form action="submit">
          <input type="text" placeholder="First name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Last name" required />
          <input type="number" placeholder="Age" required />
          <button className="submit-btn">Submit</button>
        </form>
      </div>
      <div className="attendees-container">
        <div className="attendees-header header">Attendee list</div>
        <div className="attendees-list">
          <div className="header-row">
            <div className="header-column">First name</div>
            <div className="header-column">Last name</div>
            <div className="header-column">Email</div>
            <div className="header-column">Age</div>
          </div>
        </div>
      </div>
    </div>
  );
}
