const express = require("express");
const bodyParser = require("body-parser");

var fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const attendeesPath = "/api/attendees";

const port = 5000;

app.get("/api/admins", (req, res) => {
  const admins = readJsonFileSync("./admins.json");
  res.json(admins);
});

function readJsonFileSync(filepath) {
  const file = fs.readFileSync(filepath);
  return JSON.parse(file);
}

app.get(attendeesPath, (req, res) => {
  const attendees = readJsonFileSync("./attendees.json");
  res.json(attendees);
});

const randomIdGenerator = () => {
  return Math.floor(Math.random() * 100000);
};

function addAttendee(newAttendee) {
  const attendees = readJsonFileSync("./attendees.json", "utf8");

  attendees.push(newAttendee);
  fs.writeFileSync("./attendees.json", JSON.stringify(attendees, null));
}

app.post(attendeesPath, function (req, res) {
  console.log(req.body.firstName);
  const newAttendee = {
    id: randomIdGenerator(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
  };
  addAttendee(newAttendee);
  console.log(newAttendee);
  res.send(newAttendee);
});

function removeAttendee(id) {
  const attendees = readJsonFileSync("./attendees.json", "utf8");
  const result = attendees.filter((item) => item.id !== parseInt(id));
  console.log(id);
  fs.writeFileSync("./attendees.json", JSON.stringify(result, null));
}

app.delete(`${attendeesPath}/:id`, (req, res) => {
  removeAttendee(req.params.id);
  res.send();
});

function editAttendee(editedAttende) {
  const attendees = readJsonFileSync("./attendees.json", "utf8");

  console.log(attendees);
  const newAttendeesArray = attendees.map((attendee) =>
    attendee.id === editedAttende.id ? editedAttende : attendee
  );
  console.log(newAttendeesArray);

  fs.writeFileSync("./attendees.json", JSON.stringify(newAttendeesArray));
}

app.put(`${attendeesPath}/:id`, (req, res) => {
  const editedAttende = {
    id: parseInt(req.params.id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
  };
  editAttendee(editedAttende);

  console.log(req.params.id);
  res.send(editedAttende);
});

app.listen(port, () => console.log(`server started on port: ${port} `));
