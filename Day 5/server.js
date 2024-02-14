const path = require("path");
const { logger } = require("./middleware/logEvents.js");
const express = require("express");
const cors = require("cors");
const { error } = require("console");
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

//BUILT-IN MIDDLEWARES
// ACCEPTS DATA ENCODED IN URL. SUCH AS FROM HTML FORMS
app.use(express.urlencoded({ extended: false }));
// ACCEPT DATA IN THE JSON FORMAT
app.use(express.json());
// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "./files")));

app.get("^/$|index(.html)?", (req, res) => {
  //   res.sendFile("./files/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "files", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "files", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "files", "404.html"));
// });

// ROUTE HANDLER
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attempted to load hello.html");
//     next();
//   },
//   (req, res, next) => {
//     res.send("Hello world");
//     next();
//   },
//   (req, res) => {
//     console.log("last one");
//   }
// );

// Another example
// const one = (req, res, next) => {
//   console.log("One");
//   next();
// };
// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };
// const three = (req, res) => {
//   console.log("three");
//   res.send("done with all three routers");
// };

// app.get("/hello(.html)?", [one, two, three]);

app.listen(5000, () => {
  console.log("Server is running in the port ", PORT);
});
