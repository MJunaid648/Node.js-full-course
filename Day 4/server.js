const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

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
const one = (req, res, next) => {
  console.log("One");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("done with all three routers");
};

app.get("/hello(.html)?", [one, two, three]);

app.listen(PORT, () => {
  console.log("Server is running in the port ", PORT);
});
