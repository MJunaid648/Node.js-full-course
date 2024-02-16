const path = require("path");
const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { format } = require("date-fns");

async function logEvents(message, logName) {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
}
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log("LOGGER:",`${req.method}\t${req.url}`);
  next();
};

module.exports = { logger, logEvents };
