import React from "react";

export function DashbordForm(props) {
  return (
    <div className="form-container">
      <div className="form-header header">Create Attendee</div>
      <form action="submit" onSubmit={props.handleSubmit}>
        <input
          type="text"
          maxLength="20"
          placeholder="First name"
          required
          name="firstName"
          value={props.attendee.firstName}
          onChange={props.handleInputChange}
        />
        <input
          type="text"
          maxLength="20"
          placeholder="Last name"
          required
          name="lastName"
          value={props.attendee.lastName}
          onChange={props.handleInputChange}
        />
        <input
          type="email"
          maxLength="47"
          placeholder="Email"
          required
          name="email"
          value={props.attendee.email}
          onChange={props.handleInputChange}
        />
        <input
          type="number"
          min="18"
          max="120"
          placeholder="Age"
          required
          name="age"
          value={props.attendee.age}
          onChange={props.handleInputChange}
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
