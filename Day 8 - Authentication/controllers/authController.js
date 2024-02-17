const usersDB = {
  users: require("../model/users.json"),
  setsUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser)
    return res
      .status(401) //unauthorized
      .json({ message: `No user with the name ${user} found.` });
  //   Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    return res.json({ success: `User ${user} is logged in!` });
  } else {
    return res
      .status(401) //unauthorized
      .json({ message: `Incorrect password` });
  }
};

module.exports = { handleLogin };
