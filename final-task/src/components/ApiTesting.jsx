import React, { useState } from "react";
import axios from "axios";

export function ApiTesting() {
  // const [attendees, setAttendees] = useState([]);

  const fetchData = async () => {
    const load = await fetch("./data/attendees.json");
    const data = await load.json();
    console.log(data);
  };

  return (
    <div>
      ApiTesting
      <button onClick={fetchData}>fetch data</button>
    </div>
  );
}
