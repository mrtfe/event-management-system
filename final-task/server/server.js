const express = require("express");
const bodyParser = require("body-parser");

var fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const attendeesPath = "/api/attendees";
const adminsPath = "/api/admins";

const port = 5000;

// function that reads data from local json file
function readJsonFileSync(filepath) {
  const file = fs.readFileSync(filepath);
  return JSON.parse(file);
}

// function that returns admins
app.get("/api/admins", (req, res) => {
  const admins = readJsonFileSync("./admins.json");
  res.json(admins);
});

// function that returns attendees
app.get(attendeesPath, (req, res) => {
  const attendees = readJsonFileSync("./attendees.json");
  res.json(attendees);
});

// function that adds new attendee
function addAttendee(newAttendee) {
  const attendees = readJsonFileSync("./attendees.json", "utf8");
  attendees.push(newAttendee);
  fs.writeFileSync("./attendees.json", JSON.stringify(attendees, null));
}

const randomIdGenerator = () => {
  return Math.floor(Math.random() * 100000);
};

app.post(attendeesPath, function (req, res) {
  const newAttendee = {
    id: randomIdGenerator(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
  };
  addAttendee(newAttendee);
  res.send(newAttendee);
});
//

// function that adds new admin
function addAdmin(newAdmin) {
  const admins = readJsonFileSync("./admins.json", "utf8");
  admins.push(newAdmin);
  fs.writeFileSync("./admins.json", JSON.stringify(admins, null));
}

app.post(adminsPath, function (req, res) {
  const newUser = {
    id: randomIdGenerator(),
    userName: req.body.userName,
    password: req.body.password,
  };
  addAdmin(newUser);
  res.send("new admin registered");
});
//

// function that removes attendee
function removeAttendee(id) {
  const attendees = readJsonFileSync("./attendees.json", "utf8");
  const result = attendees.filter((item) => item.id !== parseInt(id));
  fs.writeFileSync("./attendees.json", JSON.stringify(result, null));
}
app.delete(`${attendeesPath}/:id`, (req, res) => {
  removeAttendee(req.params.id);
  res.send();
});
//

// function that edits attendee
function editAttendee(editedAttende) {
  const attendees = readJsonFileSync("./attendees.json", "utf8");
  const newAttendeesArray = attendees.map((attendee) =>
    attendee.id === editedAttende.id ? editedAttende : attendee
  );
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
  res.send(editedAttende);
});
//
app.listen(port, () => console.log(`server started on port: ${port} `));
