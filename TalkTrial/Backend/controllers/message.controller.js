import Conversation from '../models/conversation.models.js'
import Message from '../models/message.models.js'
import { getReceiverSocketId, io } from '../Socket/socket.js'

export const sendMessage = async (req,res) => {
    try{
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id
    
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(),newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId)
        
        if (receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }

        res.status(201).json(newMessage)
    }   
    catch(error){
        console.log("Error in sending Message" , error.message)
        res.status(501).json({error : "internal server error"})
    } 
}

export const getMessages = async (req,res) =>{
    try{
        const {id: userToChatId} = req.params
        const senderId = req.user._id // From the protect route middleware

        const conversation = await Conversation.findOne({
            participants:{$all:[userToChatId,senderId]}
        }).populate("messages")
        if(conversation === null){
            res.status(200).json([])
        }else{
            res.status(200).json(conversation.messages)
        }
    }catch(error){
        console.log("Error in getting Message" , error.message)
        res.status(501).json({error : "internal server error"})
    }
}