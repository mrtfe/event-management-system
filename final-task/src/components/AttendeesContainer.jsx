import React from "react";
import styled from "styled-components";
import { AttendeeRow } from "./AttendeeRow";
import { EditAttendeeRow } from "./EditAttendeeRow";

export function AttendeesContainer(props) {
  return (
    <div className="attendees-container">
      <div className="attendees-header header">Attendee list</div>
      {props.attendees.length === 0 && (
        <StyledP>No attendees registered yet...</StyledP>
      )}
      <table className="attendees-list">
        {props.attendees.length > 0 && (
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
          {props.attendees.length > 0 &&
            props.attendees.map((item) => {
              return props.editableId === item.id ? (
                <EditAttendeeRow
                  key={item.id}
                  handleEditInputChange={props.handleEditInputChange}
                  item={item}
                  editableData={props.editableData}
                  handleEditSave={props.handleEditSave}
                  handleEditCancel={props.handleEditCancel}
                />
              ) : (
                <AttendeeRow
                  key={item.id}
                  item={item}
                  handleDelete={props.handleDelete}
                  handleEditClick={props.handleEditClick}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

const StyledP = styled.p`
  color: rgba(128, 128, 128, 0.877);
  font-size: 18px;
  margin-top: 15px;
`;
