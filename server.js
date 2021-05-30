// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express"); // Express to run server and routes
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// Setup Server
const port = 5000;
//Spin up the server
const server = app.listen(port, listening);
// callback to debug
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

/* TODO-ROUTES!*/
//get Method
app.get("/all", (req, res) => {
  // console.log(`The Requset Of Get method from server is: `);
  // console.log(req);
  // console.log("************************************************************");

  res.send(projectData);
});
//post Method
app.post("/add", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  // console.log(`The projectData Of Post Method from server is:`);
  // console.log(projectData);
  // console.log("************************************************************");
});
