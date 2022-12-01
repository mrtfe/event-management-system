const express = require("express");
const bodyParser = require("body-parser");

var fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const attendeesPath = "/api/attendees";

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

app.listen(port, () => console.log(`server started on port: ${port} `));
