const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  ID: String,
  Title: String,
  Participants: Array,
  StartTime: Date,
  EndTime: Date,
  CreationTimestamp: Date,
});

const Meeting = new mongoose.model("meetings", meetingSchema);

module.exports = Meeting;
