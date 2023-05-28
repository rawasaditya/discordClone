const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const friendsControllers = require("../controllers/friendsInviteController");
router.post("/invite", verifyToken, friendsControllers.postInvite);
router.get("/getAllInvites", verifyToken, friendsControllers.getAllInvites);
router.post(
  "/acceptRejectInvite",
  verifyToken,
  friendsControllers.acceptRejectInvite
);
router.get("/getAllFriends", verifyToken, friendsControllers.getAllFriends);
module.exports = router;
