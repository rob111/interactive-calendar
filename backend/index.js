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

  const { id, time, date, text } = req.body.event;

  if ((!id && id !== 0) || !text) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  console.log(data);
  data.id = id;
  data.time = time;
  data.date = date;
  data.text = text;
  data.save(err => {
    if(err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//append /api for our http requests
app.use("/api", router);

//launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));











// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
//
// // An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });
//
// // Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
//
// const port = process.env.PORT || 5000;
// app.listen(port);
//
//
// console.log('App is listening on port ' + port);
