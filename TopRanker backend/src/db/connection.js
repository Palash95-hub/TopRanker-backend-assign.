const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/TopRankerBackend", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((e) => {
    console.log(`error is ${e}`);
  });
