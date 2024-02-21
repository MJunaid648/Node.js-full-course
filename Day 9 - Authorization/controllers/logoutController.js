const usersDB = {
  users: require("../model/users.json"),
  setsUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handlerLogout = async (req, res) => {
  // On client side,also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content to be send back
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      // secure:true , //Must be only used with https
    });
    return res.sendStatus(204);
  }
  //   Delete the refresh token in the DB
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setsUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    // secure:true , //Must be only used with https
  });
  //   Another flag i.e. secure: true must be set in the production environment.
  // secure: true serves only on https . As currently on local host, our connection is http
  //   therefore I have not set it up
  res.sendStatus(204);
};

module.exports = { handlerLogout };
