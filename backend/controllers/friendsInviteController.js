const User = require("../models/User");
const FriendsInvitations = require("../models/FriendsInvitations");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../controllers/socketControllers");
const postInvite = async (req, res) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let { email } = req.body;
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
    return friendID.toString() === userObj.userId.toString();
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

const getAllInvites = async (req, res) => {
  const pendingInvitations = await FriendsInvitations.find({
    receiverId: req.user.userId,
  }).populate("senderId", "firstName lastName email");
  return res.status(200).json(pendingInvitations);
};

const acceptRejectInvite = async (req, res) => {
  const { invitationID, accept } = req.body;
  try {
    if (accept) {
      const pendingInvite = await FriendsInvitations.findByIdAndDelete(
        invitationID
      );

      sender = await User.findById(pendingInvite.senderId);
      receiver = await User.findById(pendingInvite.receiverId);
      sender.friends.push(pendingInvite.receiverId);
      receiver.friends.push(pendingInvite.senderId);
      await sender.save();
      await receiver.save();
      updateFriends(pendingInvite.senderId._id.toString());
      updateFriends(pendingInvite.receiverId._id.toString());
    } else {
      const pendingInvite = await FriendsInvitations.findByIdAndDelete(
        invitationID
      );
    }
    getAllInvites(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getAllFriends = async (req, res) => {
  try {
    const users = await User.findById(req.user.userId, {
      _id: 1,
      friends: 1,
    }).populate("friends", "_id firstName lastName email");
    res.status(200).json({ friends: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
module.exports = {
  postInvite,
  getAllInvites,
  acceptRejectInvite,
  getAllFriends,
};
