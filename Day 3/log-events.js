const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

async function logEvents(message) {
  const newDate = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs", "logs.txt"))) {
      fs.mkdir(path.join(__dirname, "logs"), (err) => {
        if (err) throw err;
        console.log("Directory created !");
      });
      const log = `\n${newDate}\t ${uuid()}\t ${message}`;
      await fsPromises.appendFile(
        path.join(__dirname, "logs", "logs.txt"),
        log
      );
    } else {
      const log = `\n${newDate}\t ${uuid()}\t ${message}`;
      await fsPromises.appendFile(
        path.join(__dirname, "logs", "logs.txt"),
        log
      );
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = logEvents;
