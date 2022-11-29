import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export function EditAttendeeRow() {
  return (
    <tr>
      <td>
        <input type="text" required name="firstName" />
      </td>
      <td>
        <input type="text" required name="lastName" />
      </td>
      <td>
        <input type="email" required name="email" />
      </td>
      <td>
        <input type="number" required name="age" />
      </td>
      <td>
        <button className="save-btn btn">
          <CheckIcon />
        </button>
        <button className="cancel-btn btn">
          <CancelIcon />
        </button>
      </td>
    </tr>
  );
}
