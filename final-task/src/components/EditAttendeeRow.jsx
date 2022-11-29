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
          value={props.edtableData.firstName}
          onChange={(e) => props.handleEditChange(e, props.att)}
        />
      </td>
      <td>
        <input
          type="text"
          required
          name="lastName"
          onChange={(e) => props.handleEditChange(e, props.att)}
        />
      </td>
      <td>
        <input
          type="email"
          required
          name="email"
          onChange={(e) => props.handleEditChange(e, props.att)}
        />
      </td>
      <td>
        <input
          type="number"
          required
          name="age"
          onChange={(e) => props.handleEditChange(e, props.att)}
        />
      </td>
      <td>
        <button type="button" className="save-btn btn">
          <CheckIcon />
        </button>
        <button type="button" className="cancel-btn btn">
          <CancelIcon />
        </button>
      </td>
    </tr>
  );
}
