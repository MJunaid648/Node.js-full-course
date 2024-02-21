const { logger } = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials.js");
const verifyJWT = require("./middleware/verifyJWT.js");
const PORT = process.env.PORT || 5000;

// custom middleware logger
app.use(logger);

//Handle options credentials check- before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resourse Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware to serve static files
app.use(express.static(path.join(__dirname, "./files")));
app.use("/subdir", express.static(path.join(__dirname, "./files")));

// ROUTES
app.use("/subdir", require("./routes/subdir.js"));
app.use("/refresh", require("./routes/api/refresh.js"));
app.use("/logout", require("./routes/api/logout.js"));

// app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees.js"));
app.use("/register", require("./routes/api/register.js"));
app.use("/auth", require("./routes/api/auth.js"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
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
