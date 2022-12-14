import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import "../styles/dashbord.css";
import "../styles/editRow-responsive.css";

export function EditAttendeeRow(props) {
  return (
    <tr className="edit-tr">
      <td>
        <input
          type="text"
          required
          name="firstName"
          value={props.editableData.firstName}
          onChange={(e) => props.handleEditInputChange(e, props.item)}
        />
      </td>
      <td>
        <input
          type="text"
          required
          name="lastName"
          value={props.editableData.lastName}
          onChange={(e) => props.handleEditInputChange(e, props.item)}
        />
      </td>
      <td>
        <input
          type="email"
          required
          name="email"
          value={props.editableData.email}
          onChange={(e) => props.handleEditInputChange(e, props.item)}
        />
      </td>
      <td>
        <input
          type="number"
          required
          name="age"
          value={props.editableData.age}
          onChange={(e) => props.handleEditInputChange(e, props.item)}
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
        <button
          type="button"
          className="cancel-btn btn"
          onClick={props.handleEditCancel}
        >
          <CancelIcon />
        </button>
      </td>
    </tr>
  );
}
