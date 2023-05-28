const User = require("../models/User");
const FriendsInvitations = require("../models/FriendsInvitations");
const {
  updateFriendsPendingInvitations,
} = require("../controllers/socketControllers");
const postInvite = async (req, res) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let { email } = req.body;
  email = email.toLowerCase();
  if (!email.match(emailRegex)) {
    return res.json(403).status({ message: "Invalid email" });
  }

  const userObj = req.user;
  if (email == userObj.email) {
    return res.status(400).json({ message: "Cannot invite yourself 👀" });
  }
  const targetUser = await User.findOne({
    email,
  });
  if (!targetUser) {
    return res
      .status(404)
      .json({ message: `Friend of ${email} has not been found..! 🤷‍♂️` });
  }
  const InvitationAlreadySent = await FriendsInvitations.findOne({
    senderId: userObj.userId,
    receiverId: targetUser._id,
  });

  const InvitationAlreadyReceived = await FriendsInvitations.findOne({
    senderId: targetUser._id,
    receiverId: userObj.userId,
  });

  if (InvitationAlreadySent) {
    return res.status(409).json({ message: "Invitation already sent...!" });
  }

  if (InvitationAlreadyReceived) {
    return res.status(409).json({
      message:
        "You have received invitation already please check invitations lists",
    });
  }

  // If user already friend
  const userAlreadyFriend = targetUser.friends.find((friendID) => {
    friendID.toString() === userObj.userId.toString();
  });

  if (userAlreadyFriend) {
    return res.status(409).json({ message: "You are already friends..!" });
  }

  // Create new invitation
  const newInvitation = await FriendsInvitations.create({
    senderId: userObj.userId,
    receiverId: targetUser._id,
  });

  // send pending invitation update to receiver
  updateFriendsPendingInvitations(targetUser.id);
  if (newInvitation) {
    res.status(200).json({ message: "Invite sent" });
  }
};

module.exports = {
  postInvite,
};
