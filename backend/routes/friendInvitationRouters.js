const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const friendsControllers = require("../controllers/friendsInviteController");
router.post("/invite", verifyToken, friendsControllers.postInvite);

module.exports = router;
