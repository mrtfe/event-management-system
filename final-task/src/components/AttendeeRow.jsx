import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function AttendeeRow(props) {
  return (
    <tr className="attendee-row" key={props.att.id}>
      <td className="attendee-col">{props.att.attendee.firstName}</td>
      <td className="attendee-col">{props.att.attendee.lastName}</td>
      <td className="attendee-col">{props.att.attendee.email}</td>
      <td className="attendee-col">{props.att.attendee.age}</td>
      <td>
        <button
          className="edit-btn btn"
          onClick={(e) => props.handleEdit(e, props.att)}
        >
          <EditIcon />
        </button>
        <button
          className="del-btn btn"
          onClick={() => props.handleDelete(props.att)}
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
}
