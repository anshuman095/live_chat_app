const expressAsyncHandler = require("express-async-handler");
const Message = require("../modals/messageModel");
const Conversation = require("../modals/conversationModel");

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { message } = req.body;
  const { receiverId } = req.params;
  const senderId = req.user.id;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    let newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messagesId.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const getMessage = expressAsyncHandler(async (req, res) => {
  const { userToChatId } = req.params;
  const logginUserId = req.user.id;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [logginUserId, userToChatId] },
    })
      .select("messagesId -_id")
      .populate("messagesId");
    console.log("conversation in getMessage--------->>>>>>>>>>", conversation);
    if (!conversation) {
      res.status(200).json([]);
    } else {
      res.status(200).json(conversation.messagesId);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = { sendMessage, getMessage };
