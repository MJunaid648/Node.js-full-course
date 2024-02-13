const path = require("path");
const os = require("os");
const fs = require("fs");

// console.log(os.type());
// console.log(os.version());

// console.log(__filename)
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
//Details in an object
// console.log(path.parse(__filename));

// File System module

// READ file
// fs.readFile("./files/starter.txt","utf8", (err, data) => {
//   console.log(data);
//   if (err) throw err;
//   console.log("Read Completed");
// });

// USING path.join()  and without specifying encoding method i.e utf8
// fs.readFile(path.join(__dirname, "files", "starter.txt"), (err, data) => {
//   console.log(data.toString());
//   if (err) throw err;
//   console.log("Read Completed");
// });

// WRITE file
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "I am being written",
//   (err) => {
//     if (err) throw err;
//     console.log("Write Completed");
//   }
// );

// Append file
// fs.appendFile(
//   path.join(__dirname, "files", "reply.txt"),
//   " I am appended",
//   (err) => {
//     if (err) throw err;
//     console.log("Append Completed");
//   }
// );

// BETTER WAY TO WRITE IS TO FIRST CREATE IT USING WRITE AND THEN APPEND SO THAT
// TEXT MUST BE IN THE SAME ORDER (ASYNC NATURE OF NODE CAN BE A PROBLEM)

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "I am being written",
//   (err) => {
//     if (err) throw err;
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n \n I am appended",
//       (err) => {
//         if (err) throw err;
//         fs.appendFile(
//           path.join(__dirname, "files", "reply.txt"),
//           "\n \n I am appended",
//           (err) => {
//             if (err) throw err;
//             console.log("Append Completed");
//           }
//         );
//       }
//     );
//   }
// );

// BUT IT IS GOING TO BECOME A CALLBACK HELL
// TO AVOID IT, LETS USE THE ASYNC AWAIT

// SEE DAY 2 LECTURE
