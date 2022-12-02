import React, { useState, useEffect } from "react";
import "../styles/dashbord.css";
import styled from "styled-components";
import { AttendeeRow } from "./AttendeeRow";
import { EditAttendeeRow } from "./EditAttendeeRow";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export function Dashbord(props) {
  const [attendees, setAttendees] = useState([]);
  const [attendee, setAttendee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });
  const [editableId, setEditableId] = useState(null);
  const [editableData, setEditableData] = useState(attendee);
  const [loginIconPressed, setLoginIconPressed] = useState(false);

  useEffect(() => {
    fetch("/api/attendees")
      .then((res) => res.json())
      .then((data) => {
        setAttendees(data);
      })

      .catch((err) => console.log("error occured"));
  }, []);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputData = e.target.value;
    setAttendee({ ...attendee, [inputName]: inputData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/attendees", attendee)
      .then(function (response) {
        setAttendees((att) => [...att, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    axios
      .delete(`/api/attendees/${e.id}`)
      .then(setAttendees(attendees.filter((item) => item.id !== e.id)));
  };

  const handleEditClick = (e, item) => {
    e.preventDefault();
    setEditableId(item.id);
    const oldValues = {
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      age: item.age,
    };
    setEditableData(oldValues);
  };

  const handleEditInputChange = (e, att) => {
    e.preventDefault();
    const inputName = e.target.name;
    const inputData = e.target.value;
    setEditableData({ ...att, [inputName]: inputData });
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
    console.log(editedData);
    setAttendees(newAttendees);
    setEditableId(null);
    // axios
    //   .put(`/api/attendees/${editedData.id}`, editedData)
    //   .then((res) => setAttendees(res));
    // setEditableId(null);
  };

  const handleEditCancel = () => {
    setEditableId(null);
  };

  return (
    <div className="dashbord-wrapper">
      <div className="logged-user">
        <div className="logged-user-wrapper">
          {" "}
          Hello, {props.adminName}
          <PersonIcon
            className="person-icon"
            onClick={() =>
              setLoginIconPressed(
                (prevLoginIconPressed) => !prevLoginIconPressed
              )
            }
          />
        </div>

        {loginIconPressed && (
          <div className="logout-container">
            <button onClick={() => props.setLoggedIn(false)}>
              Log out
              <LogoutIcon />
            </button>
          </div>
        )}
      </div>

      <div className="dashbord-header header">Management dashbord</div>
      <div className="form-container">
        <div className="form-header header">Create Attendee</div>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="20"
            placeholder="First name"
            required
            name="firstName"
            value={attendee.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            maxLength="20"
            placeholder="Last name"
            required
            name="lastName"
            value={attendee.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            maxLength="47"
            placeholder="Email"
            required
            name="email"
            value={attendee.email}
            onChange={handleInputChange}
          />
          <input
            type="number"
            min="18"
            max="120"
            placeholder="Age"
            required
            name="age"
            value={attendee.age}
            onChange={handleInputChange}
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
              attendees.map((item) => {
                return (
                  <>
                    {editableId === item.id ? (
                      <EditAttendeeRow
                        handleEditInputChange={handleEditInputChange}
                        item={item}
                        editableData={editableData}
                        handleEditSave={handleEditSave}
                        handleEditCancel={handleEditCancel}
                      />
                    ) : (
                      <AttendeeRow
                        item={item}
                        handleDelete={handleDelete}
                        handleEditClick={handleEditClick}
                      />
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const StyledP = styled.p`
  color: rgba(128, 128, 128, 0.877);
  font-size: 18px;
  margin-top: 15px;
`;
