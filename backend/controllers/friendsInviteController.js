const postInvite = (req, res) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { email } = req.body;
  if (!email.match(emailRegex)) {
    return res.json(403).status({ message: "Invalid email" });
  }

  const userObj = req.user;
  if (email == userObj.email) {
    return res.status(400).json({ message: "Cannot invite yourself 👀" });
  }
  console.log(userObj);
  res.status(200).json({});
};

module.exports = {
  postInvite,
};
