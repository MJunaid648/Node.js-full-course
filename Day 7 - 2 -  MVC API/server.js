const { logger } = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./files")));
app.use("/subdir", express.static(path.join(__dirname, "./files")));

// ROUTES
app.use("/subdir", require("./routes/subdir.js"));
app.use("/employees", require("./routes/api/employees.js"));
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
