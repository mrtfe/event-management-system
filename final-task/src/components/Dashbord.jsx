import React, { useState } from "react";
import "../styles/dashbord.css";

export function Dashbord() {
  const [attendees, setAttendees] = useState([]);
  const [attendee, setAttendee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  const randomIdGenerator = () => {
    return Math.floor(Math.random() * 100000);
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputData = e.target.value;
    setAttendee({ ...attendee, [inputName]: inputData });
    console.log(attendee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = randomIdGenerator();
    setAttendees([...attendees, { attendee, id }]);
    console.log(attendees);
  };
  return (
    <div className="dashbord-wrapper">
      <div className="dashbord-header header">Management dashbord</div>
      <div className="form-container">
        <div className="form-header header">Create Attendee</div>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            required
            name="firstName"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last name"
            required
            name="email"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="lastName"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Age"
            required
            name="age"
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
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
          {attendees.length > 0 &&
            attendees.map((att) => (
              <div className="attendee-row" key={att.id}>
                <div className="attendee-col">{att.attendee.firstName}</div>
                <div className="attendee-col">{att.attendee.lastName}</div>
                <div className="attendee-col">{att.attendee.email}</div>
                <div className="attendee-col">{att.attendee.age}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
