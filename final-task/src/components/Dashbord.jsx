import React, { useState, useEffect } from "react";
import "../styles/dashbord.css";
import styled from "styled-components";
import { AttendeeRow } from "./AttendeeRow";
import { EditAttendeeRow } from "./EditAttendeeRow";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToggleSwitch } from "./ToggleSwitch";
import { DashbordForm } from "./DashbordForm";

export function Dashbord(props) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  };

  const [attendees, setAttendees] = useState([]);
  const [attendee, setAttendee] = useState(initialValues);
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
        console.log("error occured: " + error.name);
      });
    setAttendee(initialValues);
  };

  const handleDelete = (e) => {
    axios
      .delete(`/api/attendees/${e.id}`)
      .then(setAttendees(attendees.filter((item) => item.id !== e.id)))
      .catch(function (error) {
        console.log("error occured: " + error.name);
      });
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
    setEditableData((att) => ({ ...att, [inputName]: inputData }));
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
    setEditableId(null);

    axios
      .put(`/api/attendees/${editedData.id}`, editedData)
      .then((res) =>
        setAttendees((att) =>
          attendees.map((attendee) =>
            attendee.id === res.data.id ? res.data : attendee
          )
        )
      )
      .catch(function (error) {
        console.log("error occured: " + error.name);
      });
    setEditableId(null);
  };

  const handleEditCancel = () => {
    setEditableId(null);
  };

  return (
    <div className="dashbord-wrapper">
      <div className="dashbord-header">
        <ToggleSwitch toggleTheme={props.toggleTheme} theme={props.theme} />
        <div className="logged-user">
          <div className="logged-user-wrapper">
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
      <DashbordForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        attendee={attendee}
      />
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
                return editableId === item.id ? (
                  <EditAttendeeRow
                    key={item.id}
                    handleEditInputChange={handleEditInputChange}
                    item={item}
                    editableData={editableData}
                    handleEditSave={handleEditSave}
                    handleEditCancel={handleEditCancel}
                  />
                ) : (
                  <AttendeeRow
                    key={item.id}
                    item={item}
                    handleDelete={handleDelete}
                    handleEditClick={handleEditClick}
                  />
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
