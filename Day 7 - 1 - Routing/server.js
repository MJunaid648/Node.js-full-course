const { logger } = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// CUSTOM LOGGER MIDDLEWARE
app.use(logger);
// CROSS ORIGIN RESOURCE SHARING
const whiteList = [
  "https://www.google.com",
  "http://127.0.0.1:5000",
  "http://localhost:5000",
  "http://localhost:5000/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//...................................BUILT-IN MIDDLEWARES
// ACCEPTS DATA ENCODED IN URL. SUCH AS FROM HTML FORMS
app.use(express.urlencoded({ extended: false }));
// ACCEPT DATA IN THE JSON FORMAT
app.use(express.json());
// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "./files")));
app.use("/subdir", express.static(path.join(__dirname, "./files")));

// ROUTES
app.use("/subdir", require("./routes/subdir.js"));
app.use("/employees", require("./routes/api/employees.js"));


// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "files", "404.html"));
// });

// A BETTER WAY TO HANDLE UNNECESSARY ROUTES WITH ERRORS
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "files", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else if (req.type("txt")) {
    res.send("404 not found");
  }
});
app.use(errorHandler);
app.listen(5000, () => {
  console.log("Server is running in the port ", PORT);
});
