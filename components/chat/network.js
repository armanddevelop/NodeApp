const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const chatController = require("./controller");

const { successResponse, errorResponse } = response;
const { addChat, listChat } = chatController;

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const resp = await listChat(userId);
    console.log("esto vale resp ", resp);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

router.post("/add-chat", async (req, res) => {
  try {
    const { users } = req.body;
    const resp = await addChat(users);
    successResponse(res, resp);
  } catch (err) {
    errorResponse(res, 500, err);
  }
});

module.exports = router;
