const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname,'New'))) {
  fs.mkdir(path.join(__dirname,'New'), (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}

if (fs.existsSync(path.join(__dirname,'New'))) {
    fs.rmdir(path.join(__dirname,'New'), (err) => {
      if (err) throw err;
      console.log("Directory Deleted");
    });
  }
  