import React, { useState } from "react";
import "../styles/dashbord.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleDelete = (e) => {
    setAttendees(attendees.filter((item) => item.id !== e.id));
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
        <table className="attendees-list">
          <thead className="header-row">
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attendees.length > 0 &&
              attendees.map((att) => (
                <tr className="attendee-row" key={att.id}>
                  <td className="attendee-col">{att.attendee.firstName}</td>
                  <td className="attendee-col">{att.attendee.lastName}</td>
                  <td className="attendee-col">{att.attendee.email}</td>
                  <td className="attendee-col">{att.attendee.age}</td>
                  <td>
                    <button className="edit-btn">
                      <EditIcon />
                    </button>
                    <button
                      className="del-btn"
                      onClick={() => handleDelete(att)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
