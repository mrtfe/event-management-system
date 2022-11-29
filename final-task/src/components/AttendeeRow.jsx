import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function AttendeeRow(props) {
  return (
    <tr className="attendee-row" key={props.item.id}>
      <td className="attendee-col">{props.item.firstName}</td>
      <td className="attendee-col">{props.item.lastName}</td>
      <td className="attendee-col">{props.item.email}</td>
      <td className="attendee-col">{props.item.age}</td>
      <td>
        <button
          className="edit-btn btn"
          onClick={(e) => props.handleEdit(e, props.item)}
        >
          <EditIcon />
        </button>
        <button
          className="del-btn btn"
          onClick={() => props.handleDelete(props.item)}
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
}
