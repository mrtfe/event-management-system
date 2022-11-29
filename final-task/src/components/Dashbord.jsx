import React, { useState } from "react";
import "../styles/dashbord.css";
import styled from "styled-components";
import { AttendeeRow } from "./AttendeeRow";
import { EditAttendeeRow } from "./EditAttendeeRow";

export function Dashbord() {
  const [attendees, setAttendees] = useState([]);
  const [attendee, setAttendee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  const [editableId, setEditableId] = useState(null);

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

  const handleEdit = (e, att) => {
    e.preventDefault();
    // console.log(att.id + "clicked");
    setEditableId(att.id);
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
        {attendees.length === 0 && (
          <StyledP>No attendees registered yet...</StyledP>
        )}
        <form>
          <table className="attendees-list">
            {attendees.length > 0 && (
              <thead className="header-row">
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th></th>
                </tr>
              </thead>
            )}

            <tbody>
              {attendees.length > 0 &&
                attendees.map((att) => (
                  <>
                    {editableId === att.id ? (
                      <EditAttendeeRow />
                    ) : (
                      <AttendeeRow
                        att={att}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    )}
                  </>
                ))}
            </tbody>
          </table>{" "}
        </form>
      </div>
    </div>
  );
}

const StyledP = styled.p`
  color: rgba(128, 128, 128, 0.877);
  font-size: 18px;
  margin-top: 15px;
`;
