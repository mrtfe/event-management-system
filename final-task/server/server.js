const express = require("express");

var fs = require("fs");

const app = express();

const path = "/api/attendees";

const port = 5000;

app.get("/api/admins", (req, res) => {
  const admins = [
    { id: "1", userName: "jpsk", password: "letmesee" },
    { id: "2", userName: "eli", password: "letscheck" },
    { id: "3", userName: "martynas", password: "welcome" },
  ];
  res.json(admins);
});

function readJsonFileSync(filepath) {
  const file = fs.readFileSync(filepath);
  return JSON.parse(file);
}

app.get(path, (req, res) => {
  const attendees = readJsonFileSync("./attendees.json");
  res.json(attendees);
});

// function appendFile(filepath) {
//   const file = fs.appendFile(filepath, "utf8", function (err) {
//     if (err) throw err;
//     console.log("Data is appended to file successfully.");
//   });
// }

// app.post(path, function (req, res) {
//   const postAttendees = appendFile(path);
//   res.send(postAttendees);
// });

app.listen(port, () => console.log(`server started on port: ${port} `));
