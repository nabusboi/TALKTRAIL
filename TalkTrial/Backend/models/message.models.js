import mongoose from "mongoose";
import User from "./user.models.js";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true}) // {timestamps: true} creates created and updated at timestamps

const Message = mongoose.model("Message", messageSchema)

export default Message