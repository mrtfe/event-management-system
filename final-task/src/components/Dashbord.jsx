import React, { useState, useEffect } from "react";
import "../styles/dashbord.css";
import axios from "axios";
import { DashbordForm } from "./DashbordForm";
import { DashbordHeader } from "./DashbordHeader";
import { AttendeesContainer } from "./AttendeesContainer";

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
      <DashbordHeader
        toggleTheme={props.toggleTheme}
        theme={props.theme}
        setLoginIconPressed={setLoginIconPressed}
        loginIconPressed={loginIconPressed}
        adminName={props.adminName}
        setLoggedIn={props.setLoggedIn}
        setUser={props.setUser}
      />
      <DashbordForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        attendee={attendee}
      />
      <AttendeesContainer
        attendees={attendees}
        editableId={editableId}
        handleEditInputChange={handleEditInputChange}
        editableData={editableData}
        handleEditSave={handleEditSave}
        handleEditCancel={handleEditCancel}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
      />
    </div>
  );
}
