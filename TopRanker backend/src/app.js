const express = require("express");

const app = express();

app.use(express.json());

require("./db/connection");

const Meeting = require("./models/meeting");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.post("/meetings", async (req, res) => {
  const meeting = req.body;
  meeting.CreationTimestamp = new Date();
  const newMeeting = new Meeting(meeting);
  await newMeeting.save();
  res.send(newMeeting);
});

app.get("/meeting/:id", async (req, res) => {
  const id = req.params.id;
  const meeting = await Meeting.findOne({ ID: id });
  res.send(meeting);
});

const sanitize = (value) => {
  return value === null || value === undefined;
};

app.get("/meetings", async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;

  const email = req.query.participant;

  const meetings = await Meeting.find();
  const result = [];

  if (!sanitize(start) && !sanitize(end)) {
    meetings.forEach((meet) => {
      // console.log(Date.parse(Date(meet.StartTime)));
      const meetStart = Date.parse(Date(meet.StartTime));
      const meetEnd = Date.parse(Date(meet.EndTime));
      if (
        meetStart >= Date.parse(Date(start)) &&
        meetEnd <= Date.parse(Date(end))
      ) {
        result.push(meet);
      }
    });
  }

  if (!sanitize(email)) {
    // console.log(email);
    meetings.forEach((meet) => {
      // console.log(meet.Participants);
      meet.Participants.forEach((participant) => {
        // console.log(participant.Email);
        if (participant.Email === email) {
          result.push(meet);
        }
      });
    });
  }

  res.send(result);
});

app.listen(9999, () => {
  console.log(`listening on port 9999 !`);
});
