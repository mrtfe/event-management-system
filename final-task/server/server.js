const express = require("express");

const app = express();

app.get("/api/admins", (req, res) => {
  const admins = [
    { id: "1", userName: "jpsk", password: "letmesee" },
    { id: "2", userName: "eli", password: "letscheck" },
    { id: "3", userName: "martynas", password: "welcome" },
  ];
  res.json(admins);
});

app.get("/api/attendees", (req, res) => {
  const attendees = [
    {
      id: "1",
      firstName: "Jonas",
      lastName: "Ponas",
      email: "jonas@ponas.lt",
      age: "22",
    },
    {
      id: "2",
      firstName: "Romas",
      lastName: "Ponas",
      email: "romas@ponas.lt",
      age: "88",
    },
    {
      id: "3",
      firstName: "Dzonas",
      lastName: "Ponas",
      email: "dzonas@ponas.lt",
      age: "15",
    },
  ];
  res.json(attendees);
});

const port = 5000;

app.listen(port, () => console.log(`server started on port: ${port} `));
