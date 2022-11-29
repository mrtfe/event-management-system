import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export function EditAttendeeRow(props) {
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          name="firstName"
          value={props.editableData.firstName}
          onChange={(e) => props.handleEditChange(e, props.item)}
        />
      </td>
      <td>
        <input
          type="text"
          required
          name="lastName"
          value={props.editableData.lastName}
          onChange={(e) => props.handleEditChange(e, props.item)}
        />
      </td>
      <td>
        <input
          type="email"
          required
          name="email"
          value={props.editableData.email}
          onChange={(e) => props.handleEditChange(e, props.item)}
        />
      </td>
      <td>
        <input
          type="number"
          required
          name="age"
          value={props.editableData.age}
          onChange={(e) => props.handleEditChange(e, props.item)}
        />
      </td>
      <td>
        <button
          type="button"
          className="save-btn btn"
          onClick={props.handleEditSave}
        >
          <CheckIcon />
        </button>
        <button type="button" className="cancel-btn btn">
          <CancelIcon />
        </button>
      </td>
    </tr>
  );
}
