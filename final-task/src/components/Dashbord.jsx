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

  const [editableData, setEditableData] = useState({
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

  const handleEditChange = (e, att) => {
    e.preventDefault();
    console.log(att.id + " clicked");
    const inputName = e.target.name;
    const inputData = e.target.value;
    setEditableData({ ...attendee, [inputName]: inputData });
    console.log(editableData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = randomIdGenerator();
    setAttendees([...attendees, { ...attendee, id }]);
    console.log(attendees);
  };

  const handleDelete = (e) => {
    setAttendees(attendees.filter((item) => item.id !== e.id));
  };

  const handleEdit = (e, item) => {
    e.preventDefault();
    console.log(item.id);
    setEditableId(item.id);
    console.log(item.firstName);
    const oldValues = {
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      age: item.age,
    };
    setEditableData(oldValues);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const editedData = {
      id: editableId,
      firstName: editableData.firstName,
      lastName: editableData.lastName,
      email: editableData.email,
      age: editableData.age,
    };
    const itemIndex = attendees.findIndex((item) => item.id === editableId);
    const newAttendees = [...attendees];
    newAttendees[itemIndex] = editedData;
    setAttendees(newAttendees);
    setEditableId(null);
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
                attendees.map((item) => (
                  <>
                    {editableId === item.id ? (
                      <EditAttendeeRow
                        handleEditChange={handleEditChange}
                        item={item}
                        editableData={editableData}
                        handleEditSave={handleEditSave}
                      />
                    ) : (
                      <AttendeeRow
                        item={item}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    )}
                  </>
                ))}
            </tbody>
          </table>
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
