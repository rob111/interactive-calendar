const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT =5000;
const app = express();
const router = express.Router();

// path to our MongoDB
const dbRoute = "mongodb://localhost:27017/interactive_calendar";

//connect our back end code with db
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

//check if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error: "));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//fetch all available data from database
router.get("/getEvents", (req, res) => {
  Data.find((err, data) => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/addEvent", (req, res) => {
  let data = new Data();
  const { id, time, date, text } = req.body;

  if ((!id && id !== 0) || !text) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  data.id = id;
  data.time = time;
  data.date = date;
  data.text = text;
  data.save(err => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


router.post("/updateEvent", (req, res) => {
  const { id, update } = req.body;

  Data.findOneAndUpdate(id, update)
  .then(doc => {
    res.send(doc);
  })
  .catch(err => {
    console.log(err);
  });
});


router.delete("/deleteEvent", (req, res) => {
  const id = req.body;
  
  Data.findOneAndDelete(id)
  .then(doc => {
    res.send(doc);
  })
  .catch(err => {
    console.log(err);
  });
});



app.use("/api", router);


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
