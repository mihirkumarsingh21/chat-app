import { Conversation } from "../models/conversation.model.js";
import {Message} from "../models/message.model.js"



export const sendMessage = async (req, res) => {
  try {
    
  const senderId = req.user._id;
  const {id: receiverId} = req.params;
  const {message} = req.body;

 let conversation = await Conversation.findOne({
   participants:{$all:[senderId, receiverId]}
  })

  if(!conversation){
    conversation = new Conversation({
      participants: [senderId, receiverId]
    })
  }

  console.log("CONVERSATION:", conversation);

  const newMessage =  new Message({
    senderId,
    receiverId,
    message
  })

  conversation.message.push(newMessage._id);

  console.log("NEW MESSAGE:", newMessage);

 await conversation.save();
 await newMessage.save();
 return res.status(200).json({
  success: true,
  message
 })
    
  } catch (error) {
    console.log(`ERROR IN SENDING MESSAGE CONTROLLER: ${error.message}`);
   return res.status(500).json({error: "Server error"});
  }
  

}


export const getMessage = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

   const conversation = await Conversation.findOne({
      participants: {$all: [userToChatId, senderId]}
    }).populate("message"); // now it gives actual data from db that is message.

    if(!conversation) {
     return res.status(400).json({
        message: "Conversation does not exist in db",
        success: false
      })
    }

   return res.status(200).json(
      conversation.message
    )

  } catch (error) {
    console.log("ERROR IN WHILE GETTING MESSAGE:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}


